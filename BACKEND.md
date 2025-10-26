# Backend PortoEdu - Especificação de Endpoints (MVP Hackathon)

## 🎯 Visão Geral

Backend minimalista focado no essencial para o hackathon. Prioriza a experiência com IA (OpenAI) e recomendações personalizadas.

**Stack Sugerida**: Node.js + Express + OpenAI SDK
**Banco de Dados**: Não necessário inicialmente (pode usar JSON files ou localStorage do frontend)

---

## 🚀 Endpoints Essenciais

### 1. Chat com IA (ESSENCIAL) 🤖

**Endpoint**: `POST /api/chat`

**Descrição**: Conversa com a Porti (assistente IA) usando OpenAI. Substitui o fluxo hardcoded atual por conversação natural.

**Request Body**:
```json
{
  "message": "Tenho 17 anos e gosto de tecnologia",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Oi!"
    },
    {
      "role": "assistant",
      "content": "Oi! Eu sou a Porti..."
    }
  ],
  "userProfile": {
    "idade": 17,
    "escolaPublica": true,
    "interesses": ["Tecnologia"]
  }
}
```

**Response**:
```json
{
  "message": "Que legal! Com 17 anos e interesse em tecnologia, você tem várias oportunidades...",
  "suggestedActions": [
    {
      "type": "view_opportunities",
      "label": "Ver oportunidades em Tecnologia"
    }
  ]
}
```

**Integração OpenAI**:
```javascript
// Pseudocódigo
const response = await openai.chat.completions.create({
  model: "gpt-4o-mini", // modelo barato para hackathon
  messages: [
    {
      role: "system",
      content: `Você é a Porti, uma capivara estudiosa e gentil que ajuda jovens brasileiros a descobrir oportunidades educacionais.

      Seu objetivo é:
      - Conhecer o perfil do usuário (idade, escola pública/privada, interesses)
      - Recomendar oportunidades compatíveis
      - Ser empática, encorajadora e didática

      Contexto do usuário: ${JSON.stringify(userProfile)}

      Fale de forma casual e amigável, como uma amiga que quer ajudar.`
    },
    ...conversationHistory,
    {
      role: "user",
      content: message
    }
  ],
  temperature: 0.8,
  max_tokens: 300
});
```

**Prioridade**: ⭐⭐⭐ CRÍTICO
**Tempo estimado**: 2-3 horas

---

### 2. Recomendações Personalizadas (ESSENCIAL) 🎯

**Endpoint**: `POST /api/recommendations`

**Descrição**: Usa IA para analisar o perfil do usuário e recomendar as melhores oportunidades, com explicações personalizadas.

**Request Body**:
```json
{
  "userProfile": {
    "idade": 17,
    "escolaPublica": true,
    "interesses": ["Tecnologia", "Idiomas"],
    "renda": "baixa"
  }
}
```

**Response**:
```json
{
  "recommendations": [
    {
      "opportunityId": "prouni-2025",
      "matchScore": 95,
      "reason": "Você se encaixa perfeitamente no ProUni! Como estuda em escola pública e tem até 17 anos, você pode se preparar para o ENEM e concorrer a uma bolsa integral. É a sua melhor chance de fazer faculdade de graça!",
      "nextSteps": [
        "Fazer o ENEM em novembro",
        "Estudar para conseguir média acima de 450 pontos"
      ]
    },
    {
      "opportunityId": "bootcamp-tech-2025",
      "matchScore": 90,
      "reason": "Seu interesse em Tecnologia combina muito com esse bootcamp gratuito! Em 3 meses você aprende programação do zero e pode começar a ganhar dinheiro nessa área que está super em alta.",
      "nextSteps": [
        "Inscrever-se no site do bootcamp",
        "Fazer o teste lógico online"
      ]
    }
  ],
  "summary": "Encontrei 8 oportunidades para você! As 2 principais são ProUni (para fazer faculdade) e o Bootcamp de Tecnologia (para aprender a programar). Ambas são 100% gratuitas e perfeitas para quem estuda em escola pública. Quer saber mais sobre alguma?"
}
```

