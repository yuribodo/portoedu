import { useState, useEffect, useMemo } from 'react'
import { motion } from 'motion/react'
import { HeaderPorti } from '@/components/opportunities/HeaderPorti'
import { SearchBar } from '@/components/opportunities/SearchBar'
import { FilterCombobox } from '@/components/opportunities/FilterCombobox'
import { SortDropdown, type SortOption } from '@/components/opportunities/SortDropdown'
import { ResultsCounter } from '@/components/opportunities/ResultsCounter'
import { OpportunityFeedCard } from '@/components/opportunities/OpportunityFeedCard'
import { EmptyState } from '@/components/opportunities/EmptyState'
import { OpportunityListSkeleton } from '@/components/opportunities/OpportunityListSkeleton'
import { opportunitiesData } from '@/data/opportunitiesDetailed'
import {
  fetchOpportunities,
  fetchOpportunitiesByIds,
  fetchRecommendations,
  getRecommendationsCache,
} from '@/services/api'
import { calculateCompatibility, sortByCompatibility } from '@/utils/matchCalculator'
import { daysUntil } from '@/utils/dateUtils'
import { loadUserProfile } from '@/utils/profileStorage'
import type { OpportunityCategory, UserProfile, OpportunityDetail } from '@/types/opportunity'

export default function Opportunities() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<SortOption>('compatibility')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [opportunities, setOpportunities] = useState<OpportunityDetail[]>(opportunitiesData)

  // Carrega o perfil do usuário e oportunidades
  useEffect(() => {
    const loadData = async () => {
      // Carrega perfil
      const profile = loadUserProfile()
      if (profile) {
        setUserProfile(profile)
      }

      try {
        // 1. Verifica se tem cache válido de recomendações
        const cache = getRecommendationsCache()
        if (cache && cache.opportunityIds.length > 0) {
          // Busca as oportunidades pelos IDs do cache (já ordenados por compatibilidade)
          const cachedOpportunities = await fetchOpportunitiesByIds(cache.opportunityIds)
          if (cachedOpportunities && cachedOpportunities.length > 0) {
            setOpportunities(cachedOpportunities)
            setIsLoading(false)
            return
          }
        }

        // 2. Se tem perfil mas cache expirou, busca recomendações novamente
        if (profile) {
          const recommendations = await fetchRecommendations(profile)
          if (recommendations.opportunityIds.length > 0) {
            // Busca oportunidades pelos IDs recebidos
            const recommendedOpportunities = await fetchOpportunitiesByIds(recommendations.opportunityIds)
            setOpportunities(recommendedOpportunities)
            setIsLoading(false)
            return
          }
        }

        // 3. Se não tem perfil ou recomendações falharam, busca todas genericamente
        const allOpportunities = await fetchOpportunities()
        if (allOpportunities && allOpportunities.length > 0) {
          setOpportunities(allOpportunities)
          setIsLoading(false)
          return
        }

        // 4. Fallback final: usa dados mockados locais
        setOpportunities(opportunitiesData)
      } catch (error) {
        console.error('Erro ao carregar oportunidades, usando dados locais:', error)
        // Fallback para mockdata em caso de erro
        setOpportunities(opportunitiesData)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Função de busca inteligente
  const searchOpportunities = (
    opportunities: OpportunityDetail[],
    query: string
  ): OpportunityDetail[] => {
    if (!query.trim()) return opportunities

    const lowerQuery = query.toLowerCase().trim()

    return opportunities.filter(opp => {
      // Busca em múltiplos campos
      const searchableText = [
        opp.title,
        opp.shortDescription,
        opp.fullDescription,
        opp.targetAudience,
        opp.category,
        ...opp.tags
      ].join(' ').toLowerCase()

      return searchableText.includes(lowerQuery)
    })
  }

  // Função de ordenação
  const sortOpportunities = (
    opportunities: OpportunityDetail[],
    sortOption: SortOption,
    profile: UserProfile | null
  ): OpportunityDetail[] => {
    const sorted = [...opportunities]

    switch (sortOption) {
      case 'compatibility':
        return profile ? sortByCompatibility(sorted, profile) : sorted

      case 'deadline':
        return sorted.sort((a, b) => {
          if (!a.hasDeadline && !b.hasDeadline) return 0
          if (!a.hasDeadline) return 1
          if (!b.hasDeadline) return -1

          const daysA = daysUntil(a.deadline)
          const daysB = daysUntil(b.deadline)

          return daysA - daysB
        })

      case 'recent':
        return sorted.sort((a, b) =>
          b.createdAt.getTime() - a.createdAt.getTime()
        )

      case 'alphabetical':
        return sorted.sort((a, b) =>
          a.title.localeCompare(b.title, 'pt-BR')
        )

      default:
        return sorted
    }
  }

  // Processa oportunidades: busca, filtro, ordenação
  const processedOpportunities = useMemo(() => {
    let filtered = opportunities

    // 1. Aplica busca
    filtered = searchOpportunities(filtered, searchQuery)

    // 2. Aplica filtro de categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(opp => opp.category === selectedCategory)
    }

    // 3. Ordena
    filtered = sortOpportunities(filtered, sortBy, userProfile)

    return filtered
  }, [searchQuery, selectedCategory, sortBy, userProfile, opportunities])

  // Calcula contagens por categoria para os badges
  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<OpportunityCategory, number>> = {}

    // Se há busca ativa, conta apenas nos resultados da busca
    const dataToCount = searchQuery
      ? searchOpportunities(opportunities, searchQuery)
      : opportunities

    dataToCount.forEach(opp => {
      counts[opp.category] = (counts[opp.category] || 0) + 1
    })

    return counts as Record<OpportunityCategory, number>
  }, [searchQuery, opportunities])

  // Calcula compatibilidade para cada oportunidade (somente se houver perfil)
  const opportunitiesWithMatch = useMemo(() => {
    return processedOpportunities.map(opp => ({
      opportunity: opp,
      compatibility: userProfile ? calculateCompatibility(userProfile, opp) : null
    }))
  }, [processedOpportunities, userProfile])

  const handleClearFilters = () => {
    setSelectedCategory('all')
    setSearchQuery('')
  }

  const isFiltered = searchQuery !== '' || selectedCategory !== 'all'

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header com Porti - Skeleton */}
          <div className="space-y-6">
            <div className="mb-6 md:mb-8">
              <div className="text-center">
                {/* Porti avatar - igual ao real */}
                <div className="inline-block mb-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-primary/20 bg-white shadow-lg flex items-center justify-center p-1 opacity-60 animate-pulse">
                    <img
                      src="/assets/avatar.png"
                      alt="Porti"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>

                {/* Título principal - skeleton */}
                <div className="flex justify-center mb-3">
                  <div className="h-8 md:h-10 lg:h-12 w-full max-w-2xl bg-gray-200 animate-pulse rounded-lg" />
                </div>

                {/* Balão de fala - skeleton */}
                <div className="inline-block">
                  <div className="bg-white rounded-2xl px-4 py-2 md:px-6 md:py-3 shadow-md border-2 border-gray-200 relative">
                    {/* Pontinha do balão */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-gray-200 rotate-45" />

                    {/* Texto do balão */}
                    <div className="h-5 md:h-6 w-64 md:w-80 bg-gray-200 animate-pulse rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* SearchBar - Skeleton */}
            <div className="max-w-2xl mx-auto">
              <div className="h-14 w-full bg-white border-2 border-gray-200 animate-pulse rounded-xl shadow-sm" />
            </div>
          </div>

          {/* Filtros e Sort - Skeleton */}
          <div className="flex items-stretch gap-3">
            {/* Filter combobox */}
            <div className="h-11 w-40 bg-white border border-gray-200 animate-pulse rounded-lg shadow-sm" />

            {/* Sort dropdown */}
            <div className="h-11 w-40 bg-white border border-gray-200 animate-pulse rounded-lg shadow-sm" />

            {/* Spacer */}
            <div className="hidden lg:flex flex-1" />

            {/* Contador no desktop */}
            <div className="hidden lg:block">
              <div className="h-11 px-4 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center">
                <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          </div>

          {/* Contador no mobile */}
          <div className="lg:hidden">
            <div className="h-11 px-4 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center">
              <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>

          {/* Cards - Skeleton */}
          <OpportunityListSkeleton count={6} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header com Porti */}
        <div className="space-y-6">
          <HeaderPorti totalOpportunities={opportunities.length} />

          {/* SearchBar - Protagonista */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Filtros, Sort e Contador */}
        <div className="space-y-4">
          {/* Filtros e Sort - lado a lado sempre */}
          <div className="flex items-stretch gap-3">
            {/* Filter combobox */}
            <FilterCombobox
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categoryCounts={categoryCounts}
            />

            {/* Sort dropdown */}
            <SortDropdown
              value={sortBy}
              onChange={setSortBy}
            />

            {/* Spacer para empurrar contador pra direita no desktop */}
            <div className="hidden lg:flex flex-1" />

            {/* Contador no desktop */}
            <div className="hidden lg:block">
              <ResultsCounter
                count={opportunitiesWithMatch.length}
                total={opportunities.length}
                isFiltered={isFiltered}
              />
            </div>
          </div>

          {/* Contador no mobile - abaixo dos filtros */}
          <div className="lg:hidden">
            <ResultsCounter
              count={opportunitiesWithMatch.length}
              total={opportunities.length}
              isFiltered={isFiltered}
            />
          </div>
        </div>

        {/* Lista de oportunidades ou empty state */}
        {opportunitiesWithMatch.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {opportunitiesWithMatch.map(({ opportunity, compatibility }, index) => (
              <OpportunityFeedCard
                key={opportunity.id}
                opportunity={opportunity}
                compatibility={compatibility}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <EmptyState
            hasFilters={isFiltered}
            onClearFilters={isFiltered ? handleClearFilters : undefined}
          />
        )}
      </div>
    </div>
  )
}
