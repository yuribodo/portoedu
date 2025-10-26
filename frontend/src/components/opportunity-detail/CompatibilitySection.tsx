import { motion } from 'motion/react'
import { Check, X, UserCircle } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { Progress } from '@/components/ui/progress'
import { Card } from '@/components/ui/card'
import type { CompatibilityResult } from '@/types/opportunity'
import { getCompatibilityLabel } from '@/utils/matchCalculator'

interface CompatibilitySectionProps {
  compatibility: CompatibilityResult | null
}

export function CompatibilitySection({ compatibility }: CompatibilitySectionProps) {
  // Se não há compatibilidade (perfil não preenchido), mostra convite
  if (!compatibility) {
    return (
      <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-[var(--shadow-md)] rounded-[var(--radius-lg)]">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
              <UserCircle size={40} weight="duotone" className="text-primary" />
            </div>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Complete seu perfil
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto">
              Para descobrir o quanto essa oportunidade combina com você, complete seu perfil com a Porti!
            </p>
          </div>

          <Link
            to="/form"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Completar perfil
          </Link>
        </div>
      </Card>
    )
  }

  const compatibilityInfo = getCompatibilityLabel(compatibility.percentage)

  return (
    <Card className="p-6 md:p-8 bg-white border border-gray-200 shadow-[var(--shadow-md)] rounded-[var(--radius-lg)]">
      <div className="space-y-6">
        {/* Título da seção */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Por que é pra você?
          </h2>
          <div className="flex items-center gap-2.5">
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-bold text-gray-900">
                {compatibility.percentage}%
              </div>
              <div className="text-xs text-gray-500">compatível</div>
            </div>
          </div>
        </div>

        {/* Barra de progresso */}
        <div>
          <Progress value={compatibility.percentage} className="h-3 mb-2" />
          <p className="text-sm text-gray-600 font-medium">
            {compatibilityInfo.label}
          </p>
        </div>

        {/* Requisitos atendidos */}
        {compatibility.reasons.length > 0 && (
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Check size={20} weight="bold" className="text-green-600" />
              Você atende
            </h3>
            <ul className="space-y-2">
              {compatibility.reasons.map((reason, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.3 }}
                  className="flex items-start gap-2.5 text-sm"
                >
                  <Check size={18} weight="bold" className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{reason}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Requisitos não atendidos */}
        {compatibility.missingRequirements.length > 0 && (
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <X size={20} weight="bold" className="text-gray-500" />
              O que falta
            </h3>
            <ul className="space-y-2">
              {compatibility.missingRequirements.map((requirement, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06, duration: 0.3 }}
                  className="flex items-start gap-2.5 text-sm"
                >
                  <X size={18} weight="bold" className="text-gray-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{requirement}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Mensagem de incentivo */}
        {compatibility.percentage >= 50 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"
          >
            <p className="text-sm text-gray-800 font-medium">
              Essa oportunidade combina muito com você!
            </p>
          </motion.div>
        )}
      </div>
    </Card>
  )
}
