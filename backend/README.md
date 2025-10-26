# 🚀 PortoEdu Backend

Backend da plataforma PortoEdu construído com **Fastify**, **TypeScript** e **OpenAI**.

A Porti, nossa capivara estudiosa, usa inteligência artificial para ajudar jovens brasileiros a descobrir oportunidades educacionais personalizadas.

## 📚 Stack Tecnológica

- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Tipagem estática para JavaScript
- **OpenAI** - IA conversacional (GPT-4o-mini) para chat e recomendações
- **Zod** - Validação de schemas e dados
- **@fastify/cors** - Suporte a CORS
- **tsx** - Execução TypeScript em desenvolvimento
- **dotenv** - Gerenciamento de variáveis de ambiente

## 🏗️ Estrutura do Projeto

```
backend/
├── src/
│   ├── config/
│   │   └── env.ts              # Validação de variáveis de ambiente
│   ├── routes/
│   │   ├── chat.ts             # Rotas de chat com IA
│   │   ├── recommendations.ts  # Rotas de recomendações personalizadas
│   │   └── opportunities.ts    # Rotas de oportunidades
│   ├── services/
│   │   └── openai.ts           # Serviço de integração OpenAI
│   ├── data/
│   │   └── opportunities.ts    # Dados de oportunidades educacionais
│   ├── types/
│   │   └── opportunity.ts      # Tipos TypeScript
│   └── server.ts               # Entry point do servidor
├── api/
│   └── index.ts                # Serverless handler para Vercel
├── dist/                       # Build compilado
├── .env.example                # Template de variáveis de ambiente
├── .env                        # Suas variáveis (não commitado)
├── package.json
├── tsconfig.json
├── vercel.json                 # Configuração de deploy
└── README.md
```

## 🔧 Configuração Inicial

### 1. Instalar Dependências

```bash
cd backend
npm install
```

### 2. Obter API Key da OpenAI

1. Acesse https://platform.openai.com/signup
2. Crie uma conta (ou faça login)
3. Vá em **API Keys** → **Create new secret key**
4. Copie a chave (ela só será mostrada uma vez!)
5. Em **Billing**, adicione um método de pagamento
6. Adicione **pelo menos $5 USD** de crédito (suficiente para o projeto)

> **Dica**: O modelo `gpt-4o-mini` é muito econômico. Com $5 você faz milhares de requisições!

### 3. Configurar Variáveis de Ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env e cole sua API Key
nano .env  # ou use seu editor preferido
```

Arquivo `.env`:
```env
PORT=3000
NODE_ENV=development
OPENAI_API_KEY=sk-proj-sua-chave-aqui
FRONTEND_URL=http://localhost:5173
```

## 🚀 Executando o Projeto

### Modo Desenvolvimento (com hot reload)

```bash
npm run dev
```

O servidor irá iniciar em `http://localhost:3000`

### Modo Produção

```bash
# Build
npm run build

# Start
npm start
```

## 📡 Endpoints Disponíveis

### Health Check
```http
GET /health
```

