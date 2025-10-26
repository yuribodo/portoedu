import { useState, useCallback, useEffect, useRef } from 'react'
import type {
  ChatState,
  ChatStep,
  Message,
  QuickReplyOption,
} from '@/types/chat'

const TYPING_DELAY = 800 // 800ms - timing natural

// Oportunidades mockadas para recomendação
const oportunidadesMockadas = [
  { id: 'prouni', nome: 'PROUNI - Programa Universidade para Todos', tipo: 'Bolsa', emoji: '📚' },
  { id: 'fies', nome: 'FIES - Financiamento Estudantil', tipo: 'Bolsa', emoji: '📚' },
  { id: 'ganhe-mundo', nome: 'Ganhe o Mundo - Intercâmbio SP', tipo: 'Intercâmbio', emoji: '✈️' },
  { id: 'fapesp-ic', nome: 'FAPESP - Iniciação Científica', tipo: 'Iniciação Científica', emoji: '🔬' },
  { id: 'pibic', nome: 'PIBIC - Programa de Iniciação Científica', tipo: 'Iniciação Científica', emoji: '🔬' },
  { id: 'ciencia-sem-fronteiras', nome: 'Ciência sem Fronteiras', tipo: 'Intercâmbio', emoji: '✈️' },
]

const idadeOptions: QuickReplyOption[] = [
  { id: 'idade-14', label: '14 anos', value: 14 },
  { id: 'idade-15', label: '15 anos', value: 15 },
  { id: 'idade-16', label: '16 anos', value: 16 },
  { id: 'idade-17', label: '17 anos', value: 17 },
  { id: 'idade-18plus', label: '18+ anos', value: 18 },
]

const escolaPublicaOptions: QuickReplyOption[] = [
  { id: 'escola-sim', label: 'Sim', value: true, emoji: '✅' },
  { id: 'escola-nao', label: 'Não', value: false, emoji: '❌' },
]

const interessesOptions: QuickReplyOption[] = [
  { id: 'tech', label: 'Tecnologia', value: 'Tecnologia', emoji: '💻' },
  { id: 'arts', label: 'Artes', value: 'Artes', emoji: '🎨' },
  { id: 'sciences', label: 'Ciências', value: 'Ciências', emoji: '🔬' },
  { id: 'languages', label: 'Idiomas', value: 'Idiomas', emoji: '🌍' },
  { id: 'health', label: 'Saúde', value: 'Saúde', emoji: '🏥' },
  { id: 'business', label: 'Negócios', value: 'Negócios', emoji: '💼' },
]

