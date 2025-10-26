import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { InfiniteCarousel } from './InfiniteCarousel'
import { opportunitiesData } from '@/data/opportunitiesDetailed'
import {
  fetchOpportunities,
  fetchOpportunitiesByIds,
  getRecommendationsCache,
} from '@/services/api'
import type { OpportunityDetail } from '@/types/opportunity'

export function OpportunitiesSection() {
  // Start with mockdata, will be replaced by backend data
  const [opportunities, setOpportunities] = useState<OpportunityDetail[]>(opportunitiesData)

  // Fetch opportunities from backend
  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        // 1. Verifica se tem cache de recomendações (já ordenadas por compatibilidade)
        const cache = getRecommendationsCache()
        if (cache && cache.opportunityIds.length > 0) {
          // Pega primeiros 12 IDs do cache para exibir
          const topIds = cache.opportunityIds.slice(0, 12)
          const cachedOpportunities = await fetchOpportunitiesByIds(topIds)
          if (cachedOpportunities && cachedOpportunities.length > 0) {
            setOpportunities(cachedOpportunities)
            return
          }
        }

        // 2. Se não tem cache, busca oportunidades em destaque do backend
        const backendOpportunities = await fetchOpportunities({ featured: true })
        if (backendOpportunities && backendOpportunities.length > 0) {
          setOpportunities(backendOpportunities)
        }
      } catch (error) {
        console.error('Failed to fetch opportunities from backend, using local data:', error)
        // Keep mockdata as fallback
      }
    }

    loadOpportunities()
  }, [])

  // Get featured opportunities, fallback to all if not enough featured ones
  const featuredOpportunities = opportunities.filter(opp => opp.featured === true)
  let displayOpportunities = featuredOpportunities.length >= 6
    ? featuredOpportunities
    : opportunities.slice(0, 12)

  // Se tiver menos de 12 oportunidades, repete para preencher os 2 carousels
  if (displayOpportunities.length < 12 && displayOpportunities.length > 0) {
    const needed = 12 - displayOpportunities.length
    const repeated = []
    for (let i = 0; i < needed; i++) {
      repeated.push(displayOpportunities[i % displayOpportunities.length])
    }
    displayOpportunities = [...displayOpportunities, ...repeated]
  }

  // Split opportunities into two groups for the two carousels
  const firstHalf = displayOpportunities.slice(0, 6)
  const secondHalf = displayOpportunities.slice(6, 12)

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
