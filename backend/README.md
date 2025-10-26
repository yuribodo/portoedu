# 🚀 PortoEdu Backend

Backend da plataforma PortoEdu construído com **Fastify**, **TypeScript** e **OpenAI**.

## 📚 Stack Tecnológica

- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Tipagem estática para JavaScript
- **OpenAI** - IA para o chat com a Porti
- **Zod** - Validação de schemas e dados
- **@fastify/cors** - Suporte a CORS

## 🏗️ Estrutura do Projeto

```
backend/
├── src/
│   ├── config/
│   │   └── env.ts              # Validação de variáveis de ambiente
│   ├── routes/
│   │   ├── chat.ts             # Rotas de chat
│   │   └── opportunities.ts    # Rotas de oportunidades
│   ├── services/
│   │   └── openai.ts           # Serviço de integração OpenAI
│   ├── data/
│   │   └── opportunities.ts    # Dados de oportunidades
│   ├── types/
│   │   └── opportunity.ts      # Tipos TypeScript
│   └── server.ts               # Entry point do servidor
├── .env.example                # Template de variáveis de ambiente
├── .env                        # Suas variáveis (não commitado)
├── package.json
├── tsconfig.json
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
6. Adicione **pelo menos $5 USD** de crédito (suficiente para todo o hackathon)

> **Dica**: O modelo `gpt-4o-mini` é muito barato. Com $5 você faz milhares de requisições!

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
```bash
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

### Recomendações Personalizadas

```bash
POST /api/recommendations
Content-Type: application/json
```

**Descrição:** A Porti analisa o perfil do usuário e recomenda as melhores oportunidades com explicações personalizadas.

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
        "shortDescription": "Bolsa integral para graduação...",
        "deadline": "2025-02-15T23:59:59.000Z",
        "hasDeadline": true,
        "officialLink": "https://acessounico.mec.gov.br/prouni",
        "tags": ["graduação", "universidade", "bolsa-integral", "enem"]
      }
    },
    {
      "opportunityId": "bootcamp-tech-2025",
      "matchScore": 90,
      "reason": "Seu interesse em tecnologia combina muito com esse bootcamp gratuito! Em 3 meses você aprende programação do zero.",
      "nextSteps": [
        "Inscrever-se no site do bootcamp",
        "Fazer o teste lógico online"
      ],
      "opportunity": { ... }
    }
  ],
  "summary": "Encontrei 3 oportunidades incríveis para você! As principais são ProUni e o Bootcamp de Tecnologia. Ambas são 100% gratuitas e perfeitas para quem estuda em escola pública. Quer saber mais?",
  "totalEligible": 3
}
```

**Fluxo:**
1. Filtra oportunidades elegíveis baseado em requisitos (idade, escola, etc)
2. Usa IA para ranquear as TOP 5 melhores para o perfil
3. Retorna com explicações personalizadas e próximos passos

### Chat com a Porti

```bash
POST /api/chat
Content-Type: application/json
```

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
      "content": "Oi! Eu sou a Porti, uma capivara que adora ajudar jovens a encontrar oportunidades! 🦫"
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
  "message": "Que legal! Com 17 anos e interesse em tecnologia, você tem várias oportunidades incríveis...",
  "suggestedActions": []
}
```

### Listar Oportunidades

```bash
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
      "shortDescription": "Bolsa integral para graduação...",
      "featured": true,
      ...
    }
  ],
  "total": 3
}
```

### Detalhes de Oportunidade

```bash
GET /api/opportunities/:id
```

**Exemplo:**
```bash
GET /api/opportunities/prouni-2025
```

**Response:**
```json
{
  "id": "prouni-2025",
  "title": "ProUni 2025 - Bolsa Integral",
  "category": "bolsa",
  "fullDescription": "O Programa Universidade para Todos...",
  "requirements": [...],
  "steps": [...],
  "benefits": [...],
  ...
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

1. Importe a coleção (ou crie manualmente)
2. Configure a base URL: `http://localhost:3000`
3. Teste cada endpoint

## 🐛 Troubleshooting

### "OPENAI_API_KEY não está configurada"

- Verifique se o arquivo `.env` existe
- Verifique se a chave está no formato correto: `sk-proj-...`
- Reinicie o servidor após alterar o `.env`

### "Limite de requisições atingido" (429)

- Você excedeu o limite de rate limiting da OpenAI
- Aguarde alguns segundos e tente novamente
- Considere adicionar mais créditos na conta

### "API Key da OpenAI inválida" (401)

- Verifique se copiou a chave corretamente
- A chave pode ter expirado - crie uma nova
- Verifique se há créditos na conta

### Porta 3000 já está em uso

```bash
# Altere a porta no .env
PORT=3001

# Ou finalize o processo que está usando a porta 3000
lsof -ti:3000 | xargs kill -9
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor em modo desenvolvimento (hot reload)
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Inicia servidor em modo produção
- `npm run lint` - Verifica tipos TypeScript

## 🔐 Segurança

- **CORS**: Configurado para aceitar apenas requisições do frontend (`http://localhost:5173`)
- **Validação**: Todos os inputs são validados com Zod
- **Error Handling**: Erros são tratados e não expõem informações sensíveis
- **Environment**: Nunca commite o arquivo `.env` (já está no `.gitignore`)

## 🚀 Próximos Passos (Fase 3 - Opcional)

- [x] ~~Implementar endpoint de recomendações personalizadas~~ **CONCLUÍDO!**
- [ ] Implementar análise de compatibilidade individual (`POST /api/opportunities/:id/compatibility`)
- [ ] Adicionar rate limiting
- [ ] Melhorar logs e monitoramento
- [ ] Adicionar testes automatizados
- [ ] Cache de recomendações por perfil

## 📚 Recursos Úteis

- [Documentação Fastify](https://fastify.dev/)
- [Documentação OpenAI](https://platform.openai.com/docs)
- [Documentação Zod](https://zod.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contribuindo

Este é um projeto de hackathon. Sinta-se livre para melhorar e adaptar!

---

Feito com ❤️ para o PortoEdu
