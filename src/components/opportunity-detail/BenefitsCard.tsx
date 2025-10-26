import { motion } from 'motion/react'
import { Sparkle } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import type { OpportunityBenefit } from '@/types/opportunity'

interface BenefitsCardProps {
  benefits: OpportunityBenefit[]
  mainBenefit: string
}

export function BenefitsCard({ benefits, mainBenefit }: BenefitsCardProps) {
  return (
    <Card className="p-6 md:p-8 border border-gray-200 bg-white shadow-[var(--shadow-md)] rounded-[var(--radius-lg)]">
      <div className="space-y-6">
        {/* Título */}
        <div className="flex items-center gap-3">
          <Sparkle size={24} weight="fill" className="text-gray-900" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            O que oferece
          </h2>
        </div>

        {/* Benefício principal em destaque */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-green-50 border-2 border-green-200 rounded-xl p-5"
        >
          <p className="text-base md:text-lg font-semibold text-gray-900 text-center">
            {mainBenefit}
          </p>
        </motion.div>

        {/* Lista de benefícios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, duration: 0.3 }}
              className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">
                  {benefit.icon}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  )
}