**Integração OpenAI**:
```javascript
// Pseudocódigo - Abordagem híbrida (mais eficiente)

// 1. Primeiro, filtra oportunidades por critérios básicos (idade, escola, etc)
const eligibleOpportunities = filterOpportunitiesByProfile(userProfile);

// 2. Depois, usa IA para ranquear e explicar
const prompt = `
Dado o perfil do usuário:
- Idade: ${userProfile.idade}
- Escola pública: ${userProfile.escolaPublica}
- Interesses: ${userProfile.interesses.join(', ')}

E essas oportunidades elegíveis:
${JSON.stringify(eligibleOpportunities)}

Sua tarefa:
1. Ranquear as TOP 5 oportunidades para esse usuário
2. Para cada uma, explicar em 1-2 frases POR QUE ela é boa para o perfil
3. Sugerir próximos passos práticos
4. Criar um resumo geral encorajador

Seja casual, empática e motivadora. Fale como a Porti (capivara amiga).
`;

const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    { role: "system", content: "Você é a Porti, assistente educacional." },
    { role: "user", content: prompt }
  ],
  response_format: { type: "json_object" } // força resposta em JSON
});
```

**Prioridade**: ⭐⭐⭐ CRÍTICO
**Tempo estimado**: 3-4 horas

---

### 3. Oportunidades (PODE SER ESTÁTICO) 📚

**Endpoints**:

#### 3.1 Listar Oportunidades
`GET /api/opportunities`

**Query Parameters**:
- `category` (opcional): bolsa, curso, intercambio, etc.
- `featured` (opcional): true/false

**Response**:
```json
{
  "opportunities": [
    {
      "id": "prouni-2025",
      "title": "ProUni 2025 - Bolsa Integral",
      "category": "bolsa",
      "shortDescription": "Bolsa integral para graduação...",
      "icon": "🎓",
      "featured": true,
      "deadline": "2025-02-15",
      "tags": ["graduação", "universidade", "bolsa-integral"]
    }
  ],
  "total": 12
}
```

#### 3.2 Detalhes de Oportunidade
`GET /api/opportunities/:id`

**Response**: Retorna o objeto completo da oportunidade (igual ao que está em `opportunitiesDetailed.ts`)

**Implementação para Hackathon**:
```javascript
// Pode simplesmente servir os dados que já existem no frontend!
// Copiar o arquivo opportunitiesDetailed.ts para o backend

import { opportunitiesData } from './data/opportunitiesDetailed';

app.get('/api/opportunities', (req, res) => {
  const { category, featured } = req.query;

  let filtered = opportunitiesData;

  if (category) {
    filtered = filtered.filter(opp => opp.category === category);
  }

  if (featured === 'true') {
    filtered = filtered.filter(opp => opp.featured === true);
  }

  res.json({ opportunities: filtered, total: filtered.length });
});

app.get('/api/opportunities/:id', (req, res) => {
  const opportunity = opportunitiesData.find(opp => opp.id === req.params.id);

  if (!opportunity) {
    return res.status(404).json({ error: 'Oportunidade não encontrada' });
  }

  res.json(opportunity);
});
```

**Prioridade**: ⭐⭐ MÉDIA (pode usar dados do frontend diretamente)
**Tempo estimado**: 1 hora

---

### 4. Análise de Compatibilidade (OPCIONAL) 🎯

**Endpoint**: `POST /api/opportunities/:id/compatibility`

**Descrição**: Calcula % de compatibilidade entre perfil do usuário e uma oportunidade específica.

**Request Body**:
```json
{
  "userProfile": {
    "idade": 17,
    "escolaPublica": true,
    "interesses": ["Tecnologia"]
  }
}
```

