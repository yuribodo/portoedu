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
 * Request para o chat
 */
export interface ChatRequest {
  message: string
  conversationHistory?: ChatMessage[]
  userProfile?: UserProfile
  opportunityContext?: OpportunityContext
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
 * - opportunities: lista completa de oportunidades ordenadas por compatibilidade
 */
export interface RecommendationsResponse {
  summary: string
  opportunities: OpportunityDetail[]
}

/**
 * Busca recomendações personalizadas do backend
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

    return response.json()
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
