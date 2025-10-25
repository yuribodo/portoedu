import { useState } from 'react'

function Form() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    curso: '',
    mensagem: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Dados do formulário:', formData)
    // Aqui você pode adicionar lógica para enviar os dados
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-text mb-2">
        Formulário de Inscrição
      </h1>
      <p className="text-text/70 mb-8">
        Preencha os dados abaixo para se inscrever
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
        <div className="mb-6">
          <label htmlFor="nome" className="block text-text font-medium mb-2">
            Nome Completo
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-text font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="telefone" className="block text-text font-medium mb-2">
            Telefone
          </label>
          <input
            type="tel"
            id="telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="curso" className="block text-text font-medium mb-2">
            Curso de Interesse
          </label>
          <select
            id="curso"
            name="curso"
            value={formData.curso}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          >
            <option value="">Selecione um curso</option>
            <option value="programacao">Programação</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing Digital</option>
            <option value="gestao">Gestão de Projetos</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="mensagem" className="block text-text font-medium mb-2">
            Mensagem (opcional)
          </label>
          <textarea
            id="mensagem"
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
        >
          Enviar Inscrição
        </button>
      </form>
    </div>
  )
}

export default Form