Verifica se o servidor está funcionando e se a OpenAI está configurada.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-26T10:30:00.000Z",
  "environment": "development",
  "openaiConfigured": true
}
```

---

### Recomendações Personalizadas

```http
POST /api/recommendations
Content-Type: application/json
```

**Descrição:** A Porti analisa o perfil do usuário e recomenda as melhores oportunidades com explicações personalizadas e próximos passos.

**Request Body:**
```json
{
  "userProfile": {
    "idade": 17,
    "escolaPublica": true,
    "interesses": ["tecnologia", "idiomas"],
    "renda": "baixa",
    "escolaridade": "ensino médio"
  }
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "opportunityId": "prouni-2025",
      "matchScore": 95,
      "reason": "Você se encaixa perfeitamente no ProUni! Como estuda em escola pública e tem 17 anos, pode se preparar para o ENEM e concorrer a uma bolsa integral.",
      "nextSteps": [
        "Fazer o ENEM em novembro",
        "Estudar para conseguir média acima de 450 pontos",
        "Inscrever-se no ProUni em janeiro"
      ],
      "opportunity": {
        "id": "prouni-2025",
        "title": "ProUni 2025 - Bolsa Integral",
        "category": "bolsa",
        "icon": "🎓",
        "shortDescription": "Bolsa integral para graduação em universidades privadas",
        "deadline": "2025-02-15T23:59:59.000Z",
        "hasDeadline": true,
        "officialLink": "https://acessounico.mec.gov.br/prouni",
        "tags": ["graduação", "universidade", "bolsa-integral", "enem"]
      }
    }
  ],
  "summary": "Encontrei 3 oportunidades incríveis para você! As principais são ProUni e o Bootcamp de Tecnologia. Ambas são 100% gratuitas e perfeitas para quem estuda em escola pública.",
  "totalEligible": 3
}
```

**Fluxo:**
1. Filtra oportunidades elegíveis baseado em requisitos (idade, escola, etc)
2. Usa IA para ranquear as TOP 5 melhores para o perfil
3. Retorna com explicações personalizadas e próximos passos práticos

---

### Chat com a Porti

```http
POST /api/chat
Content-Type: application/json
```

**Descrição:** Conversa com a Porti, nossa assistente capivara que ajuda a descobrir oportunidades educacionais através de conversação natural.

**Request Body:**
```json
{
  "message": "Oi! Tenho 17 anos e gosto de tecnologia",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Oi!"
    },
    {
      "role": "assistant",
      "content": "Oi! Eu sou a Porti, uma capivara que adora ajudar jovens a encontrar oportunidades!"
    }
  ],
  "userProfile": {
    "idade": 17,
    "escolaPublica": true,
    "interesses": ["tecnologia"],
    "renda": "baixa"
  }
}
```

**Response:**
```json
{
  "message": "Que legal! Com 17 anos e interesse em tecnologia, você tem várias oportunidades incríveis, como bootcamps gratuitos e bolsas para cursos técnicos. Quer saber mais sobre alguma delas?",
  "suggestedActions": [
    {
      "type": "view_opportunities",
      "label": "Ver oportunidades em Tecnologia"
    }
  ]
}
```

---

### Listar Oportunidades

```http
GET /api/opportunities
GET /api/opportunities?category=bolsa
GET /api/opportunities?featured=true
GET /api/opportunities?category=curso&featured=true
```

**Query Parameters:**
- `category` (opcional): `bolsa`, `intercambio`, `curso`, `olimpiada`, `estagio`, `pesquisa`, `pos`, `idioma`, `empreendedorismo`
- `featured` (opcional): `true` ou `false`

**Response:**
```json
{
  "opportunities": [
    {
      "id": "prouni-2025",
      "title": "ProUni 2025 - Bolsa Integral",
      "category": "bolsa",
      "icon": "🎓",
      "shortDescription": "Bolsa integral para graduação em universidades privadas",
      "featured": true,
      "deadline": "2025-02-15T23:59:59.000Z",
      "hasDeadline": true,
      "tags": ["graduação", "universidade", "bolsa-integral"]
    }
  ],
  "total": 3
}
```

---

### Detalhes de Oportunidade

```http
GET /api/opportunities/:id
```

**Exemplo:**
```http
GET /api/opportunities/prouni-2025
```

**Response:**
```json
{
  "id": "prouni-2025",
  "title": "ProUni 2025 - Bolsa Integral",
  "category": "bolsa",
  "fullDescription": "O Programa Universidade para Todos oferece bolsas integrais e parciais...",
  "requirements": [
    {
      "title": "Idade mínima",
      "description": "Ter pelo menos 14 anos",
      "icon": "📅"
    }
  ],
  "steps": [
    {
      "order": 1,
      "title": "Fazer o ENEM",
      "description": "Inscreva-se no ENEM e obtenha nota mínima de 450 pontos",
      "estimatedTime": "3 meses de preparação"
    }
  ],
  "benefits": [
    "Bolsa integral (100%) ou parcial (50%)",
    "Graduação em universidades privadas reconhecidas pelo MEC"
  ],
  "deadline": "2025-02-15T23:59:59.000Z",
  "hasDeadline": true,
  "officialLink": "https://acessounico.mec.gov.br/prouni",
  "tags": ["graduação", "universidade", "bolsa-integral", "enem"]
}
```

## 🧪 Testando os Endpoints

### Com cURL

```bash
# Health check
curl http://localhost:3000/health

# Recomendações personalizadas
curl -X POST http://localhost:3000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "userProfile": {
      "idade": 17,
      "escolaPublica": true,
      "interesses": ["tecnologia"],
      "renda": "baixa"
    }
  }'

