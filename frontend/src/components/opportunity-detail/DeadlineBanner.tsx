import { motion } from 'motion/react'
import { Clock, CalendarBlank } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { formatDeadline, formatDateLong } from '@/utils/dateUtils'
import { cn } from '@/lib/utils'

interface DeadlineBannerProps {
  deadline: Date
  hasDeadline: boolean
}

export function DeadlineBanner({ deadline, hasDeadline }: DeadlineBannerProps) {
  if (!hasDeadline) {
    return (
      <Card className="p-6 border-2 border-green-500 bg-white shadow-[var(--shadow-md)] rounded-[var(--radius-lg)]">
        <div className="flex items-center gap-3">
          <CalendarBlank size={24} weight="bold" className="text-green-600" />
          <p className="font-semibold text-base text-green-700">
            Inscrições abertas o ano todo
          </p>
        </div>
      </Card>
    )
  }

  const deadlineInfo = formatDeadline(deadline)
  const isExpired = deadlineInfo.urgency === 'expired'
  const isUrgent = deadlineInfo.urgency === 'high'

  if (isExpired) {
    return (
      <Card className="p-6 border-2 border-red-500 bg-white shadow-[var(--shadow-md)] rounded-[var(--radius-lg)]">
        <div className="flex items-center gap-3">
          <Clock size={24} weight="bold" className="text-red-600" />
          <div>
            <p className="font-bold text-base text-red-700">Prazo encerrado</p>
            <p className="text-sm text-red-600">
              Esta oportunidade não está mais disponível
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn(
        "p-6 bg-white shadow-[var(--shadow-md)] rounded-[var(--radius-lg)]",
        isUrgent ? "border-2 border-orange-500" : "border-2 border-green-500"
      )}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Info do prazo */}
          <div className="flex items-center gap-3">
            <Clock size={24} weight="bold" className={isUrgent ? "text-orange-600" : "text-green-600"} />
            <div>
              <p className={cn("font-bold text-base", isUrgent ? "text-orange-700" : "text-green-700")}>
                {deadlineInfo.text}
              </p>
              <p className={cn("text-sm", isUrgent ? "text-orange-600" : "text-green-600")}>
                Inscrições até {formatDateLong(deadline)}
              </p>
            </div>
          </div>

          {/* Badge se for urgente */}
          {isUrgent && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-2">
              <p className="font-semibold text-orange-700 text-sm">
                ⚡ Inscreva-se logo!
              </p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
