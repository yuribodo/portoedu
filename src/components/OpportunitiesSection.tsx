import { motion } from 'motion/react'
import { InfiniteCarousel } from './InfiniteCarousel'
import { opportunities } from '@/data/opportunities'

export function OpportunitiesSection() {
  // Split opportunities into two groups for the two carousels
  const firstHalf = opportunities.slice(0, 6)
  const secondHalf = opportunities.slice(6, 12)

  return (
    <section id="opportunities" className="py-12 md:py-16 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-text mb-2 md:mb-3">
            Oportunidades em Destaque
          </h2>
          <p className="text-base md:text-lg text-text-muted">
            Explore bolsas, cursos e programas que podem transformar sua carreira
          </p>
        </motion.div>
      </div>

      {/* First Carousel - Right to Left */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <InfiniteCarousel opportunities={firstHalf} direction="left" speed={25} />
      </motion.div>

      {/* Second Carousel - Left to Right */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-6 md:mt-8"
      >
        <InfiniteCarousel opportunities={secondHalf} direction="right" speed={25} />
      </motion.div>
    </section>
  )
}
