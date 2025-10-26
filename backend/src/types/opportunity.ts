/**
 * Tipos para o sistema de oportunidades do PortoEdu (Backend)
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
  value?: any
}

export interface OpportunityStep {
  order: number
  title: string
  description: string
  estimatedTime?: string
  checklist?: string[]
  tips?: string[]
  warnings?: string[]
  link?: string
  completed?: boolean
}

export interface OpportunityBenefit {
  icon: string
  title: string
  description: string
}

export interface OpportunityDetail {
  id: string
  title: string
  category: OpportunityCategory
  icon: string
  banner?: string
  shortDescription: string
  fullDescription: string

  modality: OpportunityModality
  duration?: OpportunityDuration
  cost: OpportunityCost

  requirements: OpportunityRequirement[]
  targetAudience: string

  benefits: OpportunityBenefit[]
  mainBenefit: string

  steps: OpportunityStep[]
  officialLink: string

  deadline: Date
  hasDeadline: boolean

  tags: string[]

  createdAt: Date
  featured?: boolean

  portiContext?: string

  careerImpact?: {
    title: string
    description: string
    opportunities: string[]
    differentials: string[]
  }
}

/**
 * Dados do perfil do usuário
 */
export interface UserProfile {
  idade?: number
  escolaPublica?: boolean
  interesses?: string[]
}

/**
 * Configuração de categorias
 */
export interface CategoryConfig {
  id: OpportunityCategory
  name: string
  icon: string
  color: string
  bgColor: string
  description: string
}
