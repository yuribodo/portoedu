import type {
  OpportunityDetail,
  CategoryConfig,
  OpportunityCategory
} from '../types/opportunity.js'

/**
 * Configuração de categorias com cores e ícones
 */
export const CATEGORY_CONFIGS: Record<OpportunityCategory, CategoryConfig> = {
  bolsa: {
    id: 'bolsa',
    name: 'Bolsa de Estudos',
    icon: 'GraduationCap',
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    description: 'Apoio financeiro para seus estudos'
  },
  intercambio: {
    id: 'intercambio',
    name: 'Intercâmbio',
    icon: 'Airplane',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    description: 'Experiências internacionais'
  },
  curso: {
    id: 'curso',
    name: 'Cursos Gratuitos',
    icon: 'BookOpen',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    description: 'Aprenda novas habilidades'
  },
  olimpiada: {
    id: 'olimpiada',
    name: 'Olimpíadas',
    icon: 'Medal',
    color: 'text-yellow-700',
    bgColor: 'bg-yellow-100',
    description: 'Competições acadêmicas'
  },
  estagio: {
    id: 'estagio',
    name: 'Estágios',
    icon: 'Briefcase',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    description: 'Experiência profissional'
  },
  pesquisa: {
    id: 'pesquisa',
    name: 'Pesquisa Científica',
    icon: 'Flask',
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-100',
    description: 'Iniciação científica'
  },
  pos: {
    id: 'pos',
    name: 'Pós-Graduação',
    icon: 'Certificate',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-100',
    description: 'Especialização e mestrado'
  },
  idioma: {
    id: 'idioma',
    name: 'Idiomas',
    icon: 'Translate',
    color: 'text-pink-700',
    bgColor: 'bg-pink-100',
    description: 'Aprenda novos idiomas'
  },
  empreendedorismo: {
    id: 'empreendedorismo',
    name: 'Empreendedorismo',
    icon: 'Rocket',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    description: 'Inicie seu próprio negócio'
  }
}

/**
 * Dados de oportunidades (adaptado do frontend com datas em formato ISO)
 */
