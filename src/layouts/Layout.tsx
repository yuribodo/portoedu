import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              PortoEdu
            </Link>
            <div className="flex gap-6">
              <Link
                to="/"
                className="text-text/70 hover:text-primary transition-colors font-medium"
              >
                Início
              </Link>
              <Link
                to="/form"
                className="text-text/70 hover:text-primary transition-colors font-medium"
              >
                Formulário
              </Link>
              <Link
                to="/about"
                className="text-text/70 hover:text-primary transition-colors font-medium"
              >
                Sobre
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
