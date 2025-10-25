import { Link, Outlet } from 'react-router-dom'
import { Footer } from '@/components/Footer'

function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-6 left-0 right-0 z-50 px-6">
        <div className="max-w-7xl mx-auto bg-background/70 backdrop-blur-lg border border-primary/10 shadow-lg rounded-3xl px-6 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/assets/icon.svg"
                alt="PortoEdu"
                className="h-10 w-10"
              />
              <span className="text-2xl font-bold text-primary">PortoEdu</span>
            </Link>
            <Link
              to="/form"
              className="px-6 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all duration-200"
            >
              Começar agora
            </Link>
          </div>
        </div>
      </nav>
      <main className="pt-28">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
