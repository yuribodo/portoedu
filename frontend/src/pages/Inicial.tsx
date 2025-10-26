import { Link } from 'react-router-dom'
import { BackgroundLines } from '@/components/ui/background-lines'
import { motion } from 'motion/react'
import { OpportunitiesSection } from '@/components/OpportunitiesSection'
import { HowItWorksSection } from '@/components/HowItWorksSection'
import { OpportunityTypesSection } from '@/components/OpportunityTypesSection'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

function Inicial() {
  return (
    <>
      <BackgroundLines className="min-h-[calc(100vh-80px)] flex items-center justify-center">
        <motion.div
          className="max-w-2xl mx-auto px-6 text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Mascot */}
          <motion.div className="mb-0 relative inline-block" variants={itemVariants}>
            {/* Floating Book - Top Left */}
            <img
              src="/assets/book.png"
              alt="Book icon"
              className="absolute top-8 left-0 w-12 h-12 md:w-16 md:h-16 object-contain animate-float-1 opacity-90 pointer-events-none"
            />

            {/* Floating Magnifying Glass - Top Right */}
            <img
              src="/assets/content.png"
              alt="Search icon"
              className="absolute top-4 right-4 w-10 h-10 md:w-14 md:h-14 object-contain animate-float-2 opacity-90 pointer-events-none"
            />

            {/* Main Avatar */}
            <img
              src="/assets/avatar.png"
              alt="Porti, a capivara estudiosa com óculos e mochila"
              className="w-64 h-64 md:w-72 md:h-72 object-contain relative z-10"
            />

            {/* Floating Light Bulb - Bottom Left */}
            <img
              src="/assets/lamp.png"
              alt="Lamp icon"
              className="absolute bottom-8 left-2 w-14 h-14 md:w-20 md:h-20 object-contain animate-float-3 opacity-90 pointer-events-none"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-text mb-4 -mt-8 md:-mt-12"
            variants={itemVariants}
          >
            Seu guia no mar das oportunidades
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-text-muted mb-8"
            variants={itemVariants}
          >
            Encontre bolsas e programas que combinam com você
          </motion.p>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <Link
              to="/form"
              className="inline-block px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-200"
            >
              Começar agora
            </Link>
          </motion.div>
        </motion.div>
      </BackgroundLines>

      {/* Opportunities Section */}
      <OpportunitiesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Opportunity Types Section */}
      <OpportunityTypesSection />
    </>
  )
}

export default Inicial
