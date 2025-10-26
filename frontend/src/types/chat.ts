export type MessageRole = 'bot' | 'user'

export type MessageType = 'text' | 'quick-reply' | 'input' | 'typing'

export interface Message {
  id: string
  role: MessageRole
  content: string
  type: MessageType
  options?: QuickReplyOption[]
  timestamp: Date
}

export interface QuickReplyOption {
  id: string
  label: string
  value: string | number | boolean
  emoji?: string
}

export interface UserProfile {
  nome?: string
  idade?: number
  escolaPublica?: boolean
  interesses?: string[]
}

export type ChatStep =
  | 'welcome'
  | 'nome'
  | 'idade'
  | 'escola-publica'
  | 'interesses'
  | 'confirmacao'
  | 'finalizado'

export interface ChatState {
  step: ChatStep
  messages: Message[]
  userProfile: UserProfile
  isTyping: boolean
  isCompleted: boolean
}
