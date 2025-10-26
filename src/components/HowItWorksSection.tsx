import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import portiAvatar from '/assets/avatar.png'
import portiAvatarBook from '/assets/avatar-book.png'
import portiAvatarPencil from '/assets/avatar-pencil.png'
import { User, MagnifyingGlass, GraduationCap } from '@phosphor-icons/react'

const steps = [
  {
    number: '01',
    icon: User,
    avatar: portiAvatar,
    title: 'Conte sua história',
    description:
      'Responda perguntas sobre você, seus objetivos e necessidades para personalizarmos sua experiência',
  },
  {
    number: '02',
    icon: MagnifyingGlass,
    avatar: portiAvatarBook,
    title: 'Descubra oportunidades',
    description:
      'Nosso sistema encontra bolsas e programas perfeitos para você, baseado no seu perfil único',
  },
  {
    number: '03',
    icon: GraduationCap,
    avatar: portiAvatarPencil,
    title: 'Transforme seu futuro',
    description:
      'Acesse informações completas e candidature-se às oportunidades que vão impulsionar sua carreira',
  },
]

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [timelineHeight, setTimelineHeight] = useState(0)

  useEffect(() => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect()
      setTimelineHeight(rect.height)
    }
  }, [timelineRef])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, timelineHeight])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="py-16 md:py-24 bg-background overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-3">
            Como o PortoEdu funciona?
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
            Democratizamos o acesso à educação conectando você com as melhores
            oportunidades de forma simples e personalizada
          </p>
        </motion.div>

        {/* Timeline Steps with Sticky Scroll */}
        <div ref={timelineRef} className="relative">
          {/* Static Background Timeline Line - Hidden on mobile */}
          <div
            className="hidden md:block absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/20 to-transparent overflow-hidden"
            style={{ height: `${timelineHeight}px` }}
          >
            {/* Animated Timeline Line */}
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-primary via-primary to-primary/40 rounded-full"
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon
            const isEven = index % 2 === 0

            return (
              <div
                key={step.number}
                className="relative pt-10 md:pt-40"
              >
                <div
                  className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 sticky top-40 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, margin: '-100px' }}
                    transition={{ duration: 0.8 }}
                    className={`flex-1 ${
                      isEven ? 'md:text-right' : 'md:text-left'
                    } text-center`}
                  >
                    <div className="bg-background rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-primary/30 transition-all duration-300">
                      <div
                        className={`flex items-center gap-3 mb-3 ${
                          isEven
                            ? 'md:justify-end justify-center'
                            : 'md:justify-start justify-center'
                        }`}
                      >
                        <span className="text-4xl font-bold text-primary/20">
                          {step.number}
                        </span>
                        <Icon
                          className="text-primary"
                          size={32}
                          weight="bold"
                        />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-text mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm md:text-base text-text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Center Timeline Dot with Porti */}
                  <div className="relative flex-shrink-0 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false }}
                      transition={{
                        duration: 0.5,
                        type: 'spring',
                      }}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/10 border-4 border-primary flex items-center justify-center overflow-visible"
                    >
                      <img
                        src={step.avatar}
                        alt="Porti"
                        className={`object-contain ${
                          index === 1 || index === 2
                            ? 'w-14 h-14 md:w-16 md:h-16'
                            : 'w-20 h-20 md:w-24 md:h-24'
                        }`}
                      />
                    </motion.div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
