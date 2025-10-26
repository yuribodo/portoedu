import type { OpportunityDetail, UserProfile } from '../types/opportunity.js'

/**
 * Resultado de verificação de compatibilidade
 */
export interface CompatibilityCheck {
  isEligible: boolean
  matchScore: number // 0-100
  matchedRequirements: number
  totalRequirements: number
  reasons: string[]
  blockers: string[] // Requisitos que impedem participação
}

/**
 * Verifica compatibilidade entre perfil do usuário e uma oportunidade
 */
export function checkCompatibility(
  opportunity: OpportunityDetail,
  userProfile: UserProfile
): CompatibilityCheck {
  const result: CompatibilityCheck = {
    isEligible: true,
    matchScore: 0,
    matchedRequirements: 0,
    totalRequirements: opportunity.requirements.length,
    reasons: [],
    blockers: [],
  }

  // Se não tem perfil, retorna compatibilidade básica
  if (!userProfile) {
    return {
      ...result,
      matchScore: 50,
      reasons: ['Perfil não informado - análise básica'],
    }
  }

  let matchedCount = 0
  let totalChecked = 0

  // Verifica cada requisito
  for (const req of opportunity.requirements) {
    totalChecked++

    switch (req.type) {
      case 'idade':
        if (userProfile.idade !== undefined && req.value) {
          const { min, max } = req.value
          const idade = userProfile.idade

          if (min !== undefined && idade < min) {
            result.blockers.push(`Idade mínima: ${min} anos (você tem ${idade})`)
            result.isEligible = false
          } else if (max !== undefined && idade > max) {
            result.blockers.push(`Idade máxima: ${max} anos (você tem ${idade})`)
            result.isEligible = false
          } else {
            matchedCount++
            result.reasons.push(`✅ Idade compatível (${idade} anos)`)
          }
        }
        break

      case 'escola-publica':
        if (userProfile.escolaPublica !== undefined && req.value !== undefined) {
          if (userProfile.escolaPublica === req.value) {
            matchedCount++
            result.reasons.push(
              userProfile.escolaPublica
                ? '✅ Você estuda/estudou em escola pública'
                : '✅ Você estuda/estudou em escola particular'
            )
          } else if (req.required) {
            result.blockers.push(
              req.value
                ? 'Requer ter estudado em escola pública'
                : 'Requer ter estudado em escola particular'
            )
            result.isEligible = false
          }
        }
        break

      case 'interesse':
        if (userProfile.interesses && userProfile.interesses.length > 0 && req.value) {
          const requiredInterests = Array.isArray(req.value) ? req.value : [req.value]
          const hasMatch = requiredInterests.some((interest) =>
            userProfile.interesses?.some(
              (userInterest) => userInterest.toLowerCase() === interest.toLowerCase()
            )
          )

          if (hasMatch) {
            matchedCount++
            result.reasons.push(`✅ Seus interesses se alinham com essa oportunidade`)
          }
        }
        break

      case 'renda':
      case 'escolaridade':
      case 'outro':
        // Para esses tipos, não temos informação suficiente no perfil básico
        // Conta como "neutro" - não bloqueia nem adiciona pontos
        break
    }
  }

  // Calcula score de compatibilidade
  result.matchedRequirements = matchedCount
  result.matchScore = totalChecked > 0 ? Math.round((matchedCount / totalChecked) * 100) : 50

  // Boost de score para oportunidades featured
  if (opportunity.featured && result.matchScore > 0) {
    result.matchScore = Math.min(100, result.matchScore + 10)
  }

  return result
}

/**
 * Filtra oportunidades elegíveis baseado no perfil
 */
export function filterEligibleOpportunities(
  opportunities: OpportunityDetail[],
  userProfile: UserProfile
): Array<OpportunityDetail & { compatibility: CompatibilityCheck }> {
  return opportunities
    .map((opp) => ({
      ...opp,
      compatibility: checkCompatibility(opp, userProfile),
    }))
    .filter((opp) => opp.compatibility.isEligible) // Apenas elegíveis
    .sort((a, b) => b.compatibility.matchScore - a.compatibility.matchScore) // Ordena por score
}

/**
 * Formata dados de oportunidades para o prompt da IA
 */
export function formatOpportunitiesForAI(
  opportunities: Array<OpportunityDetail & { compatibility: CompatibilityCheck }>
): string {
  return opportunities
    .slice(0, 10) // Top 10 para não sobrecarregar o prompt
    .map(
      (opp, index) => `
${index + 1}. ${opp.title} (${opp.category})
   - Descrição: ${opp.shortDescription}
   - Custo: ${opp.cost}
   - Modalidade: ${opp.modality}
   - Score de compatibilidade: ${opp.compatibility.matchScore}%
   - Razões: ${opp.compatibility.reasons.join('; ')}
   - Deadline: ${opp.hasDeadline ? new Date(opp.deadline).toLocaleDateString('pt-BR') : 'Sem prazo'}
   - Link: ${opp.officialLink}
`
    )
    .join('\n')
}
