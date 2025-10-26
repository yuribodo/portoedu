import OpenAI from 'openai'
import { env } from '../config/env.js'
import type { UserProfile } from '../types/opportunity.js'

/**
 * Cliente OpenAI configurado
 */
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
})

/**
 * Mensagem do chat (formato OpenAI)
 */
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

/**
 * Contexto de uma oportunidade específica
 */
export interface OpportunityContext {
  id: string
  title: string
  category: string
  shortDescription: string
  fullDescription: string
  requirements: Array<{
    type: string
    description: string
    required: boolean
  }>
  benefits: Array<{
    icon: string
    title: string
    description: string
  }>
  steps: Array<{
    order: number
    title: string
    description: string
  }>
  deadline?: string
  hasDeadline: boolean
  mainBenefit: string
  officialLink: string
  targetAudience: string
}

/**
 * Request do chat
 */
export interface ChatRequest {
  message: string
  conversationHistory?: ChatMessage[]
  userProfile?: UserProfile
  opportunityContext?: OpportunityContext
}

/**
 * Response do chat
 */
export interface ChatResponse {
  message: string
  suggestedActions?: Array<{
    type: string
    label: string
  }>
}

/**
 * Cria o system prompt da Porti baseado no perfil do usuário e contexto da oportunidade
 */
function createSystemPrompt(userProfile?: UserProfile, opportunityContext?: OpportunityContext): string {
  const profileContext = userProfile
    ? `
Contexto do usuário:
- Idade: ${userProfile.idade || 'não informada'}
- Escola pública: ${userProfile.escolaPublica ? 'Sim' : userProfile.escolaPublica === false ? 'Não' : 'não informado'}
- Interesses: ${userProfile.interesses?.join(', ') || 'não informados'}
`
    : 'O usuário ainda não forneceu informações de perfil.'

  const opportunityInfo = opportunityContext
    ? `

CONTEXTO DA OPORTUNIDADE ATUAL:
Você está ajudando o usuário a entender melhor a seguinte oportunidade:

📋 INFORMAÇÕES BÁSICAS:
- Título: ${opportunityContext.title}
- Categoria: ${opportunityContext.category}
- Descrição: ${opportunityContext.shortDescription}
- Público-alvo: ${opportunityContext.targetAudience}

💰 BENEFÍCIO PRINCIPAL:
${opportunityContext.mainBenefit}

📝 REQUISITOS:
${opportunityContext.requirements.map((req, i) => `${i + 1}. ${req.description}${req.required ? ' (OBRIGATÓRIO)' : ' (opcional)'}`).join('\n')}

🎁 BENEFÍCIOS:
${opportunityContext.benefits.map((b, i) => `${i + 1}. ${b.title}: ${b.description}`).join('\n')}

📋 PASSOS PARA PARTICIPAR:
${opportunityContext.steps.slice(0, 5).map((s) => `${s.order}. ${s.title}: ${s.description}`).join('\n')}

⏰ PRAZO:
${opportunityContext.hasDeadline && opportunityContext.deadline
  ? `Inscrições até ${opportunityContext.deadline}`
  : 'Inscrições abertas o ano todo'}

🔗 Site oficial: ${opportunityContext.officialLink}

INSTRUÇÕES ESPECIAIS PARA CHAT CONTEXTUAL:
- Responda perguntas ESPECÍFICAS sobre esta oportunidade
- Use as informações acima para dar respostas precisas e úteis
- Se o usuário perguntar sobre requisitos, cite os requisitos reais da oportunidade
- Se perguntar sobre prazos, use a data real do deadline
- Se perguntar como participar, cite os passos específicos
- Seja específica e evite respostas genéricas
- Incentive o usuário a se inscrever se ele atender aos requisitos
- Se ele NÃO atender a um requisito obrigatório, seja honesta mas gentil
`
    : ''

  return `Você é a Porti, uma capivara estudiosa e gentil que ajuda jovens brasileiros a descobrir oportunidades educacionais e benefícios sociais.

PERSONALIDADE:
- Amigável, paciente e encorajadora (estilo Duolingo)
- Usa linguagem casual mas respeitosa
- Empática com desafios de jovens de baixa renda
- Celebra pequenas conquistas
- Nunca julga, sempre apoia

OBJETIVO:
Ajudar o usuário a:
1. Entender seu perfil (idade, escola, interesses, situação financeira)
2. Descobrir oportunidades educacionais (bolsas, cursos, intercâmbios, etc)
3. Entender os passos práticos para aproveitar cada oportunidade
4. Sentir-se motivado e capaz de alcançar seus objetivos

ESTILO DE COMUNICAÇÃO:
- Frases curtas e objetivas
- Perguntas diretas (uma de cada vez)
- Use emojis com moderação (1-2 por mensagem)
- Evite jargões complicados
- Explique siglas quando necessário (ex: "ENEM (Exame Nacional do Ensino Médio)")

IMPORTANTE:
- Sempre baseie recomendações no perfil real do usuário
- Seja honesta sobre requisitos e chances realistas
- Incentive mas não crie falsas expectativas
- Sugira próximos passos concretos e acionáveis
- Se não souber a resposta, seja honesta e oriente o usuário a buscar fontes oficiais

${profileContext}
${opportunityInfo}

Converse de forma natural e acolhedora. Seu objetivo é fazer o usuário se sentir apoiado e confiante!`
}

