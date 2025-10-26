import { useState, useEffect } from 'react'
import { Check, Funnel } from '@phosphor-icons/react'
import {
  GraduationCap,
  Airplane,
  BookOpen,
  Medal,
  Briefcase,
  Flask,
  Certificate,
  Translate,
  Rocket,
  Sparkle
} from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'motion/react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { FilterSheet } from './FilterSheet'
import { CATEGORY_CONFIGS } from '@/data/opportunitiesDetailed'
import type { OpportunityCategory } from '@/types/opportunity'
import { cn } from '@/lib/utils'

interface FilterComboboxProps {
  selectedCategory: OpportunityCategory | 'all'
  onCategoryChange: (category: OpportunityCategory | 'all') => void
  categoryCounts?: Record<OpportunityCategory, number>
}

const iconMap = {
  GraduationCap,
  Airplane,
  BookOpen,
  Medal,
  Briefcase,
  Flask,
  Certificate,
  Translate,
  Rocket,
  Sparkle,
  Funnel
}

export function FilterCombobox({ selectedCategory, onCategoryChange, categoryCounts }: FilterComboboxProps) {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detecta se é mobile (< 1024px = lg breakpoint)
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const categories = [
    { id: 'all' as const, name: 'Todas as categorias', icon: 'Funnel', color: 'text-gray-700', bgColor: 'bg-gray-100' },
    ...Object.values(CATEGORY_CONFIGS)
  ]

  const selectedOption = categories.find(cat => cat.id === selectedCategory) || categories[0]
  const SelectedIcon = iconMap[selectedOption.icon as keyof typeof iconMap] || BookOpen

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap]
    return Icon || BookOpen
  }

  // Conta total de oportunidades filtradas
  const totalFiltered = selectedCategory === 'all'
    ? Object.values(categoryCounts || {}).reduce((acc, count) => acc + count, 0)
    : categoryCounts?.[selectedCategory as OpportunityCategory] || 0

  // Botão compartilhado entre mobile e desktop
  const triggerButton = (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white border-2 rounded-xl transition-all duration-200 shadow-sm",
        open
          ? "border-primary shadow-md ring-2 ring-primary/20"
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
      )}
      aria-label="Filtrar por categoria"
      aria-expanded={open}
      onClick={() => setOpen(true)}
    >
      {/* Selected category icon */}
      <SelectedIcon
        size={18}
        weight={selectedCategory !== 'all' ? 'fill' : 'regular'}
        className={selectedCategory !== 'all' ? selectedOption.color : 'text-gray-600'}
      />

      {/* Selected category name */}
      <span className={selectedCategory !== 'all' ? 'text-gray-900' : 'text-gray-600'}>
        {selectedOption.name}
      </span>

      {/* Badge com contagem (quando filtrado) */}
      <AnimatePresence>
        {selectedCategory !== 'all' && totalFiltered > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="ml-1 px-2 py-0.5 bg-primary text-white rounded-full text-xs font-semibold"
          >
            {totalFiltered}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )

  // Mobile: usa Sheet
  if (isMobile) {
    return (
      <>
        {triggerButton}
        <FilterSheet
          open={open}
          onOpenChange={setOpen}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          categoryCounts={categoryCounts}
        />
      </>
    )
  }

  // Desktop: usa Popover
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {triggerButton}
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] p-0 bg-white border-2 border-primary/20 rounded-xl shadow-2xl overflow-hidden"
        align="start"
        sideOffset={8}
      >
        <Command className="bg-white rounded-xl">
          {/* Header customizado */}
          <div className="px-3 py-2 bg-gradient-to-r from-primary/5 to-blue-50 border-b border-primary/10">
            <p className="text-[10px] font-bold text-primary-dark uppercase tracking-wider flex items-center gap-1.5">
              <Sparkle size={12} weight="fill" />
              Categorias
            </p>
          </div>

          <CommandInput
            placeholder="Buscar categoria..."
            className="h-9 border-0 border-b border-gray-100 focus:border-primary/20 rounded-none text-sm"
          />
          <CommandList className="max-h-[240px]">
            <CommandEmpty className="py-4 text-center">
              <p className="text-xs text-gray-400">Nenhuma categoria encontrada</p>
            </CommandEmpty>
            <CommandGroup className="p-1.5">
              {categories.map((category, index) => {
                const Icon = getIcon(category.icon)
                const isSelected = category.id === selectedCategory
                const count = category.id === 'all'
                  ? Object.values(categoryCounts || {}).reduce((acc, c) => acc + c, 0)
                  : categoryCounts?.[category.id as OpportunityCategory] || 0

                // Não mostra categorias vazias (exceto "Todas")
                if (category.id !== 'all' && count === 0) return null

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <CommandItem
                      value={category.name}
                      onSelect={() => {
                        onCategoryChange(category.id)
                        setOpen(false)
                      }}
                      className={cn(
                        "flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-lg my-0.5 transition-all duration-200",
                        isSelected
                          ? "bg-gradient-to-r from-primary/10 to-blue-50 border border-primary/30"
                          : "hover:bg-gray-50 border border-transparent"
                      )}
                    >
                      {/* Icon */}
                      <Icon
                        size={14}
                        weight={isSelected ? 'fill' : 'regular'}
                        className={cn(
                          "flex-shrink-0 transition-all",
                          isSelected ? category.color : 'text-gray-600'
                        )}
                      />

                      {/* Label */}
                      <span className={cn(
                        "flex-1 text-xs font-medium transition-colors",
                        isSelected ? "text-primary-dark" : "text-gray-900"
                      )}>
                        {category.name}
                      </span>

                      {/* Count badge */}
                      {count > 0 && (
                        <span className={cn(
                          "flex-shrink-0 min-w-[20px] h-4 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center transition-all duration-200",
                          isSelected
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-600"
                        )}>
                          {count}
                        </span>
                      )}

                      {/* Check icon */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Check size={14} weight="bold" className="text-primary-dark flex-shrink-0" />
                        </motion.div>
                      )}
                    </CommandItem>
                  </motion.div>
                )
              })}
            </CommandGroup>
          </CommandList>

          {/* Footer (quando filtrado) */}
          {selectedCategory !== 'all' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-3 py-2 border-t border-primary/10 bg-gradient-to-r from-primary/5 to-blue-50"
            >
              <button
                onClick={() => {
                  onCategoryChange('all')
                  setOpen(false)
                }}
                className="text-xs text-primary-dark hover:text-primary font-semibold transition-colors flex items-center gap-1 hover:gap-1.5 transition-all"
              >
                <span>←</span>
                Limpar filtro
              </button>
            </motion.div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
