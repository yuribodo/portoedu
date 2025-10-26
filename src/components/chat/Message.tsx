import { motion } from 'motion/react'
import type { Message as MessageType } from '@/types/chat'
import Avatar from './Avatar'

interface MessageProps {
  message: MessageType
  delay?: number
}

export default function Message({ message, delay = 0 }: MessageProps) {
  const isBot = message.role === 'bot'
  const hasHtml = message.content.includes('<a') || message.content.includes('<br')

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
        {hasHtml ? (
          <div
            className="text-base leading-relaxed message-content"
            dangerouslySetInnerHTML={{ __html: message.content }}
          />
        ) : (
          <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
        )}
      </div>

      {!isBot && <div className="w-10" />}
    </motion.div>
  )
}
