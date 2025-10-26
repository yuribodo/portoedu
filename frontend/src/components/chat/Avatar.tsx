import { motion } from 'motion/react'

interface AvatarProps {
  animate?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export default function Avatar({ animate = false, size = 'md' }: AvatarProps) {
  const sizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  }

  return (
    <motion.div
      className={`${sizes[size]} flex-shrink-0 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center p-1`}
      animate={
        animate
          ? {
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0],
            }
          : {}
      }
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <img
        src="/assets/avatar.png"
        alt="Porti"
        className="w-full h-full rounded-full object-cover"
      />
    </motion.div>
  )
}