/**
 * Envia mensagem para o chat da Porti
 */
export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  try {
    const systemPrompt = createSystemPrompt(request.userProfile, request.opportunityContext)

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...(request.conversationHistory || []),
      { role: 'user', content: request.message },
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Modelo mais barato e rápido para o hackathon
      messages: messages as any,
      temperature: 0.8, // Mais criativa e conversacional
      max_tokens: 400, // Respostas concisas
      presence_penalty: 0.6, // Evita repetição
      frequency_penalty: 0.3,
    })

    const assistantMessage = completion.choices[0]?.message?.content ||
      'Desculpe, não consegui processar sua mensagem. Pode tentar novamente? 😅'

    // TODO: Implementar lógica para detectar ações sugeridas no futuro
    // Por enquanto, retorna apenas a mensagem
    return {
      message: assistantMessage,
      suggestedActions: [],
    }
  } catch (error) {
    console.error('Erro ao chamar OpenAI:', error)

    // Tratamento de erros específicos
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        throw new Error('API Key da OpenAI inválida. Verifique suas credenciais.')
      }
      if (error.status === 429) {
        throw new Error('Limite de requisições atingido. Tente novamente em alguns segundos.')
      }
      if (error.status === 500) {
        throw new Error('Erro no servidor da OpenAI. Tente novamente mais tarde.')
      }
    }

    throw new Error('Erro ao processar mensagem. Tente novamente.')
  }
}

/**
 * Valida se a API Key está configurada
 */
export function validateOpenAIKey(): boolean {
  return !!env.OPENAI_API_KEY && env.OPENAI_API_KEY.length > 0
}

// ============= RECOMENDAÇÕES =============

/**
 * Tipo simplificado de oportunidade para contexto da IA
 */
interface OpportunityForAI {
  id: string
  title: string
  category: string
  icon: string
  shortDescription: string
  deadline?: Date
}

/**
 * Gera mensagem amigável de boas-vindas citando top oportunidades
 *
 * Esta função é chamada APENAS UMA VEZ após o usuário completar o form.
 * Ela gera a mensagem final que a Porti envia citando as melhores oportunidades.
 */
export async function generateWelcomeSummary(
  userProfile: UserProfile,
  topOpportunities: OpportunityForAI[],
  totalOpportunities: number
): Promise<string> {
  try {
    const opportunitiesContext = topOpportunities
      .map((opp, index) =>
        `${index + 1}. ${opp.icon} ${opp.title} - ${opp.shortDescription}`
      )
      .join('\n')

    const prompt = `
Você é a Porti, uma capivara gentil e encorajadora que ajuda jovens a descobrir oportunidades educacionais.

PERFIL DO USUÁRIO:
- Idade: ${userProfile.idade || 'não informada'}
- Escola pública: ${userProfile.escolaPublica ? 'Sim' : 'Não'}
- Interesses: ${userProfile.interesses?.join(', ') || 'não informados'}

CONTEXTO:
Você acabou de conhecer este jovem através de um formulário gamificado (chat).
Encontrou ${totalOpportunities} oportunidades compatíveis com o perfil dele.

AS TOP ${topOpportunities.length} OPORTUNIDADES SÃO:
${opportunitiesContext}

SUA TAREFA:
Escrever uma mensagem CURTA e amigável (máximo 3-4 linhas + lista) que:
1. Saudação rápida e direta
2. Liste as top ${topOpportunities.length} oportunidades com descrição BREVE (1 linha por item)
3. Mencione o total (${totalOpportunities} oportunidades)
4. Call-to-action simples

ESTILO:
- SEJA BREVE! Usuário não vai ler texto longo
- Linguagem casual e amigável
- Use 1-2 emojis no máximo
- Cada descrição deve ter NO MÁXIMO 5-7 palavras
- Vá direto ao ponto

FORMATAÇÃO - IMPORTANTE:
- Use **negrito** para nomes de oportunidades
- Use listas numeradas: "1. **Nome** - descrição breve"
- MÁXIMO 1 linha de introdução
- MÁXIMO 1 linha de encerramento
- Exemplo de formato ideal:

Achei ${totalOpportunities} oportunidades pra você! 🎯

1. **Bolsa ENEM 2024** - Bolsa integral pra faculdade
2. **Google Ateliê** - Curso gratuito de tecnologia
3. **Hackathon Porto** - Competição de programação

Clique abaixo pra explorar todas!

Escreva APENAS a mensagem, sem introduções ou meta-comentários.
`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é a Porti, uma assistente educacional gentil e motivadora. Escreva mensagens CURTAS, objetivas e amigáveis.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7, // Menos criativa = mais concisa
      max_tokens: 350, // Espaço para descrições breves
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    })

    const message = completion.choices[0]?.message?.content?.trim() ||
      `Achei ${totalOpportunities} oportunidades pra você! 🎯\n\n${topOpportunities.map((o, i) => `${i + 1}. **${o.title}** - ${o.shortDescription}`).join('\n')}\n\nClique abaixo pra explorar todas!`

    return message
  } catch (error) {
    console.error('Erro ao gerar mensagem de boas-vindas:', error)

    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        throw new Error('API Key da OpenAI inválida.')
      }
      if (error.status === 429) {
        throw new Error('Limite de requisições atingido.')
      }
    }

    throw new Error('Erro ao gerar mensagem de boas-vindas.')
  }
}
