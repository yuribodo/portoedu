import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CaretDown, Check, SortAscending, Clock, CalendarPlus, TextAa } from '@phosphor-icons/react'
import { SortSheet } from './SortSheet'

export type SortOption = 'compatibility' | 'deadline' | 'recent' | 'alphabetical'

interface SortDropdownProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

const sortOptions = [
  {
    value: 'compatibility' as const,
    label: 'Mais compatíveis',
    icon: SortAscending,
    description: 'Ordenado por % de match'
  },
  {
    value: 'deadline' as const,
    label: 'Prazo mais próximo',
    icon: Clock,
    description: 'Inscrições encerrando em breve'
  },
  {
    value: 'recent' as const,
    label: 'Adicionadas recentemente',
    icon: CalendarPlus,
    description: 'Oportunidades mais novas'
  },
  {
    value: 'alphabetical' as const,
    label: 'Ordem alfabética',
    icon: TextAa,
    description: 'A-Z'
  }
]

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentOption = sortOptions.find(opt => opt.value === value) || sortOptions[0]
  const Icon = currentOption.icon

  // Detecta se é mobile (< 1024px = lg breakpoint)
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  // Fecha dropdown ao clicar fora (apenas desktop)
  useEffect(() => {
    if (isMobile) return

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, isMobile])

  const handleSelect = (option: SortOption) => {
    onChange(option)
    setIsOpen(false)
  }

  // Botão compartilhado
  const triggerButton = (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
      aria-label="Ordenar oportunidades"
    >
      <Icon size={18} weight="bold" />
      <span className="hidden sm:inline">{currentOption.label}</span>
      <span className="sm:hidden">Ordenar</span>
      <CaretDown
        size={16}
        weight="bold"
        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  )

  // Mobile: usa Sheet
  if (isMobile) {
    return (
      <>
        {triggerButton}
        <SortSheet
          open={isOpen}
          onOpenChange={setIsOpen}
          value={value}
          onChange={onChange}
        />
      </>
    )
  }

  // Desktop: usa dropdown
  return (
    <div ref={dropdownRef} className="relative">
      {triggerButton}

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
          >
            <div className="py-2">
              {sortOptions.map((option) => {
                const OptionIcon = option.icon
                const isSelected = option.value === value

                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 transition-colors duration-150 ${
                      isSelected ? 'bg-primary/5' : ''
                    }`}
                  >
                    <OptionIcon
                      size={20}
                      weight={isSelected ? 'fill' : 'regular'}
                      className={isSelected ? 'text-primary-dark' : 'text-gray-600'}
                    />
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${
                          isSelected ? 'text-primary-dark' : 'text-gray-900'
                        }`}>
                          {option.label}
                        </span>
                        {isSelected && (
                          <Check size={16} weight="bold" className="text-primary-dark" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {option.description}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
