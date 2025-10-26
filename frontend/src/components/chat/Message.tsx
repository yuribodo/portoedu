import { motion } from 'motion/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Message as MessageType } from '@/types/chat'
import Avatar from './Avatar'

interface MessageProps {
  message: MessageType
  delay?: number
}

export default function Message({ message, delay = 0 }: MessageProps) {
  const isBot = message.role === 'bot'

  return (
    <motion.div
      className={`flex items-end gap-2 mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, y: 8, scale: 0.96, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {isBot && <Avatar size="md" />}

      <div
        className={`
          max-w-[75%] sm:max-w-[60%] rounded-[20px] px-5 py-3 shadow-sm
          ${
            isBot
              ? 'bg-[#E9FDF2] text-gray-900'
              : 'bg-white border border-gray-200 text-gray-900'
          }
        `}
      >
        <div className="text-base leading-relaxed prose prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Links clicáveis e estilizados
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  className="text-primary hover:text-primary-dark underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              // Parágrafos com espaçamento adequado
              p: ({ node, ...props }) => (
                <p {...props} className="mb-2 last:mb-0" />
              ),
              // Listas com espaçamento
              ul: ({ node, ...props }) => (
                <ul {...props} className="list-disc list-inside mb-2 space-y-1" />
              ),
              ol: ({ node, ...props }) => (
                <ol {...props} className="list-decimal list-inside mb-2 space-y-1" />
              ),
              li: ({ node, ...props }) => (
                <li {...props} className="ml-2" />
              ),
              // Negrito e itálico
              strong: ({ node, ...props }) => (
                <strong {...props} className="font-semibold text-gray-900" />
              ),
              em: ({ node, ...props }) => (
                <em {...props} className="italic" />
              ),
              // Code blocks
              code: ({ node, className, children, ...props }) => {
                const isInline = !className
                return isInline ? (
                  <code
                    {...props}
                    className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
                  >
                    {children}
                  </code>
                ) : (
                  <code
                    {...props}
                    className="block bg-gray-100 text-gray-800 p-3 rounded-lg text-sm font-mono overflow-x-auto"
                  >
                    {children}
                  </code>
                )
              },
              // Headings (se a IA usar)
              h1: ({ node, ...props }) => (
                <h1 {...props} className="text-xl font-bold mb-2" />
              ),
              h2: ({ node, ...props }) => (
                <h2 {...props} className="text-lg font-bold mb-2" />
              ),
              h3: ({ node, ...props }) => (
                <h3 {...props} className="text-base font-bold mb-1" />
              ),
              // Blockquotes
              blockquote: ({ node, ...props }) => (
                <blockquote
                  {...props}
                  className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-2"
                />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>

      {!isBot && <div className="w-10" />}
    </motion.div>
  )
}
