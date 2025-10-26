import { useState, useRef, useEffect, useMemo } from 'react'
import { motion } from 'motion/react'
import { ChatCircle } from '@phosphor-icons/react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import Avatar from '@/components/chat/Avatar'
import Message from '@/components/chat/Message'
import TypingIndicator from '@/components/chat/TypingIndicator'
import UserInput from '@/components/chat/UserInput'
import type { OpportunityDetail, UserProfile, CompatibilityResult } from '@/types/opportunity'
import type { Message as ChatMessage } from '@/types/chat'
import {
  sendChatMessage,
  type ChatMessage as APIChatMessage,
  type OpportunityWithScore,
  type OpportunitiesContext
} from '@/services/api'

interface OpportunitiesAssistantProps {
  opportunities: Array<{
    opportunity: OpportunityDetail
    compatibility: CompatibilityResult | null
  }>
  userProfile: UserProfile | null
  hasFilters?: boolean
  totalCount?: number
}

export function OpportunitiesAssistant({
  opportunities,
  userProfile,
  hasFilters = false,
  totalCount
}: OpportunitiesAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Gera uma chave única baseada nos IDs das oportunidades para forçar reset do chat quando mudar
  const opportunitiesKey = useMemo(() => {
    return opportunities.map(o => o.opportunity.id).join(',')
  }, [opportunities])

  // Reseta as mensagens quando as oportunidades mudarem (filtros aplicados)
  useEffect(() => {
    if (isOpen) {
      setMessages([])
    }
  }, [opportunitiesKey])

  // Auto-scroll quando há novas mensagens
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [messages, isTyping])

  // Mensagem de boas-vindas quando abre o chat
  const welcomeMessage: ChatMessage = {
    id: 'welcome',
    role: 'bot',
    content: `Oi! Sou o Porti 🐢 e estou aqui pra te ajudar a explorar e comparar as ${opportunities.length} oportunidade${opportunities.length !== 1 ? 's' : ''} ${hasFilters ? 'filtradas' : 'disponíveis'}. Pode me perguntar sobre qualquer uma delas!`,
    type: 'text',
    timestamp: new Date()
  }

  // Função de envio de mensagem (integrada com backend)
  const handleSendMessage = async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      type: 'text',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    try {
      // Formata contexto de múltiplas oportunidades para o backend
      const opportunitiesWithScore: OpportunityWithScore[] = opportunities.map(({ opportunity, compatibility }) => {
        // Converte deadline para string ISO de forma segura
        let deadlineString: string | undefined
        if (opportunity.deadline) {
          if (opportunity.deadline instanceof Date) {
            deadlineString = opportunity.deadline.toISOString()
          } else if (typeof opportunity.deadline === 'string') {
            deadlineString = opportunity.deadline
          }
        }

        return {
          id: opportunity.id,
          title: opportunity.title,
          category: opportunity.category,
          shortDescription: opportunity.shortDescription,
          fullDescription: opportunity.fullDescription,
          requirements: opportunity.requirements.map(req => ({
            type: req.type,
            description: req.description,
            required: req.required,
          })),
          benefits: opportunity.benefits.map(b => ({
            icon: b.icon,
            title: b.title,
            description: b.description,
          })),
          steps: opportunity.steps.map(s => ({
            order: s.order,
            title: s.title,
            description: s.description,
          })),
          deadline: deadlineString,
          hasDeadline: opportunity.hasDeadline,
          mainBenefit: opportunity.mainBenefit,
          officialLink: opportunity.officialLink,
          targetAudience: opportunity.targetAudience,
          compatibilityScore: compatibility?.percentage ?? undefined,
        }
      })

      const opportunitiesContext: OpportunitiesContext = {
        opportunities: opportunitiesWithScore,
        totalCount: totalCount ?? opportunities.length,
        hasFilters,
      }

      // Converte histórico de mensagens para formato da API
      const conversationHistory: APIChatMessage[] = messages.map(msg => ({
        role: msg.role === 'bot' ? 'assistant' : 'user',
        content: msg.content,
      }))

      // Chama o backend
      const response = await sendChatMessage({
        message: content,
        conversationHistory,
        ...(userProfile && { userProfile }),
        opportunitiesContext,
      })

      // Adiciona resposta do bot
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: response.message,
        type: 'text',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)

      // Mensagem de erro amigável
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: 'Ops! Tive um probleminha ao processar sua mensagem. Pode tentar novamente? 😅',
        type: 'text',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      {/* Botão flutuante */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-4 md:bottom-8 md:right-6 z-30 bg-gradient-to-br from-primary to-primary-dark text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all group"
      >
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChatCircle size={24} weight="fill" />
        </motion.div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-gray-900 text-white text-xs rounded-lg py-1.5 px-3 whitespace-nowrap">
            💬 Conversar com Porti
          </div>
        </div>
      </motion.button>

      {/* Modal Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="bottom"
          className="h-[85vh] max-h-[700px] rounded-t-[var(--radius-lg)] p-0 border-t-2 border-primary/20"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <SheetHeader className="bg-[#F9FAFB] border-b border-gray-200 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ rotate: { duration: 0.5 } }}
                >
                  <Avatar size="md" />
                </motion.div>
                <div className="flex-1 text-left">
                  <SheetTitle className="text-base font-semibold text-gray-900">
                    Assistente Porti
                  </SheetTitle>
                  <SheetDescription className="text-sm text-gray-600 mt-0.5">
                    Tire suas dúvidas sobre as oportunidades
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 bg-[#F9FAFB]">
              {/* Welcome message */}
              <Message message={welcomeMessage} />

              {/* Chat messages */}
              {messages.map((message) => (
                <Message key={message.id} message={message} delay={0.05} />
              ))}

              {/* Typing indicator */}
              {isTyping && <TypingIndicator />}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - Override fixed positioning from UserInput */}
            <div className="[&>div]:!static [&>div]:!bg-white [&>div]:!border-t">
              <UserInput
                onSend={handleSendMessage}
                placeholder="Pergunte sobre as oportunidades..."
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
