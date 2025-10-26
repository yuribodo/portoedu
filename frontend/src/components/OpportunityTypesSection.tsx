import { motion } from 'motion/react'
import { BookOpen, Globe, Flask, Laptop } from '@phosphor-icons/react'

const opportunityTypes = [
  {
    icon: BookOpen,
    label: 'Bolsas de Estudo',
    description:
      'Apoio financeiro para graduação, pós-graduação e cursos técnicos',
    stat: '500+ bolsas',
    gridSpan: 'md:col-span-2',
  },
  {
    icon: Laptop,
    label: 'Cursos Online',
    description: 'Certificados reconhecidos em tecnologia e negócios',
    stat: '2.000+ cursos',
    gridSpan: 'md:col-span-1',
  },
  {
    icon: Globe,
    label: 'Intercâmbios',
    description: 'Experiências internacionais de estudo e trabalho',
    stat: '50+ países',
    gridSpan: 'md:col-span-1',
  },
  {
    icon: Flask,
    label: 'Pesquisa',
    description: 'Bolsas de iniciação científica e pós-graduação',
    stat: 'Até R$ 9.200',
    gridSpan: 'md:col-span-2',
  },
]

export function OpportunityTypesSection() {
  return (
    <>
      <section id="for-who" className="relative py-16 md:py-24 pb-0 bg-gradient-to-b from-background via-background to-[#E8F5FF] overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-3">
              Tipos de oportunidades
            </h2>
            <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
              Explore diversas categorias de programas educacionais
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {opportunityTypes.map((type, index) => {
              const Icon = type.icon
              return (
                <motion.div
                  key={type.label}
                  initial={{ opacity: 0, y: 60, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`${type.gridSpan} group`}
                >
                  <div className="relative h-full bg-white/60 backdrop-blur-xl rounded-2xl p-6 overflow-hidden transition-all duration-500 hover:bg-white/80 hover:scale-[1.02] border border-black/10">
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="mb-5">
                        <Icon
                          className="text-primary"
                          size={48}
                          weight="duotone"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-text mb-3 tracking-tight">
                        {type.label}
                      </h3>

                      {/* Description */}
                      <p className="text-sm md:text-base text-text-muted mb-6 leading-relaxed">
                        {type.description}
                      </p>

                      {/* Stat Badge */}
                      <div className="inline-flex items-center px-4 py-2 rounded-lg border border-primary">
                        <span className="text-sm font-bold text-primary">
                          {type.stat}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
