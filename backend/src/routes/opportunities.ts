import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import {
  getOpportunityById,
  filterOpportunities,
} from '../data/opportunities.js'
import type { OpportunityCategory } from '../types/opportunity.js'

/**
 * Schema de validação para query params de listagem
 */
const listQuerySchema = z.object({
  category: z.enum([
    'bolsa',
    'intercambio',
    'curso',
    'olimpiada',
    'estagio',
    'pesquisa',
    'pos',
    'idioma',
    'empreendedorismo',
  ]).optional(),
  featured: z.enum(['true', 'false']).optional(),
})

/**
 * Schema de validação para params de detalhes
 */
const detailParamsSchema = z.object({
  id: z.string().min(1),
})

/**
 * Schema de validação para body do POST /api/opportunities
 */
const opportunitiesByIdsSchema = z.object({
  ids: z.array(z.string().min(1)),
})

/**
 * Registra as rotas de oportunidades
 */
export async function opportunitiesRoutes(fastify: FastifyInstance) {
  /**
   * GET /api/opportunities
   *
   * Lista todas as oportunidades com filtros opcionais
   *
   * Query params:
   * - category: bolsa | intercambio | curso | olimpiada | estagio | pesquisa | pos | idioma | empreendedorismo
   * - featured: true | false
   */
  fastify.get('/api/opportunities', async (request, reply) => {
    try {
      // Valida query params
      const query = listQuerySchema.parse(request.query)

      // Aplica filtros
      const filtered = filterOpportunities({
        category: query.category as OpportunityCategory | undefined,
        featured: query.featured ? query.featured === 'true' : undefined,
      })

      return reply.code(200).send({
        opportunities: filtered,
        total: filtered.length,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: 'Parâmetros inválidos',
          details: error.errors,
        })
      }

      console.error('Erro ao listar oportunidades:', error)
      return reply.code(500).send({
        error: 'Erro ao buscar oportunidades',
      })
    }
  })

  /**
   * POST /api/opportunities
   *
   * Retorna oportunidades na ordem especificada pelos IDs
   *
   * Body:
   * - ids: string[] - Lista de IDs ordenados
   */
  fastify.post('/api/opportunities', async (request, reply) => {
    try {
      // Valida body
      const body = opportunitiesByIdsSchema.parse(request.body)

      // Busca oportunidades mantendo a ordem dos IDs
      const opportunities = body.ids
        .map(id => getOpportunityById(id))
        .filter(opp => opp !== undefined)

      return reply.code(200).send(opportunities)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: 'Parâmetros inválidos',
          details: error.errors,
        })
      }

      console.error('Erro ao buscar oportunidades por IDs:', error)
      return reply.code(500).send({
        error: 'Erro ao buscar oportunidades',
      })
    }
  })

  /**
   * GET /api/opportunities/:id
   *
   * Retorna detalhes de uma oportunidade específica
   */
  fastify.get('/api/opportunities/:id', async (request, reply) => {
    try {
      // Valida params
      const params = detailParamsSchema.parse(request.params)

      // Busca oportunidade
      const opportunity = getOpportunityById(params.id)

      if (!opportunity) {
        return reply.code(404).send({
          error: 'Oportunidade não encontrada',
        })
      }

      return reply.code(200).send(opportunity)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          error: 'Parâmetros inválidos',
          details: error.errors,
        })
      }

      console.error('Erro ao buscar oportunidade:', error)
      return reply.code(500).send({
        error: 'Erro ao buscar oportunidade',
      })
    }
  })
}
