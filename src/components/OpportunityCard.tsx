import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import type { Opportunity } from '@/data/opportunities'

interface OpportunityCardProps {
  opportunity: Opportunity
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-white/60 backdrop-blur-xl rounded-2xl min-w-[240px] max-w-[240px] h-[320px] md:min-w-[320px] md:max-w-[320px] md:h-[400px] flex-shrink-0 overflow-hidden border border-black/10"
    >
      {/* Category Badge - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <motion.span
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="inline-block px-3 py-1 border border-primary text-primary text-xs font-semibold rounded-full bg-white"
        >
          {opportunity.category}
        </motion.span>
      </div>

      {/* Image/Logo Section */}
      <motion.div
        animate={{
          height: isHovered
            ? (isMobile ? '140px' : '180px')
            : (isMobile ? '190px' : '240px')
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="relative flex items-center justify-center bg-gray-50 overflow-hidden"
      >
        <motion.div
          animate={{
            scale: isHovered ? 0.9 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl"
        >
          {opportunity.logo}
        </motion.div>

        {/* Fade overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </motion.div>

      {/* Content Section */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 md:px-6 md:pb-6">
        {/* Title and Description container */}
        <div className="mb-2 md:mb-3">
          {/* Title */}
          <h3 className="text-base md:text-xl font-bold text-text mb-2 line-clamp-2">
            {opportunity.title}
          </h3>

          {/* Description - appears on hover */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              height: isHovered ? 'auto' : 0,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-xs md:text-sm text-text-muted leading-relaxed">
              {opportunity.description}
            </p>
          </motion.div>
        </div>

        {/* Tags - fixed at bottom */}
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {opportunity.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 md:py-1 bg-background text-text/60 text-[10px] md:text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
