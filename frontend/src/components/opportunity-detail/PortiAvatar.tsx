import { motion } from 'motion/react'

interface PortiAvatarProps {
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
  className?: string
}

export function PortiAvatar({ size = 'md', animate = true, className }: PortiAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xl',
    md: 'w-12 h-12 text-3xl',
    lg: 'w-16 h-16 text-4xl'
  }

  const idleAnimation = animate ? {
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  } : undefined

  const waveAnimation = {
    rotate: [0, 15, -15, 15, -15, 0],
    transition: {
      duration: 0.8
    }
  }

  return (
    <motion.div
      className={`
        ${sizeClasses[size]}
        rounded-full
        bg-gradient-to-br from-green-100 to-green-200
        flex items-center justify-center
        shadow-sm
        ${className || ''}
      `}
      animate={idleAnimation}
      whileHover={animate ? waveAnimation : undefined}
    >
      <span className="select-none">🐢</span>
    </motion.div>
  )
}
