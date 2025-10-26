function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold text-text mb-4">
        Sobre
      </h1>
      <p className="text-xl text-text/70 mb-4">
        Este projeto foi criado com React, TypeScript, Vite, Tailwind CSS e React Router.
      </p>
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold text-text mb-3">Tecnologias</h2>
        <ul className="list-disc list-inside space-y-2 text-text/80">
          <li>React 18</li>
          <li>TypeScript</li>
          <li>Vite</li>
          <li>Tailwind CSS</li>
          <li>React Router</li>
        </ul>
      </div>
    </div>
  )
}

export default About
