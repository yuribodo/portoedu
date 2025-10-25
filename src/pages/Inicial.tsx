function Inicial() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-text mb-6">
          PortoEdu
        </h1>
        <p className="text-2xl text-text/70 mb-8">
          Plataforma educacional
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/form"
            className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
          >
            Começar Agora
          </a>
          <a
            href="/about"
            className="px-8 py-4 bg-white hover:bg-gray-50 text-text border-2 border-primary font-semibold rounded-lg transition-colors"
          >
            Saiba Mais
          </a>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">
            Aprenda
          </h3>
          <p className="text-text/70">
            Conteúdo educacional de qualidade
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">
            Pratique
          </h3>
          <p className="text-text/70">
            Exercícios e atividades práticas
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">🏆</span>
          </div>
          <h3 className="text-xl font-semibold text-text mb-2">
            Evolua
          </h3>
          <p className="text-text/70">
            Acompanhe seu progresso
          </p>
        </div>
      </div>
    </div>
  )
}

export default Inicial
