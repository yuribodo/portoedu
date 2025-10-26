import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { EnvelopeSimple } from '@phosphor-icons/react'

const productLinks = [
  { label: 'Como funciona', href: '#how-it-works' },
  { label: 'Oportunidades', href: '#opportunities' },
  { label: 'Para quem é', href: '#for-who' },
  { label: 'Começar agora', href: '/form' },
]

const companyLinks = [
  { label: 'Sobre nós', href: '/about' },
]

export function Footer() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <footer className="bg-[#E8F5FF] pt-16 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Single Card Container */}
        <div className="bg-white rounded-3xl p-6 md:p-12 shadow-sm">
          {/* Newsletter Section */}
          <div className="bg-[#F8F7FA] rounded-2xl p-6 md:p-8 mb-12 md:mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-text mb-3">
              Inscreva-se na nossa newsletter
            </h3>
            <p className="text-sm md:text-base text-text-muted mb-6">
              Receba dicas de oportunidades e novidades do PortoEdu direto no
              seu email
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1 relative">
                <EnvelopeSimple
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  size={20}
                  weight="regular"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-200 whitespace-nowrap"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-12">
          {/* Produto Column */}
          <div>
            <h4 className="font-semibold text-text mb-4">Produto</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-text-muted hover:text-text hover:opacity-70 transition-all duration-200 text-sm md:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa Column */}
          <div>
            <h4 className="font-semibold text-text mb-4">Empresa</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-text-muted hover:text-text hover:opacity-70 transition-all duration-200 text-sm md:text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F8F7FA] rounded-full">
            <span className="text-sm text-text-muted">
              Feito com 💚 e carinho por Porti
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-text-muted text-center md:text-right">
            © 2025 PortoEdu. Todos os direitos reservados.
          </p>
        </div>
        </div>
      </div>
    </footer>
  )
}
