import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { generateWelcomeSummary } from '../services/openai.js'
import { filterEligibleOpportunities } from '../services/matcher.js'
import { opportunitiesData } from '../data/opportunities.js'

/**
 * Schema de validação para perfil do usuário
 */
const userProfileSchema = z.object({
  idade: z.number().min(0).max(120).optional(),
  escolaPublica: z.boolean().optional(),
  interesses: z.array(z.string()).optional(),
})

/**
 * Schema de validação do body da request
 */
const recommendationsRequestSchema = z.object({
  userProfile: userProfileSchema,
})

/**
 * Registra as rotas de recomendações
 */
export async function recommendationsRoutes(fastify: FastifyInstance) {
  /**
   * POST /api/recommendations
   *
   * Gera recomendações personalizadas baseadas no perfil do usuário
   *
   * Fluxo:
   * 1. Filtra e ordena oportunidades por compatibilidade (matcher.ts)
   * 2. Seleciona top 2-3 oportunidades
   * 3. Usa IA APENAS para gerar mensagem amigável citando essas top
   * 4. Retorna mensagem + lista completa de oportunidades
   */
  fastify.post('/api/recommendations', async (request, reply) => {
    try {
      // Valida o body da request
      const body = recommendationsRequestSchema.parse(request.body)

      // Se não tem perfil, retorna erro
      if (!body.userProfile || Object.keys(body.userProfile).length === 0) {
        return reply.code(400).send({
          error: 'Perfil do usuário é obrigatório',
          message: 'Por favor, forneça pelo menos idade ou interesses',
        })
      }

      // Passo 1: Filtra e ordena TODAS as oportunidades por compatibilidade
      const sortedOpportunities = filterEligibleOpportunities(
        opportunitiesData,
        body.userProfile
      )

      // Se não encontrou nenhuma oportunidade
      if (sortedOpportunities.length === 0) {
        return reply.code(200).send({
          summary: 'Não encontramos oportunidades que se encaixem perfeitamente com seu perfil agora, mas continue explorando! Novas oportunidades aparecem o tempo todo.',
          opportunities: [],
        })
      }

      // Passo 2: Pega top 2-3 oportunidades para mencionar na mensagem
      const topCount = Math.min(3, sortedOpportunities.length)
      const topOpportunities = sortedOpportunities.slice(0, topCount).map(opp => ({
        id: opp.id,
        title: opp.title,
        category: opp.category,
        icon: opp.icon,
        shortDescription: opp.shortDescription,
        deadline: opp.deadline,
      }))

      // Passo 3: Usa IA APENAS para gerar mensagem amigável
      const summary = await generateWelcomeSummary(
        body.userProfile,
        topOpportunities,
        sortedOpportunities.length
      )

      // Passo 4: Retorna mensagem + lista completa
      return reply.code(200).send({
        summary,
        opportunities: sortedOpportunities,
      })
    } catch (error) {
      // Erro de validação
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: 'Dados inválidos',
          details: error.errors,
        })
      }

      // Erro do serviço de IA
      if (error instanceof Error) {
        console.error('Erro ao gerar recomendações:', error.message)
        return reply.code(500).send({
          error: error.message,
        })
      }

      // Erro genérico
      return reply.code(500).send({
        error: 'Erro ao gerar recomendações',
      })
    }
  })
}
