import { useState, KeyboardEvent } from 'react'
import { motion } from 'motion/react'
import { PaperPlaneTilt } from '@phosphor-icons/react'

interface UserInputProps {
  onSend: (message: string) => void
  placeholder?: string
  disabled?: boolean
}

export default function UserInput({
  onSend,
  placeholder = 'Digite sua resposta...',
  disabled = false,
}: UserInputProps) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    const trimmed = value.trim()
    if (trimmed && !disabled) {
      onSend(trimmed)
      setValue('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div
      className="fixed md:sticky bottom-0 left-0 right-0 z-50 bg-[#F9FAFB] md:bg-white md:border-t border-gray-200 px-4 py-4"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="max-w-3xl mx-auto flex gap-2 items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="
            flex-1 px-4 py-3 rounded-full border-2 border-[#D1FAE5]
            focus:outline-none focus:border-[#22C55E]
            disabled:opacity-50 disabled:cursor-not-allowed
            text-[#120309] placeholder:text-gray-400
            transition-colors
          "
        />

        <motion.button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className="
            w-12 h-12 rounded-full bg-[#22C55E] text-white
            flex items-center justify-center
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:bg-[#16A34A] transition-colors
            shadow-md
          "
          whileHover={{ scale: value.trim() ? 1.05 : 1 }}
          whileTap={{ scale: value.trim() ? 0.95 : 1 }}
        >
          <PaperPlaneTilt size={20} weight="fill" />
        </motion.button>
      </div>
    </motion.div>
  )
}
