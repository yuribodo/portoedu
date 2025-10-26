import { memo, useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { CaretRight, Timer } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import type { OpportunityDetail, CompatibilityResult } from '@/types/opportunity'
import { CATEGORY_CONFIGS } from '@/data/opportunitiesDetailed'
import { formatDeadline, formatDuration } from '@/utils/dateUtils'
import { getCompatibilityLabel } from '@/utils/matchCalculator'

// Constantes extraídas para melhor manutenibilidade
const MODALITY_MAP = {
  online: { icon: '💻', text: 'Online' },
  presencial: { icon: '📍', text: 'Presencial' },
  hibrido: { icon: '🔄', text: 'Híbrido' }
} as const

const COST_MAP = {
  gratuito: { icon: '🆓', text: 'Gratuito' },
  pago: { icon: '💳', text: 'Pago' },
  'bolsa-integral': { icon: '🎓', text: 'Bolsa integral' },
  'bolsa-parcial': { icon: '🎯', text: 'Bolsa parcial' }
} as const

// Configuração unificada de animação
const CARD_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  },
  tap: { scale: 0.98 }
} as const

interface OpportunityFeedCardProps {
  opportunity: OpportunityDetail
  compatibility?: CompatibilityResult | null
  index?: number
}

function OpportunityFeedCardComponent({ opportunity, compatibility, index = 0 }: OpportunityFeedCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  // Memoizar valores computados
  const categoryConfig = useMemo(() => CATEGORY_CONFIGS[opportunity.category], [opportunity.category])
  const deadlineInfo = useMemo(
    () => opportunity.hasDeadline ? formatDeadline(opportunity.deadline) : null,
    [opportunity.hasDeadline, opportunity.deadline]
  )
  const compatibilityInfo = useMemo(
    () => compatibility ? getCompatibilityLabel(compatibility.percentage) : null,
    [compatibility]
  )
  const modalityInfo = useMemo(() => MODALITY_MAP[opportunity.modality], [opportunity.modality])
  const costInfo = useMemo(() => COST_MAP[opportunity.cost], [opportunity.cost])

  // Aria-label descritivo para acessibilidade
  const ariaLabel = `${opportunity.title}. ${opportunity.shortDescription}. ${compatibility ? `Compatibilidade: ${compatibility.percentage}%.` : ''} ${deadlineInfo ? deadlineInfo.text : 'Sem prazo'}. ${modalityInfo.text}. ${costInfo.text}.`

  return (
    <motion.div
      initial={CARD_ANIMATION.initial}
      animate={CARD_ANIMATION.animate}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={CARD_ANIMATION.hover}
      whileTap={CARD_ANIMATION.tap}
      className="h-full"
      style={{ willChange: 'transform' }}
    >
      <Link
        to={`/oportunidades/${opportunity.id}`}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
        aria-label={ariaLabel}
      >
        <Card className="h-full shadow-md transition-all duration-300 border border-gray-200 hover:border-primary bg-white overflow-hidden group flex flex-col p-0">
          {/* Banner */}
          {opportunity.banner ? (
            <div className="w-full h-28 md:h-48 relative overflow-hidden bg-gray-100">
              {/* Skeleton enquanto carrega */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50 animate-pulse" />
              )}

              <img
                src={opportunity.banner}
                alt={opportunity.title}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  imageLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
                }`}
                style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
            </div>
          ) : (
            <div className="w-full h-28 md:h-48 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
          )}

          <div className="p-3 md:p-5 space-y-2 md:space-y-4 flex flex-col flex-1">
            {/* Header: Icon + Category + Deadline */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Ícone da categoria */}
                <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl bg-gray-50 border border-gray-200">
                  {opportunity.icon}
                </div>

                {/* Categoria */}
                <div className="flex-1 min-w-0">
                  <Badge variant="secondary" className="font-medium text-xs text-gray-700 bg-gray-100 border-none">
                    {categoryConfig.name}
                  </Badge>
                </div>
              </div>

              {/* Badge de prazo */}
              {deadlineInfo && deadlineInfo.urgency !== 'expired' && (
                <Badge className="flex items-center gap-1 text-xs font-medium whitespace-nowrap shrink-0 text-gray-700 bg-gray-100 border-none">
                  <Timer size={14} weight="bold" />
                  {deadlineInfo.text}
                </Badge>
              )}
            </div>

            {/* Título */}
            <div>
              <h3 className="text-sm md:text-xl font-bold text-text leading-tight mb-1 md:mb-2 line-clamp-2">
                {opportunity.title}
              </h3>
              <p className="text-xs md:text-base text-gray-600 line-clamp-2">
                {opportunity.shortDescription}
              </p>
            </div>

            {/* Informações principais - Oculto no mobile */}
            <div className="hidden md:flex flex-wrap gap-2 text-sm text-gray-600">
              {/* Modalidade */}
              <div className="flex items-center gap-1">
                <span>{modalityInfo.icon}</span>
                <span>{modalityInfo.text}</span>
              </div>

              {/* Duração */}
              {opportunity.duration && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1">
                    <Timer size={16} />
                    <span>{formatDuration(opportunity.duration.amount, opportunity.duration.unit)}</span>
                  </div>
                </>
              )}

              {/* Custo */}
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1">
                <span>{costInfo.icon}</span>
                <span>{costInfo.text}</span>
              </span>
            </div>

            {/* Barra de compatibilidade */}
            {compatibility && compatibilityInfo && (
              <div className="space-y-2 pt-2 border-t border-gray-200 mt-auto">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold flex items-center gap-1 text-gray-700">
                    <span>{compatibilityInfo.emoji}</span>
                    {compatibilityInfo.label}
                  </span>
                  <span className="text-gray-600 font-medium">
                    {compatibility.percentage}%
                  </span>
                </div>
                <Progress
                  value={compatibility.percentage}
                  className="h-2"
                />
                {compatibility.matchedRequirements > 0 && (
                  <p className="text-xs text-gray-500">
                    Você atende {compatibility.matchedRequirements} de {compatibility.totalRequirements} requisitos
                  </p>
                )}
              </div>
            )}

            {/* CTA - Agora é apenas visual, o Link envolve todo o card */}
            <div className="w-full bg-primary text-white font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-auto group-hover:bg-primary-dark">
              <span className="text-xs md:text-base">Ver como participar</span>
              <CaretRight
                size={16}
                weight="bold"
                className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300"
              />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

// Memoização para prevenir re-renders desnecessários
export const OpportunityFeedCard = memo(OpportunityFeedCardComponent)
