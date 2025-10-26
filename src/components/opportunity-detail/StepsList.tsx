import { motion } from 'motion/react'
import { Path, ArrowRight, Clock, Lightbulb, WarningCircle, CheckSquare } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import type { OpportunityStep } from '@/types/opportunity'

interface StepsListProps {
  steps: OpportunityStep[]
}

export function StepsList({ steps }: StepsListProps) {
  return (
    <Card className="p-6 md:p-8 border border-gray-200 bg-white shadow-[var(--shadow-md)] rounded-[var(--radius-lg)]">
      <div className="space-y-6">
        {/* Título */}
        <div className="flex items-center gap-3">
          <Path size={24} weight="bold" className="text-gray-900" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Como participar
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.order}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.3 }}
              className="relative"
            >
              {/* Linha conectando os steps */}
              {index < steps.length - 1 && (
                <div className="absolute left-5 top-16 w-px h-[calc(100%-16px)] bg-gray-200" />
              )}

              {/* Step card */}
              <div className="relative border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors bg-white">
                <div className="flex gap-4">
                  {/* Número */}
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-gray-900 flex items-center justify-center font-bold text-base text-gray-900 bg-white">
                    {step.order}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 space-y-3">
                    {/* Título e tempo */}
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">
                        {step.title}
                      </h3>
                      {step.estimatedTime && (
                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                          <Clock size={14} />
                          <span>Tempo estimado: {step.estimatedTime}</span>
                        </div>
                      )}
                    </div>

                    {/* Descrição */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Checklist */}
                    {step.checklist && step.checklist.length > 0 && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckSquare size={16} weight="bold" className="text-gray-700" />
                          <span className="text-sm font-semibold text-gray-700">Checklist</span>
                        </div>
                        <ul className="space-y-2">
                          {step.checklist.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-gray-400 mt-0.5">☐</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Dicas */}
                    {step.tips && step.tips.length > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Lightbulb size={16} weight="fill" className="text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-blue-900 mb-1">Dica</p>
                            {step.tips.map((tip, idx) => (
                              <p key={idx} className="text-xs text-blue-800 leading-relaxed">
                                {tip}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Avisos */}
                    {step.warnings && step.warnings.length > 0 && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <WarningCircle size={16} weight="fill" className="text-orange-600 flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-orange-900 mb-1">Atenção</p>
                            {step.warnings.map((warning, idx) => (
                              <p key={idx} className="text-xs text-orange-800 leading-relaxed">
                                {warning}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Link */}
                    {step.link && (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors group/link"
                      >
                        Acessar link oficial
                        <ArrowRight
                          size={16}
                          weight="bold"
                          className="group-hover/link:translate-x-0.5 transition-transform"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mensagem de encorajamento */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: steps.length * 0.08, duration: 0.3 }}
          className="bg-green-50 border border-green-200 rounded-xl p-4 text-center"
        >
          <p className="text-sm text-gray-800 font-medium">
            💪 Siga estes passos com calma e você vai conseguir!
          </p>
        </motion.div>
      </div>
    </Card>
  )
}
