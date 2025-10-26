/**
 * Utilitários para formatação de datas e prazos
 */

/**
 * Formata um prazo de forma amigável ("Faltam 3 dias", "Encerra hoje", etc)
 */
export function formatDeadline(deadline: Date): {
  text: string
  urgency: 'high' | 'medium' | 'low' | 'expired'
  color: string
  bgColor: string
} {
  const now = new Date()
  const deadlineDate = new Date(deadline)

  // Remove horas para comparação de dias
  now.setHours(0, 0, 0, 0)
  deadlineDate.setHours(0, 0, 0, 0)

  const diffTime = deadlineDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  // Prazo já passou
  if (diffDays < 0) {
    return {
      text: 'Prazo encerrado',
      urgency: 'expired',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100'
    }
  }

  // Encerra hoje
  if (diffDays === 0) {
    return {
      text: 'Encerra hoje! ⏰',
      urgency: 'high',
      color: 'text-red-700',
      bgColor: 'bg-red-100'
    }
  }

  // Encerra amanhã
  if (diffDays === 1) {
    return {
      text: 'Encerra amanhã ⚠️',
      urgency: 'high',
      color: 'text-red-700',
      bgColor: 'bg-red-100'
    }
  }

  // Menos de 7 dias - urgência alta
  if (diffDays <= 7) {
    return {
      text: `Faltam ${diffDays} dias ⏰`,
      urgency: 'high',
      color: 'text-orange-700',
      bgColor: 'bg-orange-100'
    }
  }

  // Entre 8 e 30 dias - urgência média
  if (diffDays <= 30) {
    return {
      text: `Faltam ${diffDays} dias`,
      urgency: 'medium',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100'
    }
  }

  // Mais de 30 dias - urgência baixa
  if (diffDays <= 60) {
    return {
      text: `Faltam ${diffDays} dias`,
      urgency: 'low',
      color: 'text-blue-700',
      bgColor: 'bg-blue-100'
    }
  }

  // Muito tempo ainda - mostra data completa
  const formattedDate = deadlineDate.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return {
    text: `Até ${formattedDate}`,
    urgency: 'low',
    color: 'text-green-700',
    bgColor: 'bg-green-100'
  }
}

/**
 * Formata uma data no formato brasileiro (DD/MM/AAAA)
 */
export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

/**
 * Formata uma data por extenso (ex: "15 de março de 2025")
 */
export function formatDateLong(date: Date): string {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

/**
 * Retorna se uma data já passou
 */
export function isExpired(deadline: Date): boolean {
  const now = new Date()
  const deadlineDate = new Date(deadline)

  now.setHours(0, 0, 0, 0)
  deadlineDate.setHours(0, 0, 0, 0)

  return deadlineDate < now
}

/**
 * Retorna quantos dias faltam para uma data
 */
export function daysUntil(deadline: Date): number {
  const now = new Date()
  const deadlineDate = new Date(deadline)

  now.setHours(0, 0, 0, 0)
  deadlineDate.setHours(0, 0, 0, 0)

  const diffTime = deadlineDate.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Formata duração (ex: "3 meses", "1 ano")
 */
export function formatDuration(amount: number, unit: string): string {
  const pluralMap: Record<string, string> = {
    'hora': 'horas',
    'horas': 'horas',
    'dia': 'dias',
    'dias': 'dias',
    'semana': 'semanas',
    'semanas': 'semanas',
    'mês': 'meses',
    'meses': 'meses',
    'ano': 'anos',
    'anos': 'anos'
  }

  const normalizedUnit = unit.toLowerCase()
  const singularUnit = normalizedUnit.replace(/s$/, '')
  const pluralUnit = pluralMap[singularUnit] || normalizedUnit

  if (amount === 1) {
    return `${amount} ${singularUnit}`
  }

  return `${amount} ${pluralUnit}`
}

/**
 * Retorna texto relativo ao tempo (ex: "há 2 dias", "há 1 semana")
 */
export function timeAgo(date: Date): string {
  const now = new Date()
  const past = new Date(date)

  const diffTime = now.getTime() - past.getTime()
  const diffMinutes = Math.floor(diffTime / (1000 * 60))
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)

  if (diffMinutes < 1) return 'agora'
  if (diffMinutes === 1) return 'há 1 minuto'
  if (diffMinutes < 60) return `há ${diffMinutes} minutos`

  if (diffHours === 1) return 'há 1 hora'
  if (diffHours < 24) return `há ${diffHours} horas`

  if (diffDays === 1) return 'ontem'
  if (diffDays < 7) return `há ${diffDays} dias`

  if (diffWeeks === 1) return 'há 1 semana'
  if (diffWeeks < 4) return `há ${diffWeeks} semanas`

  if (diffMonths === 1) return 'há 1 mês'
  if (diffMonths < 12) return `há ${diffMonths} meses`

  const diffYears = Math.floor(diffMonths / 12)
  if (diffYears === 1) return 'há 1 ano'
  return `há ${diffYears} anos`
}