**Response**:
```json
{
  "opportunityId": "prouni-2025",
  "matchScore": 95,
  "matchedRequirements": [
    {
      "requirement": "Idade mínima de 14 anos",
      "status": "matched",
      "icon": "✅"
    },
    {
      "requirement": "Estudar em escola pública",
      "status": "matched",
      "icon": "✅"
    },
    {
      "requirement": "Renda familiar per capita até 1,5 SM",
      "status": "pending",
      "icon": "⏳",
      "message": "Precisamos confirmar sua renda familiar"
    }
  ],
  "missingRequirements": [
    "Ter feito ENEM com nota mínima 450"
  ],
  "aiInsight": "Você está MUITO perto de ser elegível para o ProUni! Só precisa fazer o ENEM e tirar pelo menos 450 pontos. Com dedicação, você consegue! 💪"
}
```

**Prioridade**: ⭐ BAIXA (legal de ter, mas não essencial)
**Tempo estimado**: 2 horas

---

## 🔑 Variáveis de Ambiente

Criar arquivo `.env`:

```bash
# OpenAI
OPENAI_API_KEY=sk-...

# Server
PORT=3000
NODE_ENV=development

# CORS (permitir frontend)
FRONTEND_URL=http://localhost:5173

# Rate limiting (proteção básica)
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000
```

---

## 📦 Estrutura de Pastas Sugerida

```
backend/
├── src/
│   ├── routes/
│   │   ├── chat.js          # POST /api/chat
│   │   ├── recommendations.js # POST /api/recommendations
│   │   └── opportunities.js  # GET /api/opportunities/*
│   ├── services/
│   │   ├── openai.js        # Lógica de integração OpenAI
│   │   └── matcher.js       # Lógica de matching profile x opportunity
│   ├── data/
│   │   └── opportunities.js # Dados das oportunidades (copiar do frontend)
│   └── index.js             # Entry point
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Ordem de Implementação (Priorizada)

### Fase 1: MVP Básico (4-5 horas)
1. ✅ Setup do projeto (Express + OpenAI SDK)
2. ✅ Endpoint `/api/chat` com OpenAI
3. ✅ Endpoint `/api/opportunities` (servindo dados estáticos)
4. ✅ CORS configurado para frontend

**Resultado**: Chat funcional com IA + lista de oportunidades

### Fase 2: Inteligência (3-4 horas)
5. ✅ Endpoint `/api/recommendations` com IA
6. ✅ Melhorar prompts da OpenAI
7. ✅ Testar diferentes perfis

**Resultado**: Recomendações personalizadas funcionando

### Fase 3: Polimento (2-3 horas - SE DER TEMPO)
8. ⏸️ Endpoint de compatibilidade
9. ⏸️ Rate limiting
10. ⏸️ Tratamento de erros robusto
11. ⏸️ Logs

---

## 🎨 Exemplo de Prompts OpenAI

### System Prompt para Chat (Porti)
```
Você é a Porti, uma capivara estudiosa que ajuda jovens brasileiros a descobrir oportunidades educacionais e benefícios sociais.

PERSONALIDADE:
- Amigável, paciente e encorajadora (tipo Duolingo)
- Usa linguagem casual mas respeitosa
- Empática com desafios de jovens de baixa renda
- Celebra pequenas conquistas
- Nunca julga, sempre apoia

OBJETIVO:
Ajudar o usuário a:
1. Entender seu perfil (idade, escola, interesses, situação financeira)
2. Descobrir oportunidades que ele nem sabia que existiam
3. Entender os passos práticos para aproveitar cada oportunidade
4. Sentir-se motivado e capaz de alcançar seus objetivos

ESTILO:
- Frases curtas e objetivas
- Perguntas diretas (uma de cada vez)
- Use emojis com moderação (1-2 por mensagem)
- Evite jargões complicados
- Explique siglas (ex: "ENEM (Exame Nacional do Ensino Médio)")

