import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { MagnifyingGlass, ArrowCounterClockwise } from '@phosphor-icons/react'

interface EmptyStateProps {
  hasFilters?: boolean
  onClearFilters?: () => void
}

export function EmptyState({ hasFilters = false, onClearFilters }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-12 md:py-16 px-4 text-center"
    >
      {/* Porti triste */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, -5, 5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mb-6"
      >
        <div className="relative">
          {/* Laptop */}
          <div className="text-6xl md:text-7xl mb-2">💻</div>
          {/* Porti */}
          <div className="absolute -top-2 -right-2 text-4xl md:text-5xl">
            🐢
          </div>
        </div>
      </motion.div>

      {/* Mensagem */}
      <h3 className="text-xl md:text-2xl font-bold text-text mb-3">
        {hasFilters ? 'Nenhuma oportunidade encontrada' : 'Nada por aqui agora'}
      </h3>

      <p className="text-gray-600 text-sm md:text-base max-w-md mb-6">
        {hasFilters ? (
          <>
            Não encontrei oportunidades com esse filtro.
            <br />
            Que tal tentar outra categoria?
          </>
        ) : (
          <>
            Mas calma, novas oportunidades aparecem toda semana! 📅
            <br />
            Continue acompanhando ou refaça seu perfil.
          </>
        )}
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        {hasFilters && onClearFilters ? (
          <button
            onClick={onClearFilters}
            className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <ArrowCounterClockwise size={20} weight="bold" />
            Ver todas as oportunidades
          </button>
        ) : (
          <>
            <Link
              to="/form"
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <MagnifyingGlass size={20} weight="bold" />
              Refazer perfil
            </Link>

            <Link
              to="/"
              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-full border-2 border-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Voltar ao início
            </Link>
          </>
        )}
      </div>

      {/* Dica */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 max-w-md"
      >
        <p className="text-sm text-blue-700">
          <span className="font-semibold">💡 Dica do Porti:</span> Mantenha seu perfil atualizado para receber as melhores recomendações!
        </p>
      </motion.div>
    </motion.div>
  )
}
