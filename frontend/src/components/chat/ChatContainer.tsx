import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useChatFlow } from '@/hooks/useChatFlow'
import Avatar from './Avatar'
import Message from './Message'
import TypingIndicator from './TypingIndicator'
import QuickReply from './QuickReply'
import UserInput from './UserInput'
import { CheckCircle } from '@phosphor-icons/react'

export default function ChatContainer() {
  const {
    messages,
    isTyping,
    isCompleted,
    step,
    selectedInteresses,
    handleQuickReply,
    confirmInteresses,
    handleTextInput,
  } = useChatFlow()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll suave
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [messages, isTyping, selectedInteresses, isCompleted])

  // Última mensagem com opções de quick reply
  const lastMessage = messages[messages.length - 1]
  const showQuickReply =
    lastMessage?.type === 'quick-reply' && lastMessage.options && !isCompleted

  return (
    <div className="min-h-screen md:min-h-[calc(100vh-6rem)] md:flex md:items-center md:justify-center md:p-8">
      <div className="w-full max-w-4xl min-h-screen md:min-h-0 md:h-[700px] flex flex-col md:bg-white md:rounded-3xl md:shadow-lg md:border md:border-gray-200 md:overflow-hidden">
        {/* Header */}
        <div className="bg-[#F9FAFB] md:bg-gray-50 md:border-b border-gray-200 px-4 py-3.5">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <Avatar size="md" />
              <div>
                <h1 className="text-base font-semibold text-gray-900">
                  Porti - Sua Guia de Oportunidades
                </h1>
                <p className="text-sm text-gray-600 mt-0.5">
                  Vamos conversar para entender seu perfil
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div
          ref={containerRef}
          className="md:flex-1 md:overflow-y-auto px-4 py-6 pb-24 md:pb-6 bg-[#F9FAFB]"
          style={{
            scrollBehavior: 'smooth',
          }}
        >
        <div className="max-w-3xl mx-auto">
          {/* Renderiza mensagens */}
          {messages.map((message) => (
            <Message key={message.id} message={message} delay={0.05} />
          ))}

          {/* Typing indicator */}
          {isTyping && <TypingIndicator />}

          {/* Quick Reply Options */}
          <AnimatePresence>
            {showQuickReply && (
              <QuickReply
                options={lastMessage.options!}
                onSelect={handleQuickReply}
                multiSelect={step === 'interesses'}
                selectedValues={step === 'interesses' ? selectedInteresses : []}
              />
            )}
          </AnimatePresence>

          {/* Botão confirmar interesses */}
          {step === 'interesses' && selectedInteresses.length > 0 && showQuickReply && (
            <motion.div
              className="pl-12 mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <button
                onClick={confirmInteresses}
                className="
                  px-6 py-3 bg-[#22C55E] text-white rounded-full font-medium
                  hover:bg-[#16A34A] transition-colors shadow-md
                  flex items-center gap-2
                "
              >
                <CheckCircle size={20} weight="fill" />
                Confirmar ({selectedInteresses.length} selecionado
                {selectedInteresses.length > 1 ? 's' : ''})
              </button>
            </motion.div>
          )}

          {/* Botão ver todas oportunidades (quando completado) */}
          {isCompleted && (
            <motion.div
              className="mt-6 flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <a
                href="/oportunidades"
                className="
                  px-6 py-3 bg-[#22C55E] text-white rounded-full font-medium
                  hover:bg-[#16A34A] transition-colors shadow-md
                  inline-flex items-center gap-2
                "
              >
                Ver todas as oportunidades
              </a>
            </motion.div>
          )}

          {/* Scroll anchor - posicionado após todos elementos interativos */}
          <div ref={messagesEndRef} />
        </div>
        </div>

        {/* Input de texto */}
        <UserInput
          onSend={handleTextInput}
          placeholder="Digite sua resposta..."
          disabled={isCompleted}
        />
      </div>
    </div>
  )
}
