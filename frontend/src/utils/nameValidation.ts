/**
 * Validação e formatação de nomes de usuário
 */

export interface NameValidationResult {
  valid: boolean
  formatted: string
  error?: string
}

/**
 * Valida e formata o nome do usuário:
 * - Tamanho entre 2 e 50 caracteres
 * - Apenas letras e espaços
 * - Capitalização automática (primeira letra de cada palavra em maiúscula)
 */
export function validateAndFormatName(input: string): NameValidationResult {
  // Remove espaços extras no início e fim
  const trimmed = input.trim()

  // Verifica tamanho mínimo
  if (trimmed.length < 2) {
    return {
      valid: false,
      formatted: trimmed,
      error: 'O nome precisa ter pelo menos 2 caracteres',
    }
  }

  // Verifica tamanho máximo
  if (trimmed.length > 50) {
    return {
      valid: false,
      formatted: trimmed,
      error: 'O nome não pode ter mais de 50 caracteres',
    }
  }

  // Verifica se contém apenas letras e espaços (aceita acentos)
  const onlyLettersAndSpaces = /^[a-záàâãéèêíïóôõöúçñA-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]+$/
  if (!onlyLettersAndSpaces.test(trimmed)) {
    return {
      valid: false,
      formatted: trimmed,
      error: 'O nome deve conter apenas letras e espaços',
    }
  }

  // Capitaliza primeira letra de cada palavra
  const formatted = trimmed
    .toLowerCase()
    .split(' ')
    .filter((word) => word.length > 0) // Remove espaços duplos
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    valid: true,
    formatted,
  }
}
