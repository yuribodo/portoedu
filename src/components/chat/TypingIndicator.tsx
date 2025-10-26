import { motion } from 'motion/react'
import Avatar from './Avatar'

export default function TypingIndicator() {
  const dotVariants = {
    start: { y: 0 },
    end: { y: -6 },
  }

  const dotTransition = {
    duration: 0.6,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    ease: 'easeInOut' as const,
  }

  return (
    <motion.div
      className="flex items-end gap-2 mb-4"
      initial={{ opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Avatar animate size="md" />

      <div className="bg-[#E9FDF2] rounded-[20px] px-5 py-3 shadow-sm">
        <div className="flex gap-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-[#22C55E] rounded-full"
              variants={dotVariants}
              initial="start"
              animate="end"
              transition={{
                ...dotTransition,
                delay: index * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
