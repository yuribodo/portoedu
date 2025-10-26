import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { OpportunityOverview } from '@/components/opportunity-detail/OpportunityOverview'
import { CompatibilitySection } from '@/components/opportunity-detail/CompatibilitySection'
import { CareerImpactSection } from '@/components/opportunity-detail/CareerImpactSection'
import { BenefitsCard } from '@/components/opportunity-detail/BenefitsCard'
import { StepsList } from '@/components/opportunity-detail/StepsList'
import { DeadlineBanner } from '@/components/opportunity-detail/DeadlineBanner'
import { ExternalLinkButton } from '@/components/opportunity-detail/ExternalLinkButton'
import { PortiAssistant } from '@/components/opportunity-detail/PortiAssistant'
import { LocationMap } from '@/components/opportunity-detail/LocationMap'
import { getOpportunityById } from '@/data/opportunitiesDetailed'
import { fetchOpportunityById } from '@/services/api'
import { calculateCompatibility } from '@/utils/matchCalculator'
import { loadUserProfile } from '@/utils/profileStorage'
import type { UserProfile, OpportunityDetail as OpportunityDetailType } from '@/types/opportunity'
import { Card } from '@/components/ui/card'

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [opportunity, setOpportunity] = useState<OpportunityDetailType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Scroll para o topo quando a página carregar ou o id mudar
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // Carrega perfil do usuário e oportunidade
  useEffect(() => {
    const loadData = async () => {
      // Carrega perfil
      const profile = loadUserProfile()
      if (profile) {
        setUserProfile(profile)
      }

      // Carrega oportunidade
      if (!id) {
        setIsLoading(false)
        return
      }

      try {
        // 1. Tenta buscar do backend primeiro
        const backendOpportunity = await fetchOpportunityById(id)

        if (backendOpportunity) {
          setOpportunity(backendOpportunity)
          setIsLoading(false)
          return
        }

        // 2. Fallback: usa dados mockados locais
        const localOpportunity = getOpportunityById(id)
        setOpportunity(localOpportunity || null)
      } catch (error) {
        console.error('Erro ao carregar oportunidade, usando dados locais:', error)
        // Fallback para dados locais em caso de erro
        const localOpportunity = getOpportunityById(id)
        setOpportunity(localOpportunity || null)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [id])

  // Se estiver carregando, mostra loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-600">Carregando oportunidade...</p>
        </div>
      </div>
    )
  }

  // Se não encontrar, redireciona
  if (!opportunity) {
    return <Navigate to="/oportunidades" replace />
  }

  // Calcula compatibilidade (somente se houver perfil)
  const compatibility = userProfile ? calculateCompatibility(userProfile, opportunity) : null

  return (
    <div className="min-h-screen bg-background">
      {/* Conteúdo principal */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 space-y-8 pb-8">
        {/* Card de Overview com banner */}
        <OpportunityOverview opportunity={opportunity} />

        {/* Prazo - informação importante */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <DeadlineBanner
            deadline={opportunity.deadline}
            hasDeadline={opportunity.hasDeadline}
          />
        </motion.div>

        {/* Seção de compatibilidade */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <CompatibilitySection compatibility={compatibility} />
        </motion.div>

        {/* Impacto na carreira */}
        {opportunity.careerImpact && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <CareerImpactSection
              title={opportunity.careerImpact.title}
              description={opportunity.careerImpact.description}
              opportunities={opportunity.careerImpact.opportunities}
              differentials={opportunity.careerImpact.differentials}
            />
          </motion.div>
        )}

        {/* Benefícios */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          <BenefitsCard
            benefits={opportunity.benefits}
            mainBenefit={opportunity.mainBenefit}
          />
        </motion.div>

        {/* Passos */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <StepsList steps={opportunity.steps} />
        </motion.div>

        {/* Contexto do Porti (se tiver) */}
        {opportunity.portiContext && (
          <Card className="p-6 bg-white border border-gray-200 shadow-[var(--shadow-md)] rounded-[var(--radius-lg)]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center p-1">
                <img
                  src="/assets/avatar.png"
                  alt="Porti"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-2 text-base">
                  Dica do Porti
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {opportunity.portiContext}
                </p>
              </div>
            </motion.div>
          </Card>
        )}

        {/* Mapa de localização - apenas para oportunidades presenciais e híbridas */}
        {(opportunity.modality === 'presencial' || opportunity.modality === 'hibrido') && opportunity.location && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <LocationMap location={opportunity.location} title={opportunity.title} />
          </motion.div>
        )}

        {/* Botão para site oficial - no final do conteúdo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.3 }}
        >
          <ExternalLinkButton link={opportunity.officialLink} />
        </motion.div>
      </div>

      {/* Assistente Porti */}
      <PortiAssistant opportunity={opportunity} />
    </div>
  )
}
