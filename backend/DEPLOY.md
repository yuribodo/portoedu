# Deploy do Backend na Vercel

Este guia explica como fazer o deploy do backend PortoEdu na Vercel.

## Pré-requisitos

- Conta na Vercel (gratuita)
- Chave da API OpenAI
- Repositório Git (GitHub, GitLab ou Bitbucket)

## Passos para Deploy

### 1. Instalar dependências localmente

```bash
cd backend
npm install
```

### 2. Preparar o repositório

Certifique-se de que seu código está em um repositório Git e faça push para GitHub/GitLab:

```bash
git add .
git commit -m "feat: configuração para deploy Vercel"
git push
```

### 3. Deploy na Vercel

#### Opção A: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel
```

#### Opção B: Via Dashboard

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New" > "Project"
3. Importe seu repositório
4. Configure as variáveis de ambiente (veja abaixo)
5. Clique em "Deploy"

### 4. Configurar Variáveis de Ambiente

Na Vercel, adicione as seguintes variáveis de ambiente:

**Obrigatórias:**
- `OPENAI_API_KEY` - Sua chave da API OpenAI
- `FRONTEND_URL` - URL do frontend em produção (ex: `https://seu-app.vercel.app`)

**Opcionais:**
- `NODE_ENV` - `production` (já configurado automaticamente)
- `RATE_LIMIT_MAX` - Limite de requisições (padrão: 100)
- `RATE_LIMIT_WINDOW_MS` - Janela de tempo em ms (padrão: 900000)

#### Como adicionar variáveis:

1. No dashboard do projeto na Vercel
2. Vá em "Settings" > "Environment Variables"
3. Adicione cada variável e seu valor
4. Clique em "Save"

### 5. Redeploy (se necessário)

Se você adicionou variáveis de ambiente após o primeiro deploy:

1. Vá em "Deployments"
2. Clique nos três pontos do último deployment
3. Selecione "Redeploy"

## Estrutura de Arquivos para Vercel

```
backend/
├── api/
│   └── index.ts          # Handler serverless para Vercel
├── src/
│   ├── routes/           # Rotas da API
│   ├── services/         # Serviços (OpenAI, etc)
│   ├── data/             # Dados das oportunidades
│   ├── config/           # Configurações
│   └── server.ts         # Servidor standalone (dev)
├── vercel.json           # Configuração da Vercel
├── package.json
└── tsconfig.json
```

## Testando o Deploy

Após o deploy, sua API estará disponível em:

```
https://seu-projeto.vercel.app
```

Endpoints disponíveis:

- `GET /` - Informações da API
- `GET /health` - Health check
- `GET /api/opportunities` - Lista oportunidades
- `GET /api/opportunities/:id` - Detalhes de uma oportunidade
- `POST /api/chat` - Chat com IA
- `POST /api/recommendations` - Recomendações personalizadas

### Exemplo de teste:

```bash
# Health check
curl https://seu-projeto.vercel.app/health

# Listar oportunidades
curl https://seu-projeto.vercel.app/api/opportunities

# Detalhes de uma oportunidade
curl https://seu-projeto.vercel.app/api/opportunities/prouni-2025
```

## Desenvolvimento Local vs Produção

- **Local**: `npm run dev` - Usa `src/server.ts` (servidor standalone)
- **Vercel**: Usa `api/index.ts` (função serverless)

Ambos compartilham as mesmas rotas e lógica de negócio.

## Troubleshooting

### Erro "OPENAI_API_KEY is required"

- Certifique-se de que adicionou a variável de ambiente na Vercel
- Faça redeploy após adicionar

### Erro de CORS

- Configure `FRONTEND_URL` com a URL correta do frontend
- Certifique-se de que não tem barra final (/)

### Erro 404 em rotas

- Verifique se `vercel.json` está configurado corretamente
- Todas as rotas devem ser redirecionadas para `api/index.ts`

### Build falhou

- Execute `npm run build` localmente para verificar erros de TypeScript
- Verifique os logs de build na Vercel

## Limites da Vercel (Plano Gratuito)

- **Funções serverless**: 100 GB-horas/mês
- **Invocações**: 100k/mês
- **Banda**: 100 GB/mês
- **Timeout**: 10 segundos

Para mais informações sobre limites, consulte: [Vercel Pricing](https://vercel.com/pricing)

## Próximos Passos

Após o deploy do backend:

1. Atualize a URL da API no frontend
2. Configure CORS para aceitar requisições do frontend
3. Configure domínio customizado (opcional)
4. Configure analytics e logs (opcional)

## Recursos

- [Documentação Vercel](https://vercel.com/docs)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
