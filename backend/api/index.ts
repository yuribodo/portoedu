import type { VercelRequest, VercelResponse } from '@vercel/node'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { chatRoutes } from '../src/routes/chat.js'
import { opportunitiesRoutes } from '../src/routes/opportunities.js'
import { recommendationsRoutes } from '../src/routes/recommendations.js'

/**
 * Cria instância do Fastify para serverless
 */
const app = Fastify({
  logger: false,
})

/**
 * Configuração assíncrona do app
 */
async function setupApp() {
  // CORS
  await app.register(cors, {
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  })

  // Health check
  app.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'production',
      openaiConfigured: !!process.env.OPENAI_API_KEY,
    }
  })

  // Rota raiz
  app.get('/', async () => {
    return {
      name: 'PortoEdu Backend API',
      version: '1.0.0',
      description: 'Backend da plataforma PortoEdu - Fastify + TypeScript + OpenAI',
      endpoints: {
        health: 'GET /health',
        chat: 'POST /api/chat',
        recommendations: 'POST /api/recommendations',
        opportunities: {
          list: 'GET /api/opportunities',
          detail: 'GET /api/opportunities/:id',
        },
      },
    }
  })

  // Registra rotas
  await app.register(chatRoutes)
  await app.register(opportunitiesRoutes)
  await app.register(recommendationsRoutes)

  // Error handling
  app.setErrorHandler((error, request, reply) => {
    console.error(error)

    if (error.validation) {
      return reply.code(400).send({
        error: 'Validation error',
        details: error.validation,
      })
    }

    return reply.code(error.statusCode || 500).send({
      error: error.message || 'Internal server error',
    })
  })

  app.setNotFoundHandler((request, reply) => {
    return reply.code(404).send({
      error: 'Route not found',
      path: request.url,
    })
  })

  await app.ready()
}

// Inicializa o app uma vez
let appReady = false
const initPromise = setupApp().then(() => {
  appReady = true
})

/**
 * Handler principal para Vercel
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Aguarda inicialização se necessário
  if (!appReady) {
    await initPromise
  }

  // Injeta a requisição no Fastify
  await app.ready()
  app.server.emit('request', req, res)
}
