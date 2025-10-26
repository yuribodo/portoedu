import { motion } from 'motion/react'
import type { QuickReplyOption } from '@/types/chat'

interface QuickReplyProps {
  options: QuickReplyOption[]
  onSelect: (option: QuickReplyOption) => void
  multiSelect?: boolean
  selectedValues?: (string | number | boolean)[]
}

export default function QuickReply({
  options,
  onSelect,
  multiSelect: _multiSelect = false,
  selectedValues = [],
}: QuickReplyProps) {
  const isSelected = (value: string | number | boolean) => {
    return selectedValues.includes(value)
  }

  return (
    <motion.div
      className="flex flex-wrap gap-2 mb-4 pl-12"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 24,
        delay: 0.4,
      }}
    >
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          onClick={() => onSelect(option)}
          className={`
            px-4 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer
            ${
              isSelected(option.value)
                ? 'bg-[#22C55E] text-white shadow-md scale-105'
                : 'bg-white text-[#120309] border border-gray-300 hover:border-[#22C55E] hover:shadow-sm'
            }
          `}
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 24,
            delay: 0.5 + index * 0.1,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {option.emoji && <span className="mr-1.5">{option.emoji}</span>}
          {option.label}
        </motion.button>
      ))}
    </motion.div>
  )
}
