import type {
  OpportunityDetail,
  CategoryConfig,
  OpportunityCategory
} from '@/types/opportunity'

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
 * Dados mockados de oportunidades detalhadas
 */
export const opportunitiesData: OpportunityDetail[] = [
  {
    id: 'prouni-2025',
    title: 'ProUni 2025 - Bolsa Integral',
    category: 'bolsa',
    icon: '🎓',
    banner: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
    shortDescription: 'Bolsa integral para graduação em universidades privadas',
    fullDescription: 'O Programa Universidade para Todos (ProUni) oferece bolsas de estudo integrais e parciais em instituições privadas de educação superior, em cursos de graduação e sequenciais de formação específica.',

    modality: 'presencial',
    duration: { amount: 4, unit: 'anos' },
    cost: 'bolsa-integral',

    requirements: [
      {
        type: 'idade',
        description: 'Qualquer idade',
        required: true,
        value: { min: 14 }
      },
      {
        type: 'escolaridade',
        description: 'Ensino médio completo ou cursando 3º ano',
        required: true
      },
      {
        type: 'escola-publica',
        description: 'Ter cursado ensino médio em escola pública ou particular com bolsa integral',
        required: true,
        value: true
      },
      {
        type: 'renda',
        description: 'Renda familiar per capita de até 1,5 salário mínimo',
        required: true
      },
      {
        type: 'outro',
        description: 'Ter feito o ENEM no ano anterior com nota mínima de 450 pontos',
        required: true
      }
    ],
    targetAudience: 'Estudantes de baixa renda que concluíram o ensino médio em escola pública',

    benefits: [
      {
        icon: '💰',
        title: 'Bolsa 100%',
        description: 'Mensalidade totalmente gratuita durante todo o curso'
      },
      {
        icon: '📚',
        title: 'Universidades renomadas',
        description: 'Acesso a instituições privadas de qualidade'
      },
      {
        icon: '🎯',
        title: 'Diploma reconhecido',
        description: 'Certificação com o mesmo valor de alunos pagantes'
      }
    ],
    mainBenefit: 'Graduação completa gratuita em universidades privadas',

    steps: [
      {
        order: 1,
        title: 'Fazer o ENEM',
        description: 'Realizar a prova do ENEM no ano anterior com média mínima de 450 pontos e não ter zerado a redação. O ENEM é requisito obrigatório e sua nota determina sua classificação.',
        estimatedTime: '2 dias (inscrição + prova)',
        checklist: [
          'Fazer inscrição no site do ENEM dentro do prazo',
          'Pagar taxa de inscrição (ou solicitar isenção se tiver direito)',
          'Confirmar local de prova alguns dias antes',
          'Separar documentos: RG original e caneta preta',
          'Fazer a prova nos 2 dias (domingo + domingo seguinte)'
        ],
        tips: [
          'Se você tem baixa renda, pode pedir isenção da taxa de inscrição',
          'Treine redações! A redação tem peso importante na média',
          'Faça simulados para conhecer o estilo das questões'
        ],
        warnings: [
          'Não zere a redação! Isso te desqualifica automaticamente do ProUni',
          'Guarde seu número de inscrição e senha - você vai precisar para o ProUni'
        ],
        completed: false
      },
      {
        order: 2,
        title: 'Inscrever-se no ProUni',
        description: 'Fazer inscrição no site do ProUni durante o período oficial (geralmente em janeiro e junho). Você pode escolher até 2 opções de curso e universidade.',
        estimatedTime: '30 minutos a 1 hora',
        link: 'https://acessounico.mec.gov.br/prouni',
        checklist: [
          'Acessar o site do ProUni com seu login do ENEM',
          'Verificar se sua nota do ENEM é suficiente',
          'Escolher a primeira opção de curso (prioridade)',
          'Escolher a segunda opção de curso (caso não passe na primeira)',
          'Conferir se preencheu informações sobre renda familiar',
          'Finalizar e confirmar inscrição'
        ],
        tips: [
          'Escolha cursos que sua nota tem chances reais - veja notas de corte anteriores',
          'Sua 2ª opção também é importante! Escolha com cuidado',
          'O sistema mostra em tempo real se você está dentro da nota de corte',
          'Você pode alterar suas opções durante todo o período de inscrição'
        ],
        warnings: [
          'Fique atento ao prazo! Geralmente são apenas 3-4 dias de inscrição',
          'Confira TODOS os dados antes de finalizar - erros podem te desclassificar'
        ],
        completed: false
      },
      {
        order: 3,
        title: 'Aguardar resultado',
        description: 'Acompanhar as chamadas: primeira chamada, segunda chamada e lista de espera. Os resultados saem no próprio site do ProUni.',
        estimatedTime: '1 a 2 meses',
        checklist: [
          'Anotar a data de divulgação da 1ª chamada',
          'Conferir resultado no site (não espere apenas e-mail)',
          'Se não passar na 1ª, aguardar a 2ª chamada',
          'Se não passar na 2ª, manifestar interesse na lista de espera',
          'Acompanhar diariamente a lista de espera, se for o caso'
        ],
        tips: [
          'Configure notificações no celular para não perder prazos',
          'Mesmo que não passe na 1ª chamada, não desista! Muita gente desiste e novas vagas abrem',
          'A lista de espera funciona por ordem de nota - quanto maior sua nota ENEM, melhores as chances'
        ],
        warnings: [
          'Cada chamada tem prazo curto para comparecer na universidade (geralmente 3-5 dias)',
          'Se você for chamado e não comparecer no prazo, perde a vaga!'
        ],
        completed: false
      },
      {
        order: 4,
        title: 'Comprovar informações',
        description: 'Apresentar documentação original na universidade para validação das informações declaradas na inscrição. Essa etapa é obrigatória para efetivar a bolsa.',
        estimatedTime: '1 a 3 horas (presencial)',
        checklist: [
          'Separar RG e CPF (originais e cópias)',
          'Levar comprovante de residência atualizado',
          'Reunir documentos de renda de todos os membros da família',
          'Pegar histórico escolar do ensino médio na escola',
          'Levar certificado de conclusão do ensino médio',
          'Comparecer à universidade na data e horário marcados',
          'Entregar documentação e aguardar validação'
        ],
        tips: [
          'Ligue na universidade antes e confirme exatamente quais documentos são necessários',
          'Leve originais E cópias de tudo - algumas universidades pedem ambos',
          'Se alguém da família for autônomo, pode fazer declaração de renda escrita',
          'Chegue cedo! Costuma ter fila e o prazo é curto'
        ],
        warnings: [
          'Informações falsas resultam em perda da bolsa e até processo judicial',
          'Se faltar algum documento, você pode ser desclassificado - confira tudo antes',
          'O prazo para apresentar os documentos é curto (3-5 dias) - não deixe para última hora'
        ],
        completed: false
      }
    ],
    officialLink: 'https://acessounico.mec.gov.br/prouni',

    deadline: new Date('2025-02-15'),
    hasDeadline: true,

    tags: ['graduação', 'universidade', 'bolsa-integral', 'enem'],

    createdAt: new Date('2025-01-01'),
    featured: true,

    portiContext: 'O ProUni é uma das maiores oportunidades para quem quer fazer faculdade mas não tem condições de pagar. A concorrência é alta, mas vale muito a pena tentar!',

    careerImpact: {
      title: 'Como isso vai transformar sua carreira',
      description: 'Ter um diploma de graduação pode aumentar seus ganhos em até 140% comparado a quem tem apenas ensino médio. Além do salário, você terá acesso a oportunidades profissionais completamente diferentes.',
      opportunities: [
        'Acesso a vagas de emprego que exigem ensino superior (maioria das empresas médias e grandes)',
        'Possibilidade de fazer concursos públicos com salários mais altos',
        'Chance de trabalhar em sua área de interesse, não apenas "qualquer emprego"',
        'Networking com professores e colegas que podem abrir portas no mercado',
        'Base para fazer pós-graduação, mestrado ou especialização no futuro'
      ],
      differentials: [
        'Currículo muito mais competitivo - você estará entre os 21% dos brasileiros com ensino superior',
        'Credibilidade profissional - empresas valorizam candidatos com formação',
        'Desenvolvimento de habilidades técnicas e pensamento crítico',
        'Certificação reconhecida nacionalmente (mesmo peso de quem pagou)',
        'Experiência universitária completa: projetos, pesquisa, eventos acadêmicos'
      ]
    }
  },

  {
    id: 'fies-2025',
    title: 'FIES - Financiamento Estudantil',
    category: 'bolsa',
    icon: '💳',
    banner: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    shortDescription: 'Financiamento com juros baixos para pagar a faculdade',
    fullDescription: 'O Fundo de Financiamento Estudantil (FIES) é um programa do Ministério da Educação que financia cursos superiores não gratuitos com juros baixos para estudantes que não têm condições de arcar com os custos.',

    modality: 'presencial',
    duration: { amount: 4, unit: 'anos' },
    cost: 'pago',

    requirements: [
      {
        type: 'idade',
        description: 'Qualquer idade',
        required: true,
        value: { min: 14 }
      },
      {
        type: 'escolaridade',
        description: 'Ensino médio completo',
        required: true
      },
      {
        type: 'renda',
        description: 'Renda familiar per capita de até 3 salários mínimos',
        required: true
      },
      {
        type: 'outro',
        description: 'Ter feito o ENEM a partir de 2010 com nota mínima de 450 pontos',
        required: true
      }
    ],
    targetAudience: 'Estudantes que precisam de financiamento para cursar graduação',

    benefits: [
      {
        icon: '📉',
        title: 'Juros baixos',
        description: 'Taxa de juros zero para renda até 3 salários mínimos'
      },
      {
        icon: '⏰',
        title: 'Pague depois de formado',
        description: 'Comece a pagar 18 meses após a formatura'
      },
      {
        icon: '🎓',
        title: 'Estude agora',
        description: 'Não deixe de estudar por falta de recursos'
      }
    ],
    mainBenefit: 'Financiamento de até 100% da mensalidade com juros zero',

    steps: [
      {
        order: 1,
        title: 'Fazer o ENEM',
        description: 'Ter realizado ENEM a partir de 2010 com média de 450 pontos',
        completed: false
      },
      {
        order: 2,
        title: 'Inscrever-se no FIES',
        description: 'Fazer inscrição no sistema do FIES',
        link: 'https://sisfiesportal.mec.gov.br/',
        completed: false
      },
      {
        order: 3,
        title: 'Completar inscrição',
        description: 'Preencher informações complementares no prazo',
        completed: false
      },
      {
        order: 4,
        title: 'Contratar financiamento',
        description: 'Comparecer ao banco para assinar o contrato',
        completed: false
      }
    ],
    officialLink: 'https://sisfiesportal.mec.gov.br/',

    deadline: new Date('2025-02-28'),
    hasDeadline: true,

    tags: ['graduação', 'financiamento', 'universidade', 'enem'],

    createdAt: new Date('2025-01-01'),
    featured: false,

    careerImpact: {
      title: 'Como isso vai transformar sua carreira',
      description: 'Ter um diploma universitário te abre portas que estariam fechadas sem ele. O FIES permite que você estude agora e pague depois, sem deixar de investir no seu futuro.',
      opportunities: [
        'Mesmas oportunidades profissionais do ProUni - diploma tem mesmo valor',
        'Possibilidade de trabalhar em grandes empresas que exigem ensino superior',
        'Acesso a concursos públicos de nível superior com melhores salários',
        'Crescimento na carreira atual com promoções baseadas em formação',
        'Base para especialização e pós-graduação futura'
      ],
      differentials: [
        'Flexibilidade de pagar só após se formar e estar empregado',
        'Diploma universitário reconhecido nacionalmente',
        'Desenvolvimento profissional enquanto estuda',
        'Networking universitário que abre portas no mercado',
        'Qualificação que te diferencia em processos seletivos'
      ]
    }
  },

  {
    id: 'intercambio-europa-2025',
    title: 'Programa Erasmus+ Brasil',
    category: 'intercambio',
    icon: '✈️',
    banner: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=400&fit=crop',
    shortDescription: 'Intercâmbio na Europa com bolsa completa',
    fullDescription: 'O Erasmus+ é o programa da União Europeia de apoio à educação, formação, juventude e desporto. Oferece oportunidades de mobilidade e cooperação nos setores da educação, formação, juventude e desporto.',

    modality: 'presencial',
    duration: { amount: 6, unit: 'meses' },
    cost: 'bolsa-integral',

    requirements: [
      {
        type: 'idade',
        description: 'Entre 18 e 30 anos',
        required: true,
        value: { min: 18, max: 30 }
      },
      {
        type: 'escolaridade',
        description: 'Cursando graduação ou com graduação completa',
        required: true
      },
      {
        type: 'interesse',
        description: 'Interesse em estudar na Europa',
        required: true,
        value: ['tecnologia', 'ciências', 'idiomas']
      },
      {
        type: 'outro',
        description: 'Inglês intermediário ou avançado',
        required: true
      }
    ],
    targetAudience: 'Universitários que desejam experiência acadêmica internacional',

    benefits: [
      {
        icon: '🌍',
        title: 'Estude na Europa',
        description: 'Universidades de alto nível em países europeus'
      },
      {
        icon: '💶',
        title: 'Bolsa mensal',
        description: 'Entre €700 e €1000 por mês para custos de vida'
      },
      {
        icon: '🎫',
        title: 'Passagens inclusas',
        description: 'Passagem aérea ida e volta'
      },
      {
        icon: '🏠',
        title: 'Auxílio moradia',
        description: 'Ajuda de custo para acomodação'
      }
    ],
    mainBenefit: 'Intercâmbio completo na Europa com todas as despesas pagas',

    steps: [
      {
        order: 1,
        title: 'Verificar elegibilidade',
        description: 'Conferir se sua instituição tem parceria com o programa',
        completed: false
      },
      {
        order: 2,
        title: 'Preparar documentação',
        description: 'Histórico escolar, carta de motivação, currículo e certificados de idioma',
        completed: false
      },
      {
        order: 3,
        title: 'Candidatar-se',
        description: 'Enviar candidatura pela sua universidade',
        link: 'https://erasmus-plus.ec.europa.eu/',
        completed: false
      },
      {
        order: 4,
        title: 'Aguardar seleção',
        description: 'Processo seletivo pode levar de 2 a 3 meses',
        completed: false
      }
    ],
    officialLink: 'https://erasmus-plus.ec.europa.eu/',

    deadline: new Date('2025-03-31'),
    hasDeadline: true,

    tags: ['intercâmbio', 'europa', 'graduação', 'bolsa-integral'],

    createdAt: new Date('2025-01-05'),
    featured: true,

    careerImpact: {
      title: 'Como isso vai transformar sua carreira',
      description: 'Experiência internacional é um dos diferenciais mais valorizados pelo mercado. Estudar na Europa te coloca em outro patamar profissional e abre portas globalmente.',
      opportunities: [
        'Trabalhar em empresas multinacionais e startups europeias',
        'Oportunidades de carreira na Europa após a graduação',
        'Acesso a vagas "remote-first" de empresas internacionais',
        'Networking global com colegas de diversos países',
        'Possibilidade de fazer mestrado/doutorado na Europa com mais facilidade'
      ],
      differentials: [
        'Currículo internacional - destaque imediato em seleções',
        'Fluência em inglês e possível segundo idioma europeu',
        'Experiência multicultural muito valorizada por empresas globais',
        'Vivência que desenvolve autonomia, adaptabilidade e maturidade',
        'Certificação de universidades europeias renomadas'
      ]
    }
  },

  {
    id: 'bootcamp-tech-2025',
    title: 'Bootcamp Full Stack Gratuito',
    category: 'curso',
    icon: '💻',
    banner: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
    shortDescription: 'Aprenda programação do zero em 3 meses',
    fullDescription: 'Bootcamp intensivo de desenvolvimento web full stack, do zero ao mercado de trabalho. Aprenda HTML, CSS, JavaScript, React, Node.js e muito mais com professores experientes e metodologia hands-on.',

    modality: 'online',
    duration: { amount: 3, unit: 'meses' },
    cost: 'gratuito',

    requirements: [
      {
        type: 'idade',
        description: 'A partir de 16 anos',
        required: true,
        value: { min: 16 }
      },
      {
        type: 'interesse',
        description: 'Interesse em tecnologia e programação',
        required: true,
        value: ['tecnologia']
      },
      {
        type: 'outro',
        description: 'Disponibilidade de 20h por semana',
        required: true
      },
      {
        type: 'outro',
        description: 'Computador com internet',
        required: true
      }
    ],
    targetAudience: 'Qualquer pessoa interessada em entrar na área de tecnologia',

    benefits: [
      {
        icon: '🆓',
        title: '100% Gratuito',
        description: 'Sem custos de matrícula ou mensalidade'
      },
      {
        icon: '👨‍💻',
        title: 'Professores do mercado',
        description: 'Aprenda com profissionais que trabalham em grandes empresas'
      },
      {
        icon: '📜',
        title: 'Certificado',
        description: 'Certificado reconhecido pelo mercado'
      },
      {
        icon: '💼',
        title: 'Empregabilidade',
        description: 'Suporte para conseguir seu primeiro emprego'
      }
    ],
    mainBenefit: 'Formação completa em desenvolvimento web com certificado',

    steps: [
      {
        order: 1,
        title: 'Inscrever-se',
        description: 'Preencher formulário de inscrição online',
        link: 'https://example.com/bootcamp',
        completed: false
      },
      {
        order: 2,
        title: 'Fazer teste lógico',
        description: 'Teste simples online de raciocínio lógico (não precisa saber programar)',
        completed: false
      },
      {
        order: 3,
        title: 'Entrevista',
        description: 'Bate-papo online para conhecer sua motivação',
        completed: false
      },
      {
        order: 4,
        title: 'Começar as aulas',
        description: 'Receber acesso à plataforma e iniciar o curso',
        completed: false
      }
    ],
    officialLink: 'https://example.com/bootcamp',

    deadline: new Date('2025-02-10'),
    hasDeadline: true,

    tags: ['tecnologia', 'programação', 'online', 'gratuito'],

    createdAt: new Date('2025-01-10'),
    featured: true,

    careerImpact: {
      title: 'Como isso vai transformar sua carreira',
      description: 'A área de tecnologia está em alta e falta profissional qualificado. Com formação em desenvolvimento, você pode mudar completamente de carreira e conquistar salários acima da média do mercado.',
      opportunities: [
        'Vagas de desenvolvedor júnior com salários de R$ 3.000 a R$ 5.000',
        'Trabalho remoto para empresas do Brasil inteiro ou do exterior',
        'Crescimento rápido: júnior → pleno → sênior em 3-5 anos',
        'Freelancer e projetos paralelos para renda extra',
        'Empreender criando seus próprios produtos digitais'
      ],
      differentials: [
        'Mudar de área mesmo sem formação universitária',
        'Portfólio de projetos reais para mostrar em entrevistas',
        'Habilidade técnica em alta demanda no mercado',
        'Possibilidade de trabalho remoto e flexível',
        'Área com mais vagas que profissionais qualificados'
      ]
    }
  },

  {
    id: 'obf-2025',
    title: 'Olimpíada Brasileira de Física',
    category: 'olimpiada',
    icon: '🔬',
    banner: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=400&fit=crop',
    shortDescription: 'Competição nacional de física para estudantes',
    fullDescription: 'A Olimpíada Brasileira de Física (OBF) é uma competição nacional voltada para estudantes do ensino médio e último ano do fundamental. Premia com medalhas e pode garantir vagas diretas em universidades.',

    modality: 'presencial',
    duration: { amount: 1, unit: 'dias' },
    cost: 'gratuito',

    requirements: [
      {
        type: 'idade',
        description: 'Até 19 anos',
        required: true,
        value: { max: 19 }
      },
      {
        type: 'escolaridade',
        description: '9º ano do fundamental ou ensino médio',
        required: true
      },
      {
        type: 'interesse',
        description: 'Interesse em física e ciências',
        required: true,
        value: ['ciências']
      }
    ],
    targetAudience: 'Estudantes do fundamental II e ensino médio interessados em física',

    benefits: [
      {
        icon: '🏅',
        title: 'Medalhas',
        description: 'Ouro, prata e bronze para os melhores colocados'
      },
      {
        icon: '🎓',
        title: 'Certificado',
        description: 'Certificação de participação válida para currículo'
      },
      {
        icon: '🌟',
        title: 'Seleção para IPhO',
        description: 'Chance de representar o Brasil na Olimpíada Internacional'
      },
      {
        icon: '🎯',
        title: 'Destaque no vestibular',
        description: 'Medalhas contam pontos em diversos vestibulares'
      }
    ],
    mainBenefit: 'Medalhas e reconhecimento nacional em física',

    steps: [
      {
        order: 1,
        title: 'Inscrever-se pela escola',
        description: 'Falar com o coordenador para fazer inscrição coletiva',
        completed: false
      },
      {
        order: 2,
        title: 'Estudar para a prova',
        description: 'Revisar conteúdos de física e resolver provas antigas',
        link: 'https://www.obf.org.br/',
        completed: false
      },
      {
        order: 3,
        title: 'Fazer a 1ª fase',
        description: 'Prova aplicada na própria escola',
        completed: false
      },
      {
        order: 4,
        title: 'Classificar para 2ª fase',
        description: 'Se classificar, fazer a prova final e aguardar resultado',
        completed: false
      }
    ],
    officialLink: 'https://www.obf.org.br/',

    deadline: new Date('2025-03-20'),
    hasDeadline: true,

    tags: ['olimpíada', 'física', 'ciências', 'medalha'],

    createdAt: new Date('2025-01-12'),
    featured: false,

    careerImpact: {
      title: 'Como isso vai transformar sua carreira',
      description: 'Medalhas em olimpíadas científicas são diferenciais importantes para universidades e empresas. Mostram que você tem capacidade analítica, dedicação e interesse genuíno pela ciência.',
      opportunities: [
        'Vagas diretas em universidades de ponta (USP, Unicamp, ITA)',
        'Bolsas de estudo para graduação baseadas em mérito',
        'Seleção para olimpíadas internacionais (experiência única)',
        'Destaque em processos seletivos de estágio e trainee',
        'Networking com outros medalhistas e professores renomados'
      ],
      differentials: [
        'Certificado oficial que valoriza muito seu currículo',
        'Demonstração de habilidade em física e ciências exatas',
        'Pontuação extra em vestibulares de universidades federais',
        'Diferencial em bolsas de iniciação científica',
        'Reconhecimento que abre portas em carreiras científicas e tecnológicas'
      ]
    }
  },

  {
    id: 'jovem-aprendiz-2025',
    title: 'Programa Jovem Aprendiz',
    category: 'estagio',
    icon: '👔',
    banner: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=400&fit=crop',
    shortDescription: 'Primeiro emprego com carteira assinada',
    fullDescription: 'O Programa Jovem Aprendiz é uma iniciativa que combina trabalho e educação, oferecendo a jovens a oportunidade de ingressar no mercado de trabalho com carteira assinada e capacitação profissional.',

    modality: 'hibrido',
    duration: { amount: 2, unit: 'anos' },
    cost: 'pago',

    requirements: [
      {
        type: 'idade',
        description: 'Entre 14 e 24 anos',
        required: true,
        value: { min: 14, max: 24 }
      },
      {
        type: 'escolaridade',
        description: 'Estar cursando ou ter concluído o ensino médio',
        required: true
      }
    ],
    targetAudience: 'Jovens em busca do primeiro emprego',

    benefits: [
      {
        icon: '💰',
        title: 'Salário mensal',
        description: 'Remuneração compatível com horas trabalhadas'
      },
      {
        icon: '📋',
        title: 'Carteira assinada',
        description: 'Todos os direitos trabalhistas garantidos'
      },
      {
        icon: '📚',
        title: 'Curso profissionalizante',
        description: 'Capacitação teórica e prática na área'
      },
      {
        icon: '🎯',
        title: 'Experiência profissional',
        description: 'Primeiro passo na carreira'
      }
    ],
    mainBenefit: 'Primeiro emprego com todos os direitos trabalhistas',

    steps: [
      {
        order: 1,
        title: 'Procurar vagas',
        description: 'Buscar em sites de emprego, CIEE, IEL ou direto nas empresas',
        link: 'https://www.ciee.org.br/',
        completed: false
      },
      {
        order: 2,
        title: 'Enviar currículo',
        description: 'Candidatar-se às vagas disponíveis',
        completed: false
      },
      {
        order: 3,
        title: 'Participar do processo seletivo',
        description: 'Entrevistas e dinâmicas de grupo',
        completed: false
      },
      {
        order: 4,
        title: 'Assinar contrato',
        description: 'Formalização e início das atividades',
        completed: false
      }
    ],
    officialLink: 'https://www.gov.br/trabalho-e-previdencia/pt-br/assuntos/aprendizagem',

    deadline: new Date('2025-12-31'),
    hasDeadline: false,

    tags: ['estágio', 'emprego', 'jovem-aprendiz', 'primeiro-emprego'],

    createdAt: new Date('2025-01-08'),
    featured: false,

    careerImpact: {
      title: 'Como isso vai transformar sua carreira',
      description: 'Ter carteira assinada cedo te dá vantagem competitiva enorme. Enquanto outros só começam a trabalhar aos 20-25 anos, você já terá anos de experiência profissional.',
      opportunities: [
        'Experiência profissional real que conta no currículo',
        'Possibilidade de efetivação na empresa após o programa',
        'Primeiro passo para cargos melhores na mesma área',
        'Networking profissional desde cedo',
        'Base para entender como funciona o mercado de trabalho'
      ],
      differentials: [
        'Carteira assinada - você já tem tempo de contribuição para aposentadoria',
        'Experiência prática que faculdade sozinha não dá',
        'Salário próprio - independência financeira desde jovem',
        'Aprendizado de soft skills: pontualidade, trabalho em equipe, responsabilidade',
        'Currículo com experiência enquanto colegas ainda não trabalharam'
      ]
    }
  },

  {
    id: 'pibic-cnpq-2025',
    title: 'PIBIC - Iniciação Científica CNPq',
    category: 'pesquisa',
    icon: '🧪',
    banner: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=400&fit=crop',
    shortDescription: 'Bolsa de pesquisa científica para graduandos',
    fullDescription: 'O Programa Institucional de Bolsas de Iniciação Científica (PIBIC) é voltado para o desenvolvimento científico de estudantes de graduação, oferecendo bolsa mensal e orientação de pesquisadores experientes.',

    modality: 'presencial',
    duration: { amount: 12, unit: 'meses' },
    cost: 'bolsa-integral',

    requirements: [
      {
        type: 'escolaridade',
        description: 'Estar cursando graduação',
        required: true
      },
      {
        type: 'interesse',
        description: 'Interesse em pesquisa científica',
        required: true,
        value: ['ciências', 'tecnologia']
      },
      {
        type: 'outro',
        description: 'Disponibilidade de 20h semanais',
        required: true
      },
      {
        type: 'outro',
        description: 'Bom desempenho acadêmico',
        required: true
      }
    ],
    targetAudience: 'Universitários interessados em pesquisa e carreira acadêmica',

    benefits: [
      {
        icon: '💵',
        title: 'Bolsa mensal',
        description: 'R$ 700 mensais durante 12 meses'
      },
      {
        icon: '🔬',
        title: 'Experiência em pesquisa',
        description: 'Trabalho em laboratório com orientação especializada'
      },
      {
        icon: '📄',
        title: 'Publicações científicas',
        description: 'Oportunidade de publicar artigos'
      },
      {
        icon: '🎓',
        title: 'Preparação para pós',
        description: 'Base sólida para mestrado e doutorado'
      }
    ],
    mainBenefit: 'Bolsa de R$ 700/mês para fazer pesquisa científica',

    steps: [
      {
        order: 1,
        title: 'Encontrar um orientador',
        description: 'Procurar professor na sua área de interesse',
        completed: false
      },
      {
        order: 2,
        title: 'Elaborar projeto',
        description: 'Trabalhar com orientador na proposta de pesquisa',
        completed: false
      },
      {
        order: 3,
        title: 'Submeter candidatura',
        description: 'Enviar projeto no período de inscrições da universidade',
        link: 'https://www.gov.br/cnpq/',
        completed: false
      },
      {
        order: 4,
        title: 'Aguardar seleção',
        description: 'Projetos são avaliados por comitê científico',
        completed: false
      }
    ],
    officialLink: 'https://www.gov.br/cnpq/',

    deadline: new Date('2025-04-30'),
    hasDeadline: true,

    tags: ['pesquisa', 'ciência', 'bolsa', 'graduação', 'cnpq'],

    createdAt: new Date('2025-01-15'),
    featured: false,

    careerImpact: {
      title: 'Como isso vai transformar sua carreira',
      description: 'Iniciação científica é o primeiro passo para quem quer seguir carreira acadêmica ou trabalhar com inovação. Diferencial enorme para mestrado, doutorado e empresas de tecnologia.',
      opportunities: [
        'Base sólida para mestrado e doutorado com bolsa',
        'Carreira acadêmica como professor/pesquisador universitário',
        'Trabalho em centros de P&D de grandes empresas',
        'Vagas em startups de deep tech e inovação',
        'Publicações científicas que valorizam muito o currículo'
      ],
      differentials: [
        'Experiência em pesquisa científica - raro em graduandos',
        'Bolsa mensal enquanto desenvolve habilidades únicas',
        'Networking com professores e pesquisadores renomados',
        'Aprendizado de metodologia científica e pensamento crítico',
        'Diferencial competitivo para programas de pós-graduação de prestígio'
      ]
    }
  },

  {
    id: 'duolingo-english-2025',
    title: 'Duolingo English Test - Certificação',
    category: 'idioma',
    icon: '🌎',
    banner: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=400&fit=crop',
    shortDescription: 'Teste de inglês online reconhecido internacionalmente',
    fullDescription: 'O Duolingo English Test é um teste de proficiência em inglês online, aceito por milhares de universidades ao redor do mundo. Mais acessível e conveniente que TOEFL e IELTS.',

    modality: 'online',
    duration: { amount: 1, unit: 'horas' },
    cost: 'pago',

    requirements: [
      {
        type: 'idade',
        description: 'A partir de 13 anos',
        required: true,
        value: { min: 13 }
      },
      {
        type: 'interesse',
        description: 'Interesse em comprovar proficiência em inglês',
        required: true,
        value: ['idiomas']
      },
      {
        type: 'outro',
        description: 'Computador com webcam e internet estável',
        required: true
      }
    ],
    targetAudience: 'Estudantes que precisam de certificado de inglês para intercâmbio ou universidades',

    benefits: [
      {
        icon: '💲',
        title: 'Mais barato',
        description: 'Custa US$ 59, muito menos que TOEFL (US$ 200+)'
      },
      {
        icon: '⚡',
        title: 'Resultado rápido',
        description: 'Resultado em até 48 horas'
      },
      {
        icon: '🏠',
        title: 'Faça de casa',
        description: 'Teste 100% online, quando e onde quiser'
      },
      {
        icon: '🌍',
        title: 'Aceito mundialmente',
        description: 'Reconhecido por mais de 4.000 instituições'
      }
    ],
    mainBenefit: 'Certificação de inglês rápida, barata e aceita internacionalmente',

    steps: [
      {
        order: 1,
        title: 'Criar conta',
        description: 'Cadastrar-se no site do Duolingo English Test',
        link: 'https://englishtest.duolingo.com/',
        completed: false
      },
      {
        order: 2,
        title: 'Fazer teste prático',
        description: 'Teste gratuito para conhecer o formato',
        completed: false
      },
      {
        order: 3,
        title: 'Agendar e pagar',
        description: 'Escolher data/hora e pagar US$ 59',
        completed: false
      },
      {
        order: 4,
        title: 'Realizar teste',
        description: 'Duração de 1 hora, com monitoramento online',
        completed: false
      }
    ],
    officialLink: 'https://englishtest.duolingo.com/',

    deadline: new Date('2025-12-31'),
    hasDeadline: false,

    tags: ['inglês', 'certificação', 'idioma', 'online'],

    createdAt: new Date('2025-01-18'),
    featured: false,

    careerImpact: {
      title: 'Como isso vai transformar sua carreira',
      description: 'Inglês fluente não é mais diferencial, é requisito mínimo para cargos bons. Ter certificação internacional abre portas para oportunidades globais que pagam em dólar.',
      opportunities: [
        'Intercâmbios e bolsas em universidades estrangeiras',
        'Vagas em empresas multinacionais no Brasil',
        'Trabalho remoto para empresas dos EUA/Europa (salários 3-5x maiores)',
        'Programas de pós-graduação no exterior',
        'Migração profissional para outros países'
      ],
      differentials: [
        'Certificado aceito por 4.000+ universidades no mundo todo',
        'Comprovação oficial de proficiência em inglês',
        'Vantagem em processos seletivos que exigem inglês',
        'Acesso a conteúdos, cursos e oportunidades internacionais',
        'Preparação para trabalhar em ambientes globais'
      ]
    }
  },

  {
    id: 'startup-brasil-2025',
    title: 'Startup Brasil - Aceleração',
    category: 'empreendedorismo',
    icon: '🚀',
    banner: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=400&fit=crop',
    shortDescription: 'Programa de aceleração para startups iniciantes',
    fullDescription: 'O Programa Startup Brasil oferece mentorias, investimento e networking para startups em estágio inicial. Conecta empreendedores com aceleradoras, investidores e grandes empresas.',

    modality: 'hibrido',
    duration: { amount: 6, unit: 'meses' },
    cost: 'gratuito',

    requirements: [
      {
        type: 'idade',
        description: 'Maior de 18 anos',
        required: true,
        value: { min: 18 }
      },
      {
        type: 'outro',
        description: 'Ter uma startup ou ideia de negócio validada',
        required: true
      },
      {
        type: 'interesse',
        description: 'Interesse em empreendedorismo e inovação',
        required: true,
        value: ['tecnologia']
      }
    ],
    targetAudience: 'Empreendedores com startups em estágio inicial',

    benefits: [
      {
        icon: '💰',
        title: 'Investimento',
        description: 'Até R$ 200 mil em aporte não reembolsável'
      },
      {
        icon: '🎓',
        title: 'Mentoria especializada',
        description: 'Acompanhamento de empreendedores experientes'
      },
      {
        icon: '🤝',
        title: 'Networking',
        description: 'Conexão com investidores e grandes empresas'
      },
      {
        icon: '📈',
        title: 'Infraestrutura',
        description: 'Espaço de coworking e ferramentas'
      }
    ],
    mainBenefit: 'Aceleração completa com investimento de até R$ 200 mil',

    steps: [
      {
        order: 1,
        title: 'Preparar pitch deck',
        description: 'Apresentação da startup e modelo de negócio',
        completed: false
      },
      {
        order: 2,
        title: 'Inscrever-se',
        description: 'Enviar candidatura no site do programa',
        link: 'https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/transformacaodigital/startupbrasil',
        completed: false
      },
      {
        order: 3,
        title: 'Seleção',
        description: 'Apresentação para banca avaliadora',
        completed: false
      },
      {
        order: 4,
        title: 'Participar da aceleração',
        description: '6 meses de programa intensivo',
        completed: false
      }
    ],
    officialLink: 'https://www.gov.br/mcti/pt-br/acompanhe-o-mcti/transformacaodigital/startupbrasil',

    deadline: new Date('2025-05-15'),
    hasDeadline: true,

    tags: ['startup', 'empreendedorismo', 'aceleração', 'investimento'],

    createdAt: new Date('2025-01-20'),
    featured: true,

    careerImpact: {
      title: 'Como isso vai transformar sua carreira',
      description: 'Empreender é a forma mais direta de criar riqueza e impacto. Com aceleração profissional, você diminui drasticamente as chances de falha e acelera o crescimento do seu negócio.',
      opportunities: [
        'Transformar sua ideia em negócio real com faturamento',
        'Networking com investidores que podem aportar milhões',
        'Conexões com grandes empresas para parcerias estratégicas',
        'Possibilidade de escalar e criar uma empresa de tecnologia de sucesso',
        'Experiência de empreendedorismo valorizada até se voltar ao mercado corporativo'
      ],
      differentials: [
        'Investimento não reembolsável de até R$ 200 mil - dinheiro de verdade para crescer',
        'Mentoria de empreendedores que já construíram empresas de sucesso',
        'Validação profissional da sua ideia de negócio',
        'Acesso a recursos e ferramentas que normalmente custariam muito caro',
        'Credibilidade no mercado - startups aceleradas têm muito mais valor'
      ]
    }
  },

  {
    id: 'pos-usp-2025',
    title: 'Mestrado USP - Bolsa CAPES',
    category: 'pos',
    icon: '🎓',
    banner: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=400&fit=crop',
    shortDescription: 'Mestrado com bolsa integral em universidade pública',
    fullDescription: 'Programas de pós-graduação (mestrado) da Universidade de São Paulo com bolsas CAPES. Oportunidade de se especializar em diversas áreas com bolsa mensal e dedicação exclusiva aos estudos.',

    modality: 'presencial',
    duration: { amount: 2, unit: 'anos' },
    cost: 'bolsa-integral',

    requirements: [
      {
        type: 'escolaridade',
        description: 'Graduação completa',
        required: true
      },
      {
        type: 'outro',
        description: 'Projeto de pesquisa aprovado por um orientador',
        required: true
      },
      {
        type: 'outro',
        description: 'Aprovação em processo seletivo específico do programa',
        required: true
      }
    ],
    targetAudience: 'Graduados interessados em aprofundar conhecimento e seguir carreira acadêmica',

    benefits: [
      {
        icon: '💵',
        title: 'Bolsa CAPES',
        description: 'R$ 2.100 mensais durante 24 meses'
      },
      {
        icon: '🏛️',
        title: 'USP',
        description: 'Melhor universidade da América Latina'
      },
      {
        icon: '📚',
        title: 'Dedicação exclusiva',
        description: 'Foco total nos estudos e pesquisa'
      },
      {
        icon: '🌟',
        title: 'Título de Mestre',
        description: 'Reconhecimento nacional e internacional'
      }
    ],
    mainBenefit: 'Mestrado gratuito com bolsa de R$ 2.100/mês',

    steps: [
      {
        order: 1,
        title: 'Escolher programa',
        description: 'Pesquisar programas de pós na sua área de interesse',
        link: 'https://www.usp.br/pos-graduacao/',
        completed: false
      },
      {
        order: 2,
        title: 'Contatar orientador',
        description: 'Conversar com professor sobre projeto de pesquisa',
        completed: false
      },
      {
        order: 3,
        title: 'Preparar documentação',
        description: 'Projeto, histórico, cartas de recomendação',
        completed: false
      },
      {
        order: 4,
        title: 'Processo seletivo',
        description: 'Prova, entrevista e análise de currículo',
        completed: false
      }
    ],
    officialLink: 'https://www.usp.br/pos-graduacao/',

    deadline: new Date('2025-06-30'),
    hasDeadline: true,

    tags: ['mestrado', 'pós-graduação', 'bolsa', 'usp', 'capes'],

    createdAt: new Date('2025-01-22'),
    featured: false,

    careerImpact: {
      title: 'Como isso vai transformar sua carreira',
      description: 'Mestrado é o passaporte para cargos de alto nível técnico e carreira acadêmica. Na USP, melhor universidade da América Latina, você terá formação de elite com bolsa.',
      opportunities: [
        'Carreira acadêmica como professor universitário (concursos exigem mestrado)',
        'Cargos de pesquisador em institutos e centros de P&D',
        'Posições sênior em empresas de tecnologia e inovação',
        'Consultoria especializada com cachês elevados',
        'Doutorado no Brasil ou exterior com bolsas melhores'
      ],
      differentials: [
        'Título de Mestre pela USP - reconhecimento internacional',
        'Bolsa CAPES de R$ 2.100/mês para se dedicar 100% aos estudos',
        'Expertise profunda em sua área de especialização',
        'Publicações científicas que te tornam referência',
        'Salários 40-60% maiores comparado a quem tem só graduação'
      ]
    }
  }
]

/**
 * Função helper para buscar oportunidade por ID
 */
export function getOpportunityById(id: string): OpportunityDetail | undefined {
  return opportunitiesData.find(opp => opp.id === id)
}

/**
 * Função helper para filtrar oportunidades por categoria
 */
export function getOpportunitiesByCategory(category: OpportunityCategory): OpportunityDetail[] {
  return opportunitiesData.filter(opp => opp.category === category)
}

/**
 * Função helper para buscar oportunidades em destaque
 */
export function getFeaturedOpportunities(): OpportunityDetail[] {
  return opportunitiesData.filter(opp => opp.featured === true)
}
