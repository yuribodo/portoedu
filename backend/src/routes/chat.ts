import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { sendChatMessage } from '../services/openai.js'

/**
 * Schema de validação para mensagem do chat
 */
const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
})

/**
 * Schema de validação para perfil do usuário
 */
const userProfileSchema = z.object({
  idade: z.number().optional(),
  escolaPublica: z.boolean().optional(),
  interesses: z.array(z.string()).optional(),
}).optional()

/**
 * Schema para contexto de uma oportunidade específica
 */
const opportunityContextSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  requirements: z.array(z.object({
    type: z.string(),
    description: z.string(),
    required: z.boolean(),
  })),
  benefits: z.array(z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
  })),
  steps: z.array(z.object({
    order: z.number(),
    title: z.string(),
    description: z.string(),
  })),
  deadline: z.string().optional(),
  hasDeadline: z.boolean(),
  mainBenefit: z.string(),
  officialLink: z.string(),
  targetAudience: z.string(),
}).optional()

/**
 * Schema para oportunidade com score de compatibilidade
 */
const opportunityWithScoreSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  requirements: z.array(z.object({
    type: z.string(),
    description: z.string(),
    required: z.boolean(),
  })),
  benefits: z.array(z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
  })),
  steps: z.array(z.object({
    order: z.number(),
    title: z.string(),
    description: z.string(),
  })),
  deadline: z.string().optional(),
  hasDeadline: z.boolean(),
  mainBenefit: z.string(),
  officialLink: z.string(),
  targetAudience: z.string(),
  compatibilityScore: z.number().min(0).max(100).optional(),
})

/**
 * Schema para contexto de múltiplas oportunidades
 */
const opportunitiesContextSchema = z.object({
  opportunities: z.array(opportunityWithScoreSchema),
  totalCount: z.number(),
  hasFilters: z.boolean(),
}).optional()

/**
 * Schema de validação do body da request
 */
const chatRequestSchema = z.object({
  message: z.string().min(1).max(1000),
  conversationHistory: z.array(chatMessageSchema).optional(),
  userProfile: userProfileSchema,
  opportunityContext: opportunityContextSchema,
  opportunitiesContext: opportunitiesContextSchema,
})

/**
 * Registra as rotas de chat
 */
export async function chatRoutes(fastify: FastifyInstance) {
  /**
   * POST /api/chat
   *
   * Envia mensagem para o chat com a Porti
   */
  fastify.post('/api/chat', async (request, reply) => {
    try {
      // Valida o body da request
      const body = chatRequestSchema.parse(request.body)

      // Envia mensagem para OpenAI
      const response = await sendChatMessage({
        message: body.message,
        conversationHistory: body.conversationHistory,
        userProfile: body.userProfile,
        opportunityContext: body.opportunityContext,
        opportunitiesContext: body.opportunitiesContext,
      })

      return reply.code(200).send(response)
    } catch (error) {
      // Erro de validação
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: 'Dados inválidos',
          details: error.errors,
        })
      }

      // Erro do serviço OpenAI
      if (error instanceof Error) {
        console.error('Erro no chat:', error.message)
        return reply.code(500).send({
          error: error.message,
        })
      }

      // Erro genérico
      return reply.code(500).send({
        error: 'Erro ao processar mensagem',
      })
    }
  })
}
