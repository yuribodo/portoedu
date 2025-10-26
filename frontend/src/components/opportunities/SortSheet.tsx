import { Check, SortAscending, Clock, CalendarPlus, TextAa, X } from '@phosphor-icons/react'
import { motion } from 'motion/react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export type SortOption = 'compatibility' | 'deadline' | 'recent' | 'alphabetical'

interface SortSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
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

export function SortSheet({ open, onOpenChange, value, onChange }: SortSheetProps) {
  const handleSelect = (option: SortOption) => {
    onChange(option)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-auto p-0 flex flex-col">
        <SheetHeader className="px-4 py-4 border-b border-gray-100 flex-shrink-0">
          <SheetTitle className="text-lg font-bold text-primary-dark flex items-center gap-2">
            <SortAscending size={20} weight="fill" />
            Ordenar por
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-3 px-3 pb-24">
          {sortOptions.map((option, index) => {
            const OptionIcon = option.icon
            const isSelected = option.value === value

            return (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "w-full px-4 py-4 flex items-start gap-3 rounded-xl my-1.5 transition-all duration-200",
                  isSelected
                    ? "bg-gradient-to-r from-primary/10 to-blue-50 border-2 border-primary/30"
                    : "hover:bg-gray-50 border-2 border-transparent"
                )}
              >
                <OptionIcon
                  size={22}
                  weight={isSelected ? 'fill' : 'regular'}
                  className={cn(
                    "flex-shrink-0 transition-all",
                    isSelected ? 'text-primary-dark' : 'text-gray-600'
                  )}
                />
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn(
                      "text-base font-medium transition-colors",
                      isSelected ? 'text-primary-dark' : 'text-gray-900'
                    )}>
                      {option.label}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Check size={18} weight="bold" className="text-primary-dark flex-shrink-0" />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {option.description}
                  </p>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Footer fixo com botão fechar */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 border-t border-gray-200 bg-white flex-shrink-0 safe-area-inset-bottom">
          <button
            onClick={() => onOpenChange(false)}
            className="w-full py-3 text-base font-semibold text-gray-700 hover:text-gray-900 rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all flex items-center justify-center gap-2"
          >
            <X size={20} weight="bold" />
            Fechar
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
