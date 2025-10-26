import { motion } from 'motion/react'

interface HeaderPortiProps {
  totalOpportunities: number
}

export function HeaderPorti({ totalOpportunities }: HeaderPortiProps) {
  return (
    <div className="mb-6 md:mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        {/* Porti avatar */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="inline-block mb-4"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-primary/20 bg-white shadow-lg flex items-center justify-center p-1">
            <img
              src="/assets/avatar.png"
              alt="Porti"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </motion.div>

        {/* Título principal */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text mb-3">
          {totalOpportunities > 0 ? (
            <>
              Encontrei{' '}
              <span className="text-primary-dark">{totalOpportunities}</span>{' '}
              {totalOpportunities === 1 ? 'oportunidade' : 'oportunidades'}
              {' '}que{' '}
              {totalOpportunities === 1 ? 'tem' : 'têm'} tudo a ver com você!
            </>
          ) : (
            <>Buscando oportunidades pra você...</>
          )}
        </h1>

        {/* Fala do Porti */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="inline-block"
        >
          <div className="bg-white rounded-2xl px-4 py-2 md:px-6 md:py-3 shadow-md border-2 border-primary/20 relative">
            {/* Balão de fala - pontinha */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-primary/20 rotate-45" />

            <p className="text-sm md:text-base text-gray-700 font-medium">
              {totalOpportunities > 0
                ? "Separei as mais compatíveis com seu perfil! 🎯"
                : "Estou organizando tudo certinho pra você..."}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
