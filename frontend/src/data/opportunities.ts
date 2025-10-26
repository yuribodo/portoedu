export interface Opportunity {
  id: string
  logo: string
  title: string
  category: string
  description: string
  tags: string[]
}

export const opportunities: Opportunity[] = [
  {
    id: '1',
    logo: '🎓',
    title: 'Bolsa Integral FIES',
    category: 'Bolsa de Estudos',
    description: 'Financiamento estudantil para graduação com condições especiais',
    tags: ['Graduação', 'Federal', 'Integral'],
  },
  {
    id: '2',
    logo: '🌎',
    title: 'Intercâmbio Europa',
    category: 'Intercâmbio',
    description: 'Programa de intercâmbio acadêmico para universidades europeias',
    tags: ['Internacional', 'Europa', 'Graduação'],
  },
  {
    id: '3',
    logo: '💻',
    title: 'Bootcamp Tech Pro',
    category: 'Curso Gratuito',
    description: 'Formação intensiva em desenvolvimento de software com certificado',
    tags: ['Tecnologia', 'Gratuito', 'Online'],
  },
  {
    id: '4',
    logo: '🔬',
    title: 'Iniciação Científica CNPq',
    category: 'Pesquisa',
    description: 'Bolsa de pesquisa para estudantes de graduação em diversas áreas',
    tags: ['Pesquisa', 'CNPq', 'Graduação'],
  },
  {
    id: '5',
    logo: '🏆',
    title: 'ProUni 2024',
    category: 'Bolsa de Estudos',
    description: 'Bolsas parciais e integrais em instituições privadas de ensino',
    tags: ['Graduação', 'Federal', 'ProUni'],
  },
  {
    id: '6',
    logo: '🎯',
    title: 'MBA Executivo',
    category: 'Pós-Graduação',
    description: 'Especialização em gestão e liderança com desconto especial',
    tags: ['MBA', 'Gestão', 'Executivo'],
  },
  {
    id: '7',
    logo: '🌟',
    title: 'Jovem Aprendiz TI',
    category: 'Emprego',
    description: 'Programa de formação profissional em tecnologia da informação',
    tags: ['Primeiro Emprego', 'TI', 'Jovem'],
  },
  {
    id: '8',
    logo: '📚',
    title: 'Mestrado com Bolsa',
    category: 'Pós-Graduação',
    description: 'Programa de mestrado acadêmico com bolsa CAPES',
    tags: ['Mestrado', 'CAPES', 'Pesquisa'],
  },
  {
    id: '9',
    logo: '🚀',
    title: 'Startup Academy',
    category: 'Empreendedorismo',
    description: 'Aceleradora gratuita para projetos inovadores de estudantes',
    tags: ['Startup', 'Inovação', 'Gratuito'],
  },
  {
    id: '10',
    logo: '🎨',
    title: 'Curso Design UX/UI',
    category: 'Curso Gratuito',
    description: 'Formação completa em design de interfaces e experiência do usuário',
    tags: ['Design', 'UX/UI', 'Online'],
  },
  {
    id: '11',
    logo: '⚡',
    title: 'Inglês Fluente',
    category: 'Idiomas',
    description: 'Bolsa de 50% para curso de inglês preparatório para certificações',
    tags: ['Idiomas', 'Inglês', 'Certificação'],
  },
  {
    id: '12',
    logo: '🎪',
    title: 'Extensão Universitária',
    category: 'Curso Livre',
    description: 'Cursos de extensão em diversas áreas do conhecimento',
    tags: ['Extensão', 'Livre', 'Universidade'],
  },
]
