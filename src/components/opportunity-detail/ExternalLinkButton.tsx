import { motion } from 'motion/react'
import { ArrowSquareOut } from '@phosphor-icons/react'

interface ExternalLinkButtonProps {
  link: string
}

export function ExternalLinkButton({ link }: ExternalLinkButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <motion.button
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="w-full bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg text-white font-bold py-3.5 px-6 rounded-[var(--radius-full)] shadow-[var(--shadow-md)] transition-all duration-200 flex items-center justify-center gap-2.5 text-base group"
        >
          <span>Ir para o site oficial</span>
          <ArrowSquareOut
            size={20}
            weight="bold"
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </motion.button>
      </a>

      {/* Mensagem de segurança */}
      <p className="text-[10px] text-center text-gray-400 mt-1.5">
        🔒 Link seguro e oficial
      </p>
    </motion.div>
  )
}
