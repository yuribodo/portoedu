import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Clock } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { OpportunityDetail } from '@/types/opportunity'
import { CATEGORY_CONFIGS } from '@/data/opportunitiesDetailed'
import { cn } from '@/lib/utils'
import { formatDuration } from '@/utils/dateUtils'

interface OpportunityOverviewProps {
  opportunity: OpportunityDetail
}

export function OpportunityOverview({ opportunity }: OpportunityOverviewProps) {
  const categoryConfig = CATEGORY_CONFIGS[opportunity.category]

  const modalityMap = {
    online: { icon: '💻', text: 'Online' },
    presencial: { icon: '📍', text: 'Presencial' },
    hibrido: { icon: '🔄', text: 'Híbrido' }
  }

  const costMap = {
    gratuito: { icon: '🆓', text: 'Gratuito', color: 'text-green-700 bg-green-50 border-green-200' },
    pago: { icon: '💳', text: 'Pago', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    'bolsa-integral': { icon: '🎓', text: 'Bolsa integral', color: 'text-purple-700 bg-purple-50 border-purple-200' },
    'bolsa-parcial': { icon: '🎯', text: 'Bolsa parcial', color: 'text-orange-700 bg-orange-50 border-orange-200' }
  }

  const modalityInfo = modalityMap[opportunity.modality]
  const costInfo = costMap[opportunity.cost]

  return (
    <div className="space-y-6">
      {/* Botão voltar */}
      <Link
        to="/oportunidades"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
      >
        <ArrowLeft size={20} weight="regular" className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Voltar para oportunidades</span>
      </Link>

      {/* Card principal */}
      <Card className="overflow-hidden bg-white border border-gray-200 shadow-[var(--shadow-md)] rounded-[var(--radius-lg)]">
        {/* Banner/Thumb */}
        {opportunity.banner && (
          <div className="w-full h-48 md:h-64 bg-gray-100 overflow-hidden">
            <img
              src={opportunity.banner}
              alt={opportunity.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Conteúdo */}
        <div className="p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Categoria e título */}
            <div>
              <Badge
                variant="secondary"
                className={cn(
                  "mb-3 font-medium text-sm px-3 py-1",
                  categoryConfig.color,
                  categoryConfig.bgColor,
                  "border-none"
                )}
              >
                <span className="mr-1.5">{opportunity.icon}</span>
                {categoryConfig.name}
              </Badge>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {opportunity.title}
              </h1>
            </div>

            {/* Badges de informação */}
            <div className="flex flex-wrap gap-2.5">
              <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-gray-200">
                <span>{modalityInfo.icon}</span>
                <span>{modalityInfo.text}</span>
              </Badge>

              {opportunity.duration && (
                <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-gray-200">
                  <Clock size={16} />
                  <span>{formatDuration(opportunity.duration.amount, opportunity.duration.unit)}</span>
                </Badge>
              )}

              <Badge variant="secondary" className={cn("flex items-center gap-2 px-3 py-1.5 text-sm font-medium border", costInfo.color)}>
                <span>{costInfo.icon}</span>
                <span>{costInfo.text}</span>
              </Badge>
            </div>

            {/* Descrição completa */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Sobre esta oportunidade</h2>
              <p className="text-base text-gray-700 leading-relaxed">
                {opportunity.fullDescription}
              </p>
            </div>

            {/* Descrição curta adicional */}
            {opportunity.shortDescription !== opportunity.fullDescription && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {opportunity.shortDescription}
                </p>
              </div>
            )}

            {/* Para quem é */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-2">Para quem é</h3>
              <p className="text-base text-gray-700">{opportunity.targetAudience}</p>
            </div>

            {/* O que você vai ganhar (resumo de benefícios) */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                ✨ O que você vai ganhar
              </h3>
              <p className="text-base text-gray-800 font-medium">
                {opportunity.mainBenefit}
              </p>
            </div>
          </motion.div>
        </div>
      </Card>
    </div>
  )
}