const opportunitiesRaw = [
  {
    id: 'prouni-2025',
    title: 'ProUni 2025 - Bolsa Integral',
    category: 'bolsa' as const,
    icon: '🎓',
    banner: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
    shortDescription: 'Bolsa integral para graduação em universidades privadas',
    fullDescription: 'O Programa Universidade para Todos (ProUni) oferece bolsas de estudo integrais e parciais em instituições privadas de educação superior.',
    modality: 'presencial' as const,
    duration: { amount: 4, unit: 'anos' as const },
    cost: 'bolsa-integral' as const,
    requirements: [
      { type: 'idade' as const, description: 'Qualquer idade', required: true, value: { min: 14 } },
      { type: 'escolaridade' as const, description: 'Ensino médio completo ou cursando 3º ano', required: true },
      { type: 'escola-publica' as const, description: 'Ter cursado ensino médio em escola pública', required: true, value: true },
      { type: 'renda' as const, description: 'Renda familiar per capita de até 1,5 salário mínimo', required: true },
    ],
    targetAudience: 'Estudantes de baixa renda que concluíram o ensino médio em escola pública',
    benefits: [
      { icon: '💰', title: 'Bolsa 100%', description: 'Mensalidade totalmente gratuita' },
      { icon: '📚', title: 'Universidades renomadas', description: 'Acesso a instituições privadas de qualidade' },
    ],
    mainBenefit: 'Graduação completa gratuita em universidades privadas',
    steps: [
      { order: 1, title: 'Fazer o ENEM', description: 'Realizar a prova do ENEM com média mínima de 450 pontos', completed: false },
      { order: 2, title: 'Inscrever-se no ProUni', description: 'Fazer inscrição no site durante o período oficial', link: 'https://acessounico.mec.gov.br/prouni', completed: false },
    ],
    officialLink: 'https://acessounico.mec.gov.br/prouni',
    deadline: '2025-02-15T23:59:59.000Z',
    hasDeadline: true,
    tags: ['graduação', 'universidade', 'bolsa-integral', 'enem'],
    createdAt: '2025-01-01T00:00:00.000Z',
    featured: true,
    portiContext: 'O ProUni é uma das maiores oportunidades para fazer faculdade gratuitamente!',
  },
  {
    id: 'bootcamp-tech-2025',
    title: 'Bootcamp Full Stack Gratuito',
    category: 'curso' as const,
    icon: '💻',
    banner: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
    shortDescription: 'Aprenda programação do zero em 3 meses',
    fullDescription: 'Bootcamp intensivo de desenvolvimento web full stack, do zero ao mercado de trabalho.',
    modality: 'online' as const,
    duration: { amount: 3, unit: 'meses' as const },
    cost: 'gratuito' as const,
    requirements: [
      { type: 'idade' as const, description: 'A partir de 16 anos', required: true, value: { min: 16 } },
      { type: 'interesse' as const, description: 'Interesse em tecnologia', required: true, value: ['tecnologia'] },
    ],
    targetAudience: 'Qualquer pessoa interessada em entrar na área de tecnologia',
    benefits: [
      { icon: '🆓', title: '100% Gratuito', description: 'Sem custos de matrícula' },
      { icon: '📜', title: 'Certificado', description: 'Certificado reconhecido' },
    ],
    mainBenefit: 'Formação completa em desenvolvimento web',
    steps: [
      { order: 1, title: 'Inscrever-se', description: 'Preencher formulário online', completed: false },
      { order: 2, title: 'Fazer teste lógico', description: 'Teste simples de raciocínio', completed: false },
    ],
    officialLink: 'https://example.com/bootcamp',
    deadline: '2025-02-10T23:59:59.000Z',
    hasDeadline: true,
    tags: ['tecnologia', 'programação', 'online', 'gratuito'],
    createdAt: '2025-01-10T00:00:00.000Z',
    featured: true,
  },
  {
    id: 'intercambio-europa-2025',
    title: 'Programa Erasmus+ Brasil',
    category: 'intercambio' as const,
    icon: '✈️',
    banner: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=400&fit=crop',
    shortDescription: 'Intercâmbio na Europa com bolsa completa',
    fullDescription: 'Oportunidades de mobilidade na União Europeia com bolsa integral.',
    modality: 'presencial' as const,
    duration: { amount: 6, unit: 'meses' as const },
    cost: 'bolsa-integral' as const,
    requirements: [
      { type: 'idade' as const, description: 'Entre 18 e 30 anos', required: true, value: { min: 18, max: 30 } },
      { type: 'escolaridade' as const, description: 'Cursando graduação', required: true },
    ],
    targetAudience: 'Universitários que desejam experiência internacional',
    benefits: [
      { icon: '🌍', title: 'Estude na Europa', description: 'Universidades de alto nível' },
      { icon: '💶', title: 'Bolsa mensal', description: 'Entre €700 e €1000/mês' },
    ],
    mainBenefit: 'Intercâmbio completo na Europa',
    steps: [
      { order: 1, title: 'Verificar elegibilidade', description: 'Conferir parceria da universidade', completed: false },
    ],
    officialLink: 'https://erasmus-plus.ec.europa.eu/',
    deadline: '2025-03-31T23:59:59.000Z',
    hasDeadline: true,
    tags: ['intercâmbio', 'europa', 'graduação'],
    createdAt: '2025-01-05T00:00:00.000Z',
    featured: true,
  }
]

/**
 * Converte datas ISO string para Date objects
 */
export const opportunitiesData: OpportunityDetail[] = opportunitiesRaw.map(opp => ({
  ...opp,
  deadline: new Date(opp.deadline),
  createdAt: new Date(opp.createdAt),
}))

/**
 * Busca oportunidade por ID
 */
export function getOpportunityById(id: string): OpportunityDetail | undefined {
  return opportunitiesData.find(opp => opp.id === id)
}

/**
 * Filtra oportunidades por categoria
 */
export function getOpportunitiesByCategory(category: OpportunityCategory): OpportunityDetail[] {
  return opportunitiesData.filter(opp => opp.category === category)
}

/**
 * Busca oportunidades em destaque
 */
export function getFeaturedOpportunities(): OpportunityDetail[] {
  return opportunitiesData.filter(opp => opp.featured === true)
}

/**
 * Filtra oportunidades com query params
 */
export function filterOpportunities(filters: {
  category?: OpportunityCategory
  featured?: boolean
}): OpportunityDetail[] {
  let result = [...opportunitiesData]

  if (filters.category) {
    result = result.filter(opp => opp.category === filters.category)
  }

  if (filters.featured !== undefined) {
    result = result.filter(opp => opp.featured === filters.featured)
  }

  return result
}
