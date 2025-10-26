/**
 * Tipos para o sistema de oportunidades do PortoEdu
 */

export type OpportunityCategory =
  | 'bolsa'           // Bolsa de Estudos
  | 'intercambio'     // Intercâmbio
  | 'curso'           // Curso Gratuito
  | 'olimpiada'       // Olimpíadas
  | 'estagio'         // Estágios
  | 'pesquisa'        // Pesquisa Científica
  | 'pos'             // Pós-Graduação
  | 'idioma'          // Idiomas
  | 'empreendedorismo' // Empreendedorismo

export type OpportunityModality =
  | 'online'
  | 'presencial'
  | 'hibrido'

export type OpportunityDuration = {
  amount: number
  unit: 'horas' | 'dias' | 'semanas' | 'meses' | 'anos'
}

export type OpportunityCost =
  | 'gratuito'
  | 'pago'
  | 'bolsa-integral'
  | 'bolsa-parcial'

export interface OpportunityRequirement {
  type: 'idade' | 'escolaridade' | 'escola-publica' | 'renda' | 'interesse' | 'outro'
  description: string
  required: boolean
  /**
   * Valor para verificação automática
   * - idade: { min: number, max?: number }
   * - escola-publica: boolean
   * - interesse: string[] (tags)
   * - outro: any
   */
  value?: any
}

export interface OpportunityStep {
  order: number
  title: string
  description: string
  estimatedTime?: string // Ex: "15 minutos", "1 semana"
  checklist?: string[] // Sub-itens/ações específicas
  tips?: string[] // Dicas importantes
  warnings?: string[] // Avisos/atenções
  link?: string
  completed?: boolean
}

export interface OpportunityBenefit {
  icon: string // emoji ou nome do ícone Phosphor
  title: string
  description: string
}

export interface OpportunityLocation {
  address: string
  city: string
  state: string
  coordinates: {
    lat: number
    lng: number
  }
  venue?: string // Nome do local (ex: "Campus USP", "Sede SEBRAE")
}

export interface OpportunityDetail {
  id: string
  title: string
  category: OpportunityCategory
  icon: string // emoji principal
  banner?: string // URL da imagem de banner/capa
  shortDescription: string // Para card no feed
  fullDescription: string // Para página de detalhes

  // Modalidade e formato
  modality: OpportunityModality
  duration?: OpportunityDuration
  cost: OpportunityCost
  location?: OpportunityLocation // Localização para oportunidades presenciais/híbridas

  // Requisitos e elegibilidade
  requirements: OpportunityRequirement[]
  targetAudience: string // Descrição em linguagem natural

  // Benefícios
  benefits: OpportunityBenefit[]
  mainBenefit: string // Ex: "Bolsa mensal de R$ 300 + certificado"

  // Processo de inscrição
  steps: OpportunityStep[]
  officialLink: string

  // Prazo
  deadline: Date
  hasDeadline: boolean

  // Tags para filtragem
  tags: string[]

  // Metadados
  createdAt: Date
  featured?: boolean // Destacar no feed

  // Para IA/Porti
  portiContext?: string // Contexto específico para o chat contextual

  // Impacto na carreira
  careerImpact?: {
    title: string // Ex: "Como isso vai transformar sua carreira"
    description: string // Explicação do impacto geral
    opportunities: string[] // Lista de oportunidades que isso abre
    differentials: string[] // Diferenciais competitivos que você ganha
  }
}

/**
 * Configuração de categorias com cores e ícones
 */
export interface CategoryConfig {
  id: OpportunityCategory
  name: string
  icon: string // Nome do ícone Phosphor
  color: string // Tailwind color class
  bgColor: string // Background color class
  description: string
}

/**
 * Dados do perfil do usuário (compatível com chat.ts)
 */
export interface UserProfile {
  nome?: string
  idade?: number
  escolaPublica?: boolean
  interesses?: string[]
}

/**
 * Resultado de compatibilidade
 */
export interface CompatibilityResult {
  percentage: number // 0-100
  matchedRequirements: number
  totalRequirements: number
  reasons: string[] // Razões do match
  missingRequirements: string[] // O que não atende
}

/**
 * Filtros disponíveis
 */
export interface OpportunityFilters {
  categories: OpportunityCategory[]
  modalities: OpportunityModality[]
  costs: OpportunityCost[]
  hasDeadline?: boolean
  minMatch?: number // % mínimo de compatibilidade
}
