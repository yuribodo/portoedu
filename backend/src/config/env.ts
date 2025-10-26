import { z } from 'zod'
import dotenv from 'dotenv'

// Carrega variáveis de ambiente do arquivo .env
dotenv.config()

/**
 * Schema de validação das variáveis de ambiente
 */
const envSchema = z.object({
  // Servidor
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)).default('3000'),

  // OpenAI
  OPENAI_API_KEY: z.string().min(1, 'OPENAI_API_KEY is required'),

  // CORS
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),

  // Rate Limiting (opcional)
  RATE_LIMIT_MAX: z.string().transform(Number).pipe(z.number().positive()).default('100'),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).pipe(z.number().positive()).default('900000'),
})

/**
 * Valida as variáveis de ambiente
 * Lança erro se alguma variável obrigatória estiver faltando ou inválida
 */
const validateEnv = () => {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:')
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`)
      })
      process.exit(1)
    }
    throw error
  }
}

/**
 * Variáveis de ambiente validadas e tipadas
 */
export const env = validateEnv()

/**
 * Type helper para as variáveis de ambiente
 */
export type Env = z.infer<typeof envSchema>
