import { Link, Outlet, useLocation } from 'react-router-dom'
import { Footer } from '@/components/Footer'

function Layout() {
  const location = useLocation()
  const isFormPage = location.pathname === '/form'
  const isHomePage = location.pathname === '/home'

  return (
    <div className={`min-h-screen ${isFormPage ? 'bg-[#F9FAFB]' : 'bg-background'}`}>
      <nav className="fixed top-3 sm:top-6 left-0 right-0 z-50 px-3 sm:px-6">
        <div className={`max-w-7xl mx-auto ${isFormPage ? 'bg-white/70' : 'bg-background/70'} backdrop-blur-lg border border-primary/10 shadow-lg rounded-2xl sm:rounded-3xl px-3 sm:px-6 py-2.5 sm:py-3`}>
          <div className="flex items-center justify-between gap-2">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <img
                src="/assets/icon.svg"
                alt="PortoEdu"
                className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
              />
              <span className="text-lg sm:text-2xl font-bold text-primary truncate">PortoEdu</span>
            </Link>
            <Link
              to="/form"
              className="px-3 sm:px-6 py-1.5 sm:py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg text-sm sm:text-base transition-all duration-200 whitespace-nowrap flex-shrink-0"
            >
              <span className="hidden sm:inline">Começar agora</span>
              <span className="inline sm:hidden">Começar</span>
            </Link>
          </div>
        </div>
      </nav>
      <main className={isFormPage ? 'pt-16 sm:pt-24' : 'pt-20 sm:pt-28'}>
        <Outlet />
      </main>
      {!isFormPage && !isHomePage && <Footer />}
    </div>
  )
}

export default Layout