export function useChatFlow() {
  const [state, setState] = useState<ChatState>({
    step: 'welcome',
    messages: [],
    userProfile: {},
    isTyping: false,
    isCompleted: false,
  })

  const [selectedInteresses, setSelectedInteresses] = useState<string[]>([])
  const isInitialized = useRef(false)

  // Adiciona mensagem ao chat
  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    }

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }))

    return newMessage
  }, [])

  // Adiciona mensagem do bot com delay de "digitação"
  const addBotMessage = useCallback(
    (content: string, type: Message['type'] = 'text', options?: QuickReplyOption[]) => {
      setState((prev) => ({ ...prev, isTyping: true }))

      setTimeout(() => {
        addMessage({
          role: 'bot',
          content,
          type,
          options,
        })
        setState((prev) => ({ ...prev, isTyping: false }))
      }, TYPING_DELAY)
    },
    [addMessage]
  )

  // Adiciona mensagem do usuário
  const addUserMessage = useCallback(
    (content: string) => {
      addMessage({
        role: 'user',
        content,
        type: 'text',
      })
    },
    [addMessage]
  )

  // Avança para próximo step
  const nextStep = useCallback((currentStep: ChatStep) => {
    const stepFlow: Record<ChatStep, ChatStep> = {
      welcome: 'idade',
      idade: 'escola-publica',
      'escola-publica': 'interesses',
      interesses: 'confirmacao',
      confirmacao: 'finalizado',
      finalizado: 'finalizado',
    }

    setState((prev) => ({ ...prev, step: stepFlow[currentStep] }))
  }, [])

  // Handlers para cada tipo de resposta
  const handleIdadeResponse = useCallback(
    (idade: number) => {
      addUserMessage(`${idade} anos`)
      setState((prev) => ({
        ...prev,
        userProfile: { ...prev.userProfile, idade },
      }))
      addBotMessage(
        'Legal! 😊 E você estuda em escola pública?',
        'quick-reply',
        escolaPublicaOptions
      )
      nextStep('idade')
    },
    [addUserMessage, addBotMessage, nextStep]
  )

  const handleEscolaResponse = useCallback(
    (escolaPublica: boolean) => {
      addUserMessage(escolaPublica ? 'Sim' : 'Não')
      setState((prev) => ({
        ...prev,
        userProfile: { ...prev.userProfile, escolaPublica },
      }))
      addBotMessage(
        'Show! 🌱 Agora me conta: quais áreas mais te chamam atenção? Pode escolher mais de uma!',
        'quick-reply',
        interessesOptions
      )
      nextStep('escola-publica')
    },
    [addUserMessage, addBotMessage, nextStep]
  )

  const handleInteressesResponse = useCallback(
    (interesses: string[]) => {
      if (interesses.length === 0) return

      const interessesText = interesses.join(', ')
      addUserMessage(interessesText)
      setState((prev) => ({
        ...prev,
        userProfile: { ...prev.userProfile, interesses },
      }))

      // Mensagem de confirmação
      setTimeout(() => {
        const profile = state.userProfile
        const summary = `Então, você tem ${profile.idade} anos, ${
          profile.escolaPublica ? 'estuda em escola pública' : 'não estuda em escola pública'
        } e se interessa por ${interessesText}. Está tudo certo?`

        addBotMessage(summary, 'quick-reply', [
          { id: 'confirm-yes', label: 'Sim, está certo!', value: true, emoji: '✅' },
          { id: 'confirm-no', label: 'Não, quero ajustar', value: false, emoji: '✏️' },
        ])
      }, TYPING_DELAY + 200)

      nextStep('interesses')
    },
    [addUserMessage, addBotMessage, nextStep, state.userProfile]
  )

  const handleConfirmacao = useCallback(
    (confirmed: boolean) => {
      if (confirmed) {
        addUserMessage('Sim, está certo!')

        // Salva no localStorage
        localStorage.setItem('portoEdu_userProfile', JSON.stringify(state.userProfile))

        // Mensagem de transição
        addBotMessage('Bacana! 🎯 Com base no seu perfil, separei algumas oportunidades perfeitas pra você:')

        // Mensagem com lista de oportunidades
        setTimeout(() => {
          const oportunidadesHtml = oportunidadesMockadas
            .map(
              (op) =>
                `${op.emoji} <strong>${op.tipo}:</strong> <a href="/oportunidade/${op.id}" class="link-oportunidade">${op.nome}</a>`
            )
            .join('<br/><br/>')

          addBotMessage(oportunidadesHtml)

          // Mensagem final com call-to-action
          setTimeout(() => {
            addBotMessage(
              'Essas são algumas das oportunidades que combinam com você! Quer ver mais detalhes de alguma ou explorar todas as opções?'
            )
          }, TYPING_DELAY + 500)
        }, TYPING_DELAY + 300)

        setState((prev) => ({ ...prev, isCompleted: true }))
        nextStep('confirmacao')
      } else {
        addUserMessage('Não, quero ajustar')
        addBotMessage(
          'Sem problema! 😅 Vamos começar de novo. Me diz, quantos anos você tem?',
          'quick-reply',
          idadeOptions
        )
        setState((prev) => ({
          ...prev,
          step: 'idade',
          userProfile: {},
        }))
        setSelectedInteresses([])
      }
    },
    [addUserMessage, addBotMessage, nextStep, state.userProfile]
  )

  // Handler genérico para QuickReply
  const handleQuickReply = useCallback(
    (option: QuickReplyOption) => {
      switch (state.step) {
        case 'idade':
          handleIdadeResponse(option.value as number)
          break

        case 'escola-publica':
          handleEscolaResponse(option.value as boolean)
          break

        case 'interesses': {
          const interesse = option.value as string
          const newInteresses = selectedInteresses.includes(interesse)
            ? selectedInteresses.filter((i) => i !== interesse)
            : [...selectedInteresses, interesse]

          setSelectedInteresses(newInteresses)
          break
        }

        case 'confirmacao':
          handleConfirmacao(option.value as boolean)
          break
      }
    },
    [
      state.step,
      selectedInteresses,
      handleIdadeResponse,
      handleEscolaResponse,
      handleConfirmacao,
    ]
  )

  // Confirmar seleção de interesses (quando multi-select)
  const confirmInteresses = useCallback(() => {
    if (selectedInteresses.length > 0) {
      handleInteressesResponse(selectedInteresses)
    }
  }, [selectedInteresses, handleInteressesResponse])

  // Handler para input de texto livre
  const handleTextInput = useCallback(
    (text: string) => {
      const trimmed = text.trim().toLowerCase()
      if (!trimmed) return

      switch (state.step) {
        case 'idade': {
          const idade = parseInt(text.trim())
          if (!isNaN(idade) && idade >= 14 && idade <= 100) {
            handleIdadeResponse(idade)
          } else {
            addUserMessage(text)
            addBotMessage(
              'Hmm, não entendi a idade. Pode escolher uma das opções acima? 😅'
            )
          }
          break
        }

        case 'escola-publica': {
          if (trimmed === 'sim' || trimmed === 's') {
            handleEscolaResponse(true)
          } else if (trimmed === 'não' || trimmed === 'nao' || trimmed === 'n') {
            handleEscolaResponse(false)
          } else {
            addUserMessage(text)
            addBotMessage(
              'Desculpa, não entendi. Você pode escolher "Sim" ou "Não" acima? 😊'
            )
          }
          break
        }

        case 'interesses': {
          addUserMessage(text)
          addBotMessage(
            'Legal! Mas seria melhor escolher nas opções acima para eu entender melhor. Pode marcar quantas quiser! 😉'
          )
          break
        }

        case 'confirmacao': {
          if (trimmed === 'sim' || trimmed === 's') {
            handleConfirmacao(true)
          } else if (trimmed === 'não' || trimmed === 'nao' || trimmed === 'n') {
            handleConfirmacao(false)
          } else {
            addUserMessage(text)
            addBotMessage(
              'Ops! Não entendi. Está tudo certo ou quer ajustar? Usa as opções acima! 😅'
            )
          }
          break
        }

        default:
          addUserMessage(text)
      }
    },
    [
      state.step,
      handleIdadeResponse,
      handleEscolaResponse,
      handleConfirmacao,
      addUserMessage,
      addBotMessage,
    ]
  )

  // Inicializa conversa
  useEffect(() => {
    if (!isInitialized.current && state.messages.length === 0) {
      isInitialized.current = true

      addBotMessage('Oi! Eu sou a Porti, sua guia no mar das oportunidades. Bora começar?')

      setTimeout(() => {
        addBotMessage(
          'Me conta, quantos anos você tem?',
          'quick-reply',
          idadeOptions
        )
        nextStep('welcome')
      }, TYPING_DELAY + 500)
    }
  }, [state.messages.length, addBotMessage, nextStep])

  return {
    ...state,
    selectedInteresses,
    handleQuickReply,
    confirmInteresses,
    handleTextInput,
  }
}