IMPORTANTE:
- Sempre baseie suas recomendações no perfil real do usuário
- Seja honesta sobre requisitos e chances realistas
- Incentive mas não crie falsas expectativas
- Sugira próximos passos concretos e acionáveis
```

### Prompt para Recomendações
```
Você é um assistente especializado em conectar jovens brasileiros com oportunidades educacionais.

Tarefa:
Dado o perfil do usuário e uma lista de oportunidades, ranquear as TOP 5 que melhor se encaixam e explicar o porquê de forma motivadora.

Critérios de ranking:
1. Elegibilidade: usuário atende aos requisitos?
2. Alinhamento com interesses
3. Impacto na carreira
4. Facilidade de acesso
5. Prazo (oportunidades com deadline próximo têm prioridade)

Para cada recomendação, forneça:
- Score de 0-100 (quão bem o usuário se encaixa)
- Explicação em 1-2 frases do POR QUÊ é boa para ele
- 2-3 próximos passos práticos

Seja encorajadora e específica. Mostre como a oportunidade resolve problemas reais do usuário.

Formato de resposta: JSON
```

---

## 🔒 Segurança Básica (Hackathon)

```javascript
// Rate limiting simples
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por IP
  message: 'Muitas requisições, tente novamente em 15 minutos'
});

app.use('/api/', limiter);

// CORS
const cors = require('cors');
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

// Validação básica de inputs
const { body, validationResult } = require('express-validator');

app.post('/api/chat',
  body('message').trim().isLength({ min: 1, max: 500 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // ... resto do código
  }
);
```

---

## 📊 Custos OpenAI (Estimativa)

Para o hackathon, usando `gpt-4o-mini`:

- **Input**: $0.150 por 1M tokens
- **Output**: $0.600 por 1M tokens

**Estimativa de uso**:
- 100 conversas de chat (10 mensagens cada) = ~200k tokens = $0.12
- 100 recomendações = ~50k tokens = $0.03

**Total hackathon**: ~$0.20 USD (menos de R$ 1,00)

💡 **Dica**: Configure limite de uso no dashboard da OpenAI para evitar surpresas!

---

## ✅ Checklist de Implementação

### Setup Inicial
- [ ] Criar pasta `backend/`
- [ ] `npm init -y`
- [ ] Instalar dependências: `npm install express dotenv openai cors express-rate-limit express-validator`
- [ ] Criar `.env` com `OPENAI_API_KEY`
- [ ] Criar `.gitignore` (incluir `.env`)

### Endpoints
- [ ] POST /api/chat (com OpenAI)
- [ ] POST /api/recommendations (com OpenAI)
- [ ] GET /api/opportunities
- [ ] GET /api/opportunities/:id

### Integração
- [ ] Testar chat no Postman/Insomnia
- [ ] Testar recomendações com perfis diferentes
- [ ] Conectar frontend com backend
- [ ] Testar fluxo completo: chat → recomendações → visualizar oportunidade

### Finalizações
- [ ] Tratamento de erros
- [ ] CORS configurado
- [ ] Rate limiting
- [ ] README do backend

---

## 🎯 Diferencial para o Hackathon

**O que torna seu backend especial**:

1. **IA Conversacional Natural**: Não é um chatbot com respostas fixas, a Porti realmente entende e se adapta
2. **Recomendações Personalizadas**: Cada usuário recebe sugestões únicas baseadas no perfil
3. **Explicações Motivadoras**: A IA não só recomenda, mas explica POR QUE e motiva
4. **Acessibilidade**: Linguagem simples e didática para todos

---

## 📝 Notas Finais

- **Priorize o essencial**: Chat + Recomendações são o coração do produto
- **Dados podem ser estáticos**: Não precisa de banco de dados para o hackathon
- **IA é seu diferencial**: Invista tempo nos prompts e na experiência conversacional
- **Teste com perfis reais**: Peça para amigos testarem e darem feedback

**Boa sorte no hackathon! 🚀**
