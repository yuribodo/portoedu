import { useState, useEffect, useRef } from 'react'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'motion/react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = "Buscar por ProUni, intercâmbio, tecnologia..." }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  // Debounce: só atualiza o valor pai após 300ms sem digitar
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue)
    }, 300)

    return () => clearTimeout(timer)
  }, [localValue, onChange])

  // Sync com valor externo
  useEffect(() => {
    setLocalValue(value)
  }, [value])

  // Shortcut: pressionar "/" foca no input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleClear = () => {
    setLocalValue('')
    onChange('')
    inputRef.current?.focus()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        {/* Search icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <MagnifyingGlass size={20} weight="bold" />
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 md:h-14 pl-12 pr-12 text-base md:text-lg bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 placeholder:text-gray-400 shadow-sm focus:shadow-md"
        />

        {/* Clear button */}
        <AnimatePresence>
          {localValue && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
              aria-label="Limpar busca"
            >
              <X size={20} weight="bold" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Shortcut hint */}
        {!localValue && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-xs text-gray-400">
            <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-gray-500 font-mono">
              /
            </kbd>
          </div>
        )}
      </div>

      {/* Dica de busca */}
      {localValue && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-gray-500 text-center"
        >
          Buscando por "{localValue}"...
        </motion.p>
      )}
    </div>
  )
}
