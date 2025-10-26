import { motion } from 'motion/react'
import { TrendUp, Star, Briefcase } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'

interface CareerImpactProps {
  title: string
  description: string
  opportunities: string[]
  differentials: string[]
}

export function CareerImpactSection({ title, description, opportunities, differentials }: CareerImpactProps) {
  return (
    <Card className="p-6 md:p-8 border border-gray-200 bg-white shadow-[var(--shadow-md)] rounded-[var(--radius-lg)]">
      <div className="space-y-6">
        {/* Título */}
        <div className="flex items-center gap-3">
          <TrendUp size={24} weight="bold" className="text-gray-900" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {title}
          </h2>
        </div>

        {/* Descrição principal */}
        <p className="text-base text-gray-700 leading-relaxed">
          {description}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Oportunidades que isso abre */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Briefcase size={20} weight="bold" className="text-primary" />
              <h3 className="font-semibold text-gray-900 text-base">
                Oportunidades que isso abre
              </h3>
            </div>
            <ul className="space-y-3">
              {opportunities.map((opportunity, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.05, duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-primary text-lg mt-0.5">•</span>
                  <span className="text-sm text-gray-700 leading-relaxed flex-1">
                    {opportunity}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Diferenciais competitivos */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <Star size={20} weight="bold" className="text-primary" />
              <h3 className="font-semibold text-gray-900 text-base">
                Diferenciais que você ganha
              </h3>
            </div>
            <ul className="space-y-3">
              {differentials.map((differential, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + index * 0.05, duration: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-primary text-lg mt-0.5">•</span>
                  <span className="text-sm text-gray-700 leading-relaxed flex-1">
                    {differential}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Mensagem motivacional */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 text-center"
        >
          <p className="text-sm text-gray-800 font-medium">
            💼 Investir nessa oportunidade é investir no seu futuro profissional
          </p>
        </motion.div>
      </div>
    </Card>
  )
}
