import { motion } from 'motion/react'
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
import { CATEGORY_CONFIGS } from '@/data/opportunitiesDetailed'
import type { OpportunityCategory } from '@/types/opportunity'
import { cn } from '@/lib/utils'

interface FiltersBarProps {
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
  Sparkle
}

export function FiltersBar({ selectedCategory, onCategoryChange, categoryCounts }: FiltersBarProps) {
  const categories = [
    { id: 'all' as const, name: 'Todas', icon: 'Sparkle', color: 'text-gray-700', bgColor: 'bg-gray-100' },
    ...Object.values(CATEGORY_CONFIGS)
  ]

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap]
    return Icon || BookOpen
  }

  return (
    <div className="w-full">
      {/* Pills com wrap */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => {
          const Icon = getIcon(category.icon)
          const isSelected = selectedCategory === category.id
          const count = category.id === 'all'
            ? undefined
            : categoryCounts?.[category.id as OpportunityCategory]

          // Não mostra categorias com 0 oportunidades (exceto "Todas")
          if (category.id !== 'all' && count === 0) return null

          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "group relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                "border hover:shadow-md",
                isSelected
                  ? "bg-primary-dark border-primary-dark text-white shadow-md"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              <Icon
                size={16}
                weight={isSelected ? "fill" : "regular"}
                className="transition-all"
              />
              <span>{category.name}</span>
              {count !== undefined && count > 0 && (
                <span
                  className={cn(
                    "ml-1 min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold flex items-center justify-center",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  )}
                >
                  {count}
                </span>
              )}

              {/* Ripple effect on click */}
              {isSelected && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-primary-dark rounded-full -z-10"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Indicador de filtro ativo - mais sutil */}
      {selectedCategory !== 'all' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-3"
        >
          <button
            onClick={() => onCategoryChange('all')}
            className="text-xs text-gray-500 hover:text-primary-dark underline decoration-dotted underline-offset-2 transition-colors"
          >
            Limpar filtro
          </button>
        </motion.div>
      )}
    </div>
  )
}
