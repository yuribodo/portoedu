import { motion } from 'motion/react'

interface ResultsCounterProps {
  count: number
  total: number
  isFiltered: boolean
}

export function ResultsCounter({ count, total, isFiltered }: ResultsCounterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between text-sm"
    >
      <div>
        {count === 0 ? (
          <p className="text-gray-600">
            Nenhuma oportunidade encontrada
          </p>
        ) : (
          <p className="text-gray-600">
            {isFiltered && (
              <>
                <span className="font-semibold text-primary-dark">{count}</span>
                {' de '}
                <span className="font-semibold">{total}</span>
                {' '}
              </>
            )}
            {!isFiltered && (
              <span className="font-semibold text-primary-dark">{count}</span>
            )}
            {' '}
            {count === 1 ? 'oportunidade' : 'oportunidades'}
            {isFiltered && ' encontrada' + (count === 1 ? '' : 's')}
          </p>
        )}
      </div>

      {isFiltered && count > 0 && (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-gray-500">Filtros ativos</span>
        </div>
      )}
    </motion.div>
  )
}
