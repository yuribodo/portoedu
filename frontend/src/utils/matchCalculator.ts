import type {
  OpportunityDetail,
  OpportunityRequirement,
  UserProfile,
  CompatibilityResult
} from '@/types/opportunity'

/**
 * Calcula a compatibilidade entre um perfil de usuário e uma oportunidade
 */
export function calculateCompatibility(
  profile: UserProfile,
  opportunity: OpportunityDetail
): CompatibilityResult {
  const totalRequirements = opportunity.requirements.length
  let matchedRequirements = 0
  const reasons: string[] = []
  const missingRequirements: string[] = []

  // Se não há perfil, retorna match baixo
  if (!profile || Object.keys(profile).length === 0) {
    return {
      percentage: 0,
      matchedRequirements: 0,
      totalRequirements,
      reasons: ['Complete seu perfil para ver sua compatibilidade'],
      missingRequirements: opportunity.requirements.map(req => req.description)
    }
  }

  // Analisa cada requisito
  opportunity.requirements.forEach(requirement => {
    const matches = checkRequirement(profile, requirement)

    if (matches) {
      matchedRequirements++
      reasons.push(requirement.description)
    } else {
      // Só adiciona como "missing" se for obrigatório
      if (requirement.required) {
        missingRequirements.push(requirement.description)
      }
    }
  })

  // Calcula percentual (0-100)
  const percentage = totalRequirements > 0
    ? Math.round((matchedRequirements / totalRequirements) * 100)
    : 0

  return {
    percentage,
    matchedRequirements,
    totalRequirements,
    reasons,
    missingRequirements
  }
}

/**
 * Verifica se um requisito específico é atendido pelo perfil
 */
function checkRequirement(
  profile: UserProfile,
  requirement: OpportunityRequirement
): boolean {
  switch (requirement.type) {
    case 'idade':
      return checkIdadeRequirement(profile.idade, requirement.value)

    case 'escola-publica':
      return checkEscolaPublicaRequirement(profile.escolaPublica, requirement.value)

    case 'interesse':
      return checkInteresseRequirement(profile.interesses, requirement.value)

    case 'renda':
      return checkRendaRequirement(profile.renda, requirement.value)

    case 'escolaridade':
      return checkEscolaridadeRequirement(profile.escolaridade, requirement.value)

    case 'outro':
      // Requisitos "outro" não podem ser verificados automaticamente
      // Retorna true por padrão para não penalizar o match
      return true

    default:
      return true
  }
}

/**
 * Verifica requisito de idade
 */
function checkIdadeRequirement(
  userAge: number | undefined,
  requirementValue: { min?: number; max?: number } | undefined
): boolean {
  if (!userAge || !requirementValue) return false

  const { min, max } = requirementValue

  if (min !== undefined && userAge < min) return false
  if (max !== undefined && userAge > max) return false

  return true
}

/**
 * Verifica requisito de escola pública
 */
function checkEscolaPublicaRequirement(
  userEscolaPublica: boolean | undefined,
  requirementValue: boolean | undefined
): boolean {
  if (userEscolaPublica === undefined || requirementValue === undefined) return false

  // Se o requisito exige escola pública, verifica se usuário estudou
  if (requirementValue === true) {
    return userEscolaPublica === true
  }

  // Se não exige escola pública, qualquer um pode
  return true
}

/**
 * Verifica requisito de interesse
 */
function checkInteresseRequirement(
  userInterests: string[] | undefined,
  requirementValue: string[] | undefined
): boolean {
  if (!userInterests || !requirementValue) return false
  if (userInterests.length === 0 || requirementValue.length === 0) return false

  // Verifica se há pelo menos 1 interesse em comum
  const hasCommonInterest = requirementValue.some(requiredInterest =>
    userInterests.some(userInterest =>
      userInterest.toLowerCase() === requiredInterest.toLowerCase()
    )
  )

  return hasCommonInterest
}

/**
 * Verifica requisito de renda
 */
function checkRendaRequirement(
  userRenda: 'baixa' | 'media' | 'alta' | undefined,
  requirementValue: string | undefined
): boolean {
  if (!userRenda || !requirementValue) return false

  // Se o requisito menciona renda baixa, aceita apenas baixa
  if (requirementValue.toLowerCase().includes('baixa')) {
    return userRenda === 'baixa'
  }

  // Se menciona renda média, aceita baixa ou média
  if (requirementValue.toLowerCase().includes('média') || requirementValue.toLowerCase().includes('media')) {
    return userRenda === 'baixa' || userRenda === 'media'
  }

  // Por padrão, aceita qualquer renda
  return true
}

/**
 * Verifica requisito de escolaridade
 */
function checkEscolaridadeRequirement(
  userEscolaridade: string | undefined,
  requirementValue: string | undefined
): boolean {
  if (!userEscolaridade) return false
  if (!requirementValue) return true

  // Verificação simples por palavras-chave
  const userEsc = userEscolaridade.toLowerCase()
  const reqValue = requirementValue.toLowerCase()

  // Se exige fundamental e usuário tem médio/superior, atende
  if (reqValue.includes('fundamental') &&
      (userEsc.includes('médio') || userEsc.includes('medio') || userEsc.includes('superior'))) {
    return true
  }

  // Se exige médio e usuário tem superior, atende
  if (reqValue.includes('médio') || reqValue.includes('medio')) {
    return userEsc.includes('médio') || userEsc.includes('medio') || userEsc.includes('superior')
  }

  // Se exige graduação, verifica se tem
  if (reqValue.includes('graduação') || reqValue.includes('graduacao')) {
    return userEsc.includes('graduação') || userEsc.includes('graduacao') || userEsc.includes('superior')
  }

  // Por padrão, considera que atende
  return true
}

/**
 * Ordena oportunidades por compatibilidade (maior para menor)
 */
export function sortByCompatibility(
  opportunities: OpportunityDetail[],
  profile: UserProfile
): OpportunityDetail[] {
  return [...opportunities].sort((a, b) => {
    const matchA = calculateCompatibility(profile, a)
    const matchB = calculateCompatibility(profile, b)
    return matchB.percentage - matchA.percentage
  })
}

/**
 * Filtra oportunidades com compatibilidade mínima
 */
export function filterByMinCompatibility(
  opportunities: OpportunityDetail[],
  profile: UserProfile,
  minPercentage: number = 50
): OpportunityDetail[] {
  return opportunities.filter(opp => {
    const match = calculateCompatibility(profile, opp)
    return match.percentage >= minPercentage
  })
}

/**
 * Retorna texto descritivo do nível de compatibilidade
 */
export function getCompatibilityLabel(percentage: number): {
  label: string
  color: string
  emoji: string
} {
  if (percentage >= 90) {
    return {
      label: 'Perfeito pra você!',
      color: 'text-green-700',
      emoji: '🎯'
    }
  }

  if (percentage >= 75) {
    return {
      label: 'Ótima opção',
      color: 'text-green-600',
      emoji: '✨'
    }
  }

  if (percentage >= 60) {
    return {
      label: 'Boa compatibilidade',
      color: 'text-blue-600',
      emoji: '👍'
    }
  }

  if (percentage >= 40) {
    return {
      label: 'Pode ser interessante',
      color: 'text-yellow-600',
      emoji: '💡'
    }
  }

  return {
    label: 'Baixa compatibilidade',
    color: 'text-gray-500',
    emoji: '🤔'
  }
}
