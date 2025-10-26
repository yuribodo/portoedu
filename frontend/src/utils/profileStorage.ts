import type { UserProfile } from '@/types/opportunity'

const OLD_STORAGE_KEY = 'portoEdu_userProfile'
const NEW_STORAGE_KEY = 'userProfile'

/**
 * Carrega o perfil do usuário do localStorage, fazendo migração automática
 * da chave antiga (portoEdu_userProfile) para a nova (userProfile) se necessário
 */
export function loadUserProfile(): UserProfile | null {
  try {
    // Primeiro tenta ler da chave nova
    let savedProfile = localStorage.getItem(NEW_STORAGE_KEY)

    if (savedProfile) {
      return JSON.parse(savedProfile)
    }

    // Se não encontrou na chave nova, tenta a chave antiga
    savedProfile = localStorage.getItem(OLD_STORAGE_KEY)

    if (savedProfile) {
      const profile = JSON.parse(savedProfile)

      // Migra para a nova chave
      localStorage.setItem(NEW_STORAGE_KEY, savedProfile)

      // Remove a chave antiga
      localStorage.removeItem(OLD_STORAGE_KEY)

      console.log('Perfil migrado de portoEdu_userProfile para userProfile')

      return profile
    }

    return null
  } catch (error) {
    console.error('Erro ao carregar perfil:', error)
    return null
  }
}

/**
 * Salva o perfil do usuário no localStorage
 */
export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(NEW_STORAGE_KEY, JSON.stringify(profile))
  } catch (error) {
    console.error('Erro ao salvar perfil:', error)
  }
}

/**
 * Remove o perfil do usuário do localStorage
 */
export function clearUserProfile(): void {
  try {
    localStorage.removeItem(NEW_STORAGE_KEY)
    localStorage.removeItem(OLD_STORAGE_KEY) // Limpa também a chave antiga, se existir
  } catch (error) {
    console.error('Erro ao limpar perfil:', error)
  }
}
