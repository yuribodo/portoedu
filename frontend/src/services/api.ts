import { API_URL } from '@/config/api'
import type { UserProfile } from '@/types/chat'
import type { OpportunityDetail } from '@/types/opportunity'

/**
 * Mensagem do chat
 */
export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

/**
 * Contexto simplificado da oportunidade para enviar ao backend
 */
export interface OpportunityContext {
  id: string
  title: string
  category: string
  shortDescription: string
  fullDescription: string
  requirements: Array<{
    type: string
    description: string
    required: boolean
  }>
  benefits: Array<{
    icon: string
    title: string
    description: string
  }>
  steps: Array<{
    order: number
    title: string
    description: string
  }>
  deadline?: string
  hasDeadline: boolean
  mainBenefit: string
  officialLink: string
  targetAudience: string
}

/**
 * Oportunidade com score de compatibilidade para contexto do chat
 */
export interface OpportunityWithScore {
  id: string
  title: string
  category: string
  shortDescription: string
  fullDescription: string
  requirements: Array<{
    type: string
    description: string
    required: boolean
  }>
  benefits: Array<{
    icon: string
    title: string
    description: string
  }>
  steps: Array<{
    order: number
    title: string
    description: string
  }>
  deadline?: string
  hasDeadline: boolean
  mainBenefit: string
  officialLink: string
  targetAudience: string
  compatibilityScore?: number // Score de 0 a 100
}

/**
 * Contexto de múltiplas oportunidades para chat de exploração
 */
export interface OpportunitiesContext {
  opportunities: OpportunityWithScore[]
  totalCount: number
  hasFilters: boolean
}

/**
 * Request para o chat
 */
export interface ChatRequest {
  message: string
  conversationHistory?: ChatMessage[]
  userProfile?: UserProfile
  opportunityContext?: OpportunityContext // Para chat de oportunidade específica
  opportunitiesContext?: OpportunitiesContext // Para chat de exploração de múltiplas oportunidades
}

/**
 * Response do chat
 */
export interface ChatResponse {
  message: string
  suggestedActions?: Array<{
    type: string
    label: string
  }>
}

/**
 * Response do endpoint de recomendações
 *
 * O backend retorna:
 * - summary: mensagem amigável da Porti citando top 2-3 oportunidades
 * - opportunityIds: lista de IDs ordenados por compatibilidade
 */
export interface RecommendationsResponse {
  summary: string
  opportunityIds: string[]
}

/**
 * Busca recomendações personalizadas do backend
 * Salva automaticamente no cache do localStorage
 */
export async function fetchRecommendations(
  userProfile: UserProfile
): Promise<RecommendationsResponse> {
  try {
    const response = await fetch(`${API_URL}/api/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userProfile }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)
      throw new Error(error?.error || 'Falha ao buscar recomendações')
    }

    const data: RecommendationsResponse = await response.json()

    // Salva no cache
    saveRecommendationsCache(data.opportunityIds, data.summary)

    return data
  } catch (error) {
    console.error('Erro ao buscar recomendações:', error)
    throw error
  }
}

/**
 * Envia mensagem para o chat contextual com a Porti
 *
 * Usado na página de detalhes da oportunidade para responder perguntas
 * específicas sobre aquela oportunidade.
 */
export async function sendChatMessage(
  request: ChatRequest
): Promise<ChatResponse> {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)
      throw new Error(error?.error || 'Falha ao enviar mensagem')
    }

    return response.json()
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
    throw error
  }
}

/**
 * Busca oportunidades por lista de IDs (ordenados)
 *
 * Usa POST /api/opportunities com body { ids: string[] }
 * Retorna as oportunidades na ordem especificada
 */
export async function fetchOpportunitiesByIds(ids: string[]): Promise<OpportunityDetail[]> {
  try {
    const response = await fetch(`${API_URL}/api/opportunities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)
      throw new Error(error?.error || 'Falha ao buscar oportunidades')
    }

    return response.json()
  } catch (error) {
    console.error('Erro ao buscar oportunidades por IDs:', error)
    throw error
  }
}

/**
 * Busca todas as oportunidades do backend (GET - sem ordenação específica)
 */
export async function fetchOpportunities(filters?: {
  category?: string
  featured?: boolean
}): Promise<OpportunityDetail[]> {
  try {
    const params = new URLSearchParams()
    if (filters?.category) params.append('category', filters.category)
    if (filters?.featured !== undefined) params.append('featured', filters.featured.toString())

    const url = `${API_URL}/api/opportunities${params.toString() ? `?${params.toString()}` : ''}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)
      throw new Error(error?.error || 'Falha ao buscar oportunidades')
    }

    return response.json()
  } catch (error) {
    console.error('Erro ao buscar oportunidades:', error)
    throw error
  }
}

/**
 * Busca uma oportunidade específica por ID do backend
 */
export async function fetchOpportunityById(id: string): Promise<OpportunityDetail> {
  try {
    const response = await fetch(`${API_URL}/api/opportunities/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)
      throw new Error(error?.error || 'Falha ao buscar oportunidade')
    }

    return response.json()
  } catch (error) {
    console.error('Erro ao buscar oportunidade:', error)
    throw error
  }
}

/**
 * Helpers para gerenciar cache de recomendações no localStorage
 */
const RECOMMENDATIONS_CACHE_KEY = 'portoedu-recommendations-ids'
const RECOMMENDATIONS_SUMMARY_KEY = 'portoedu-recommendations-summary'
const RECOMMENDATIONS_TIMESTAMP_KEY = 'portoedu-recommendations-timestamp'
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 horas

/**
 * Salva IDs de recomendações no localStorage
 */
export function saveRecommendationsCache(opportunityIds: string[], summary: string): void {
  try {
    localStorage.setItem(RECOMMENDATIONS_CACHE_KEY, JSON.stringify(opportunityIds))
    localStorage.setItem(RECOMMENDATIONS_SUMMARY_KEY, summary)
    localStorage.setItem(RECOMMENDATIONS_TIMESTAMP_KEY, Date.now().toString())
  } catch (error) {
    console.error('Erro ao salvar cache de recomendações:', error)
  }
}

/**
 * Busca IDs de recomendações do cache (se válido)
 * Retorna null se cache expirado ou não existe
 */
export function getRecommendationsCache(): {
  opportunityIds: string[]
  summary: string
} | null {
  try {
    const timestamp = localStorage.getItem(RECOMMENDATIONS_TIMESTAMP_KEY)
    if (!timestamp) return null

    const age = Date.now() - parseInt(timestamp, 10)
    if (age > CACHE_DURATION) {
      // Cache expirado, limpa
      clearRecommendationsCache()
      return null
    }

    const ids = localStorage.getItem(RECOMMENDATIONS_CACHE_KEY)
    const summary = localStorage.getItem(RECOMMENDATIONS_SUMMARY_KEY)

    if (!ids || !summary) return null

    return {
      opportunityIds: JSON.parse(ids),
      summary,
    }
  } catch (error) {
    console.error('Erro ao buscar cache de recomendações:', error)
    return null
  }
}

/**
 * Limpa cache de recomendações
 */
export function clearRecommendationsCache(): void {
  localStorage.removeItem(RECOMMENDATIONS_CACHE_KEY)
  localStorage.removeItem(RECOMMENDATIONS_SUMMARY_KEY)
  localStorage.removeItem(RECOMMENDATIONS_TIMESTAMP_KEY)
}
