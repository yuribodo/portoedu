import { motion, useMotionValue, useAnimationFrame } from 'motion/react'
import { useRef } from 'react'
import type { Opportunity } from '@/data/opportunities'
import { OpportunityCard } from './OpportunityCard'

interface InfiniteCarouselProps {
  opportunities: Opportunity[]
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

  // Card width: mobile 240px + 6px gap = 246px, desktop 320px + 16px gap = 336px
  // Using average for smooth animation: ~290px
  const cardWidth = typeof window !== 'undefined' && window.innerWidth < 768 ? 246 : 336
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
        className="flex gap-1.5 md:gap-4"
        style={{ x }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {duplicatedOpportunities.map((opportunity, index) => (
          <div key={`${opportunity.id}-${index}`}>
            <OpportunityCard opportunity={opportunity} />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
