import { Check, X } from '@phosphor-icons/react'
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
  Sparkle,
  Funnel
} from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { CATEGORY_CONFIGS } from '@/data/opportunitiesDetailed'
import type { OpportunityCategory } from '@/types/opportunity'
import { cn } from '@/lib/utils'

interface FilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
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

export function FilterSheet({ open, onOpenChange, selectedCategory, onCategoryChange, categoryCounts }: FilterSheetProps) {
  const categories = [
    { id: 'all' as const, name: 'Todas as categorias', icon: 'Funnel', color: 'text-gray-700', bgColor: 'bg-gray-100' },
    ...Object.values(CATEGORY_CONFIGS)
  ]

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap]
    return Icon || BookOpen
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[60vh] p-0 flex flex-col">
        <SheetHeader className="px-4 py-4 border-b border-gray-100 flex-shrink-0">
          <SheetTitle className="text-lg font-bold text-primary-dark flex items-center gap-2">
            <Funnel size={20} weight="fill" />
            Categorias
          </SheetTitle>
        </SheetHeader>

        <Command className="flex-1 overflow-hidden flex flex-col bg-white">
          <CommandInput
            placeholder="Buscar categoria..."
            className="h-12 border-0 border-b border-gray-100 focus:border-primary/20 rounded-none text-base flex-shrink-0"
          />
          <CommandList className="flex-1 overflow-y-auto pb-24">
            <CommandEmpty className="py-8 text-center">
              <p className="text-sm text-gray-400">Nenhuma categoria encontrada</p>
            </CommandEmpty>
            <CommandGroup className="p-3">
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
                          onOpenChange(false)
                        }}
                        className={cn(
                          "flex items-center gap-3 px-4 py-4 cursor-pointer rounded-xl my-1.5 transition-all duration-200",
                          isSelected
                            ? "bg-gradient-to-r from-primary/10 to-blue-50 border-2 border-primary/30"
                            : "hover:bg-gray-50 border-2 border-transparent"
                        )}
                      >
                        {/* Icon */}
                        <Icon
                          size={20}
                          weight={isSelected ? 'fill' : 'regular'}
                          className={cn(
                            "flex-shrink-0 transition-all",
                            isSelected ? category.color : 'text-gray-600'
                          )}
                        />

                        {/* Label */}
                        <span className={cn(
                          "flex-1 text-base font-medium transition-colors",
                          isSelected ? "text-primary-dark" : "text-gray-900"
                        )}>
                          {category.name}
                        </span>

                        {/* Count badge */}
                        {count > 0 && (
                          <span className={cn(
                            "flex-shrink-0 min-w-[24px] h-6 px-2 rounded-full text-xs font-bold flex items-center justify-center transition-all duration-200",
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
                            <Check size={18} weight="bold" className="text-primary-dark flex-shrink-0" />
                          </motion.div>
                        )}
                      </CommandItem>
                    </motion.div>
                  )
                })}
              </CommandGroup>
            </CommandList>
        </Command>

        {/* Footer fixo */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 border-t border-gray-200 bg-white flex-shrink-0 safe-area-inset-bottom">
          {selectedCategory !== 'all' ? (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onCategoryChange('all')
                }}
                className="flex-1 py-3 text-sm text-primary-dark hover:text-primary font-semibold transition-colors flex items-center justify-center gap-2 bg-white rounded-xl border-2 border-primary/20 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <span>←</span>
                Limpar filtro
              </button>
              <button
                onClick={() => onOpenChange(false)}
                className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-gray-900 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all flex items-center justify-center gap-2"
              >
                <X size={18} weight="bold" />
                Fechar
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenChange(false)}
              className="w-full py-3 text-base font-semibold text-gray-700 hover:text-gray-900 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all flex items-center justify-center gap-2"
            >
              <X size={20} weight="bold" />
              Fechar
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
