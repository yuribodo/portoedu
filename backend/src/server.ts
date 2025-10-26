import Fastify from 'fastify'
import cors from '@fastify/cors'
import { env } from './config/env.js'
import { chatRoutes } from './routes/chat.js'
import { opportunitiesRoutes } from './routes/opportunities.js'
import { recommendationsRoutes } from './routes/recommendations.js'
import { validateOpenAIKey } from './services/openai.js'

/**
 * Cria e configura o servidor Fastify
 */
async function createServer() {
  const fastify = Fastify({
    logger: env.NODE_ENV === 'development' ? true : false,
  })

  // ===== PLUGINS =====

  // CORS - permite requisições do frontend
  await fastify.register(cors, {
    origin: env.FRONTEND_URL,
    credentials: true,
  })

  // ===== ROTAS =====

  // Health check
  fastify.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      openaiConfigured: validateOpenAIKey(),
    }
  })

  // Rota raiz
  fastify.get('/', async () => {
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
      docs: 'https://github.com/yourusername/portoedu',
    }
  })

  // Registra rotas de chat
  await fastify.register(chatRoutes)

  // Registra rotas de oportunidades
  await fastify.register(opportunitiesRoutes)

  // Registra rotas de recomendações
  await fastify.register(recommendationsRoutes)

  // ===== ERROR HANDLING =====

  // Handler global de erros
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error)

    // Erro de validação
    if (error.validation) {
      return reply.code(400).send({
        error: 'Validation error',
        details: error.validation,
      })
    }

    // Erro genérico
    return reply.code(error.statusCode || 500).send({
      error: error.message || 'Internal server error',
    })
  })

  // Handler de rota não encontrada
  fastify.setNotFoundHandler((request, reply) => {
    return reply.code(404).send({
      error: 'Route not found',
      path: request.url,
    })
  })

  return fastify
}

/**
 * Inicia o servidor
 */
async function start() {
  try {
    // Valida se a API Key da OpenAI está configurada
    if (!validateOpenAIKey()) {
      console.error('❌ OPENAI_API_KEY não está configurada!')
      console.error('Por favor, configure a variável no arquivo .env')
      process.exit(1)
    }

    const fastify = await createServer()

    // Inicia o servidor
    await fastify.listen({
      port: env.PORT,
      host: '0.0.0.0', // Permite acesso externo
    })

    console.log('🚀 Servidor PortoEdu iniciado!')
    console.log(`📍 Rodando em: http://localhost:${env.PORT}`)
    console.log(`🌍 Ambiente: ${env.NODE_ENV}`)
    console.log(`✅ OpenAI configurada: ${validateOpenAIKey()}`)
    console.log(`🔗 Frontend URL: ${env.FRONTEND_URL}`)
    console.log('\n📚 Endpoints disponíveis:')
    console.log(`  - GET  /health`)
    console.log(`  - POST /api/chat`)
    console.log(`  - POST /api/recommendations`)
    console.log(`  - GET  /api/opportunities`)
    console.log(`  - GET  /api/opportunities/:id`)

    // Graceful shutdown
    const signals = ['SIGINT', 'SIGTERM']
    signals.forEach((signal) => {
      process.on(signal, async () => {
        console.log(`\n⏸️  Recebido sinal ${signal}, encerrando servidor...`)
        await fastify.close()
        console.log('✅ Servidor encerrado com sucesso')
        process.exit(0)
      })
    })
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error)
    process.exit(1)
  }
}

// Inicia o servidor
start()
