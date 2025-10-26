import { motion, useMotionValue, useAnimationFrame } from 'motion/react'
import { useRef } from 'react'
import type { OpportunityDetail } from '@/types/opportunity'
import { OpportunityFeedCard } from './opportunities/OpportunityFeedCard'

interface InfiniteCarouselProps {
  opportunities: OpportunityDetail[]
  direction?: 'left' | 'right'
  speed?: number
}

export function InfiniteCarousel({
  opportunities,
  direction = 'left',
  speed = 12,
}: InfiniteCarouselProps) {
  const x = useMotionValue(0)
  const isPausedRef = useRef(false)

  // Duplicate items for seamless loop
  const duplicatedOpportunities = [...opportunities, ...opportunities]

  // Card width: mobile 200px + 12px gap = 212px, desktop 360px + 16px gap = 376px
  // OpportunityFeedCard adjusted for mobile
  const cardWidth = typeof window !== 'undefined' && window.innerWidth < 768 ? 212 : 376
  const distance = opportunities.length * cardWidth

  // Calculate speed in pixels per second
  const pixelsPerSecond = distance / speed
  const pixelsPerFrame = (direction === 'left' ? -pixelsPerSecond : pixelsPerSecond) / 60

  useAnimationFrame(() => {
    if (isPausedRef.current) return

    const currentX = x.get()
    let newX = currentX + pixelsPerFrame

    // Reset position for seamless loop
    if (direction === 'left' && newX <= -distance) {
      newX = 0
    } else if (direction === 'right' && newX >= 0) {
      newX = -distance
    }

    x.set(newX)
  })

  const handleMouseEnter = () => {
    isPausedRef.current = true
  }

  const handleMouseLeave = () => {
    isPausedRef.current = false
  }

  return (
    <div className="relative overflow-hidden py-4">
      <motion.div
        className="flex gap-3 md:gap-4"
        style={{ x }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {duplicatedOpportunities.map((opportunity, index) => (
          <div key={`${opportunity.id}-${index}`} className="w-[200px] md:w-[360px] shrink-0">
            <OpportunityFeedCard opportunity={opportunity} index={index} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