# Chat
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Oi, preciso de ajuda!",
    "userProfile": {
      "idade": 17,
      "escolaPublica": true,
      "interesses": ["tecnologia"]
    }
  }'

# Listar oportunidades
curl http://localhost:3000/api/opportunities

# Listar apenas bolsas em destaque
curl http://localhost:3000/api/opportunities?category=bolsa&featured=true

# Detalhes de uma oportunidade
curl http://localhost:3000/api/opportunities/prouni-2025
```

### Com Postman/Insomnia

1. Importe ou crie as requisições manualmente
2. Configure a base URL: `http://localhost:3000`
3. Teste cada endpoint

## 🐛 Troubleshooting

### "OPENAI_API_KEY não está configurada"

- Verifique se o arquivo `.env` existe na raiz do backend
- Verifique se a chave está no formato correto: `sk-proj-...`
- Reinicie o servidor após alterar o `.env`

### "Limite de requisições atingido" (429)

- Você excedeu o limite de rate limiting da OpenAI
- Aguarde alguns segundos e tente novamente
- Considere adicionar mais créditos na conta

### "API Key da OpenAI inválida" (401)

- Verifique se copiou a chave corretamente
- A chave pode ter expirado - crie uma nova no dashboard da OpenAI
- Verifique se há créditos suficientes na conta

### Porta 3000 já está em uso

```bash
# Altere a porta no .env
PORT=3001

# Ou finalize o processo que está usando a porta 3000
lsof -ti:3000 | xargs kill -9
```

### CORS Error no Frontend

- Verifique se `FRONTEND_URL` no `.env` está correto
- Certifique-se de que o frontend está rodando na URL configurada
- Reinicie o servidor backend após alterar CORS

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor em modo desenvolvimento (hot reload com tsx)
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Inicia servidor em modo produção
- `npm run lint` - Verifica tipos TypeScript sem emitir arquivos

## 🔐 Segurança

- **CORS**: Configurado para aceitar apenas requisições do frontend (`http://localhost:5173`)
- **Validação**: Todos os inputs são validados com Zod antes do processamento
- **Error Handling**: Erros são tratados e não expõem informações sensíveis
- **Environment**: Arquivo `.env` nunca é commitado (já está no `.gitignore`)
- **API Keys**: Nunca exponha suas chaves no código ou commits

## 🚢 Deploy

O backend está configurado para deploy no **Vercel** via serverless functions.

```bash
# Deploy para produção
vercel --prod

# Deploy para preview
vercel
```

**Configuração necessária no Vercel:**
- Adicione `OPENAI_API_KEY` nas variáveis de ambiente
- Configure `FRONTEND_URL` com a URL do frontend em produção

## 💡 Arquitetura

### Fluxo de Recomendações

1. **Filtro Inicial**: Filtra oportunidades por critérios básicos (idade, escola, renda)
2. **Análise IA**: Usa GPT-4o-mini para ranquear e explicar as melhores matches
3. **Personalização**: Gera explicações motivadoras e próximos passos específicos
4. **Response**: Retorna TOP 5 recomendações com dados completos

### Prompts da IA

Os prompts foram otimizados para:
- Linguagem casual e encorajadora
- Explicações didáticas e acessíveis
- Próximos passos práticos e acionáveis
- Tom empático e motivador

## 📊 Custos Estimados (OpenAI)

Usando `gpt-4o-mini`:
- **Input**: $0.150 por 1M tokens
- **Output**: $0.600 por 1M tokens

**Estimativa de uso mensal**:
- 1.000 conversas de chat = ~$1.50
- 1.000 recomendações = ~$0.40

**Total**: ~$2 USD/mês para uso moderado

💡 **Dica**: Configure limite de uso no dashboard da OpenAI para controlar custos.

## 🎯 Features Principais

- ✅ Chat conversacional com IA
- ✅ Recomendações personalizadas
- ✅ Sistema de oportunidades educacionais
- ✅ Filtros por categoria e destaque
- ✅ API RESTful documentada
- ✅ Validação de dados com Zod
- ✅ TypeScript para type safety
- ✅ Deploy serverless ready

## 📚 Recursos Úteis

- [Documentação Fastify](https://fastify.dev/)
- [Documentação OpenAI](https://platform.openai.com/docs)
- [Documentação Zod](https://zod.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vercel Deployment](https://vercel.com/docs)

## 🤝 Contribuindo

Este projeto nasceu de um hackathon. Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

Feito com ❤️ pela equipe PortoEdu
