import { useState, useRef, useEffect } from 'react'
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
import type { OpportunityDetail } from '@/types/opportunity'
import type { Message as ChatMessage } from '@/types/chat'

interface PortiAssistantProps {
  opportunity: OpportunityDetail
}

export function PortiAssistant({ opportunity }: PortiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
    content: `Oi! Sou o Porti 🐢 e estou aqui pra te ajudar com essa oportunidade: "${opportunity.title}". Pode me perguntar qualquer coisa!`,
    type: 'text',
    timestamp: new Date()
  }

  // Função de envio de mensagem (mock - pode integrar com IA real depois)
  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      type: 'text',
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setIsTyping(true)

    // Simula resposta do Porti (delay de 1s)
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: getMockResponse(content, opportunity),
        type: 'text',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
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
            💬 Tirar dúvida com Porti
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
                    Tire suas dúvidas sobre esta oportunidade
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
                placeholder="Digite sua dúvida..."
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

// Função mock para gerar respostas (pode ser substituída por IA real)
function getMockResponse(userInput: string, opportunity: OpportunityDetail): string {
  const input = userInput.toLowerCase()

  // Respostas contextuais baseadas na pergunta
  if (input.includes('requisito') || input.includes('preciso') || input.includes('precisa')) {
    return `Os requisitos principais são: ${opportunity.requirements.slice(0, 2).map(r => r.description).join(', ')}. Você pode conferir todos os requisitos na seção "Por que é pra você?" acima!`
  }

  if (input.includes('prazo') || input.includes('quando') || input.includes('data')) {
    return opportunity.hasDeadline
      ? `As inscrições vão até ${opportunity.deadline.toLocaleDateString('pt-BR')}. Não deixe pra última hora! ⏰`
      : 'Essa oportunidade tem inscrições abertas o ano todo! Você pode se candidatar quando quiser. 😊'
  }

  if (input.includes('como') || input.includes('inscrever') || input.includes('participar')) {
    return `Siga os ${opportunity.steps.length} passos na seção "Como participar". O primeiro passo é: ${opportunity.steps[0].title}. Vou te guiar por cada um! 🎯`
  }

  if (input.includes('valor') || input.includes('bolsa') || input.includes('quanto')) {
    return `${opportunity.mainBenefit}. Confira todos os benefícios na seção "O que oferece"! 💰`
  }

  if (input.includes('idade')) {
    const ageReq = opportunity.requirements.find(r => r.type === 'idade')
    return ageReq
      ? `Sobre idade: ${ageReq.description}. Você atende esse requisito? 🎂`
      : 'Essa oportunidade não tem restrição de idade específica!'
  }

  // Resposta padrão
  return 'Boa pergunta! Dê uma olhada nas seções acima para mais detalhes, ou me pergunte algo mais específico sobre requisitos, prazos, ou como se inscrever. Estou aqui pra ajudar! 🐢💚'
}
