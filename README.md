# 🦫 PortoEdu

> Transformando a descoberta de oportunidades educacionais em uma experiência simples, guiada e motivadora.

Plataforma educacional que conecta jovens brasileiros a bolsas de estudo, cursos gratuitos, intercâmbios e outras oportunidades através de uma assistente virtual inteligente - a **Porti**, nossa capivara estudiosa.

## 🎯 Sobre o Projeto

O PortoEdu nasceu de um hackathon com a missão de democratizar o acesso à informação sobre oportunidades educacionais. Muitos jovens não sabem que têm direito a benefícios sociais, bolsas de estudo e programas gratuitos - e é aí que a Porti entra.

### O Problema
- Informações sobre benefícios educacionais são difíceis de encontrar
- Jovens não sabem por onde começar
- Excesso de burocracia e jargões confusos
- Falta de orientação personalizada

### Nossa Solução
- **Chat Inteligente**: Conversa natural com IA para descobrir oportunidades
- **Recomendações Personalizadas**: A Porti analisa seu perfil e sugere as melhores opções
- **Informações Claras**: Explicações didáticas com próximos passos práticos
- **100% Gratuito**: Acesso livre para todos

## 🦫 Conheça a Porti

**Porti** é uma capivara estudiosa que simboliza:
- 🧘 **Calma e Paciência** - Educação é uma jornada
- 🎓 **Sabedoria** - Conhecimento compartilhado
- 💪 **Persistência** - Cada passo conta
- 🤝 **Empatia** - Entende os desafios reais

Ela conversa de forma amigável, sem julgar, e está sempre pronta para ajudar você a encontrar seu caminho.

## 🏗️ Arquitetura do Projeto

Este é um **monorepo** contendo frontend e backend:

```
portoedu/
├── frontend/              # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── pages/        # Páginas da aplicação
│   │   ├── services/     # Integração com API
│   │   └── ...
│   ├── package.json
│   └── README.md
│
├── backend/              # Fastify + TypeScript + OpenAI
│   ├── src/
│   │   ├── routes/      # Endpoints da API
│   │   ├── services/    # Lógica de negócio
│   │   ├── data/        # Dados de oportunidades
│   │   └── ...
│   ├── package.json
│   └── README.md
│
├── BACKEND.md           # Especificação técnica do backend
├── .gitignore
└── README.md            # Este arquivo
```

## 🚀 Stack Tecnológica

### Frontend
- **React 18** - UI moderna e reativa
- **TypeScript** - Tipagem estática
- **Vite** - Build ultra-rápido
- **Tailwind CSS v4** - Estilização utility-first
- **Radix UI** - Componentes acessíveis
- **Motion** - Animações fluidas
- **Leaflet** - Mapas interativos
- **React Router v7** - Roteamento

### Backend
- **Fastify** - Framework web performático
- **TypeScript** - Type safety
- **OpenAI (GPT-4o-mini)** - IA conversacional
- **Zod** - Validação de dados
- **@fastify/cors** - CORS configurado

### DevOps
- **Vercel** - Deploy serverless (backend e frontend)
- **Git** - Controle de versão
- **npm** - Gerenciador de pacotes

## ⚡ Quick Start

### Pré-requisitos

- **Node.js** 18+ (recomendado: 20 LTS)
- **npm** ou yarn
- **Conta OpenAI** com créditos (mínimo $5)

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/portoedu.git
cd portoedu
```

### 2. Setup do Backend

```bash
cd backend
npm install

# Configure a API Key da OpenAI
cp .env.example .env
# Edite .env e adicione sua OPENAI_API_KEY

# Inicie o servidor
npm run dev
```

O backend estará rodando em `http://localhost:3000`

**Documentação completa**: [backend/README.md](./backend/README.md)

### 3. Setup do Frontend

```bash
cd frontend
npm install

# Inicie o dev server
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

**Documentação completa**: [frontend/README.md](./frontend/README.md)

### 4. Acesse a Aplicação

Abra `http://localhost:5173` no navegador e comece a conversar com a Porti!

## 🎨 Funcionalidades

### ✅ Implementadas

#### 1. Chat Inteligente com IA
- Conversação natural com a Porti
- Contexto do perfil do usuário mantido
- Sugestões contextuais
- Interface responsiva e moderna

#### 2. Recomendações Personalizadas
- Análise de perfil (idade, escola, interesses, renda)
- Filtro inteligente de oportunidades elegíveis
- Ranking com match score (0-100)
- Explicações motivadoras geradas por IA
- Próximos passos práticos e acionáveis

#### 3. Catálogo de Oportunidades
- **9 categorias**: Bolsas, Cursos, Intercâmbios, Olimpíadas, Estágios, Pesquisa, Pós-graduação, Idiomas, Empreendedorismo
- Filtros por categoria e destaque
- Cards informativos com deadlines
- Página de detalhes completa
- Links oficiais para inscrição

#### 4. Mapas Interativos
- Localização geográfica das oportunidades
- Marcadores e popups informativos
- Navegação e zoom interativo

#### 5. Interface Acessível
- Design responsivo (mobile-first)
- Componentes com ARIA labels
- Alto contraste e legibilidade
- Navegação por teclado


## 📡 API Endpoints

### Health Check
```http
GET /health
```

### Chat
```http
POST /api/chat
```

### Recomendações
```http
POST /api/recommendations
```

### Oportunidades
```http
GET /api/opportunities
GET /api/opportunities/:id
GET /api/opportunities?category=bolsa&featured=true
```

**Documentação completa da API**: [backend/README.md#endpoints](./backend/README.md#-endpoints-disponíveis)

## 🎨 Design System

### Cores

```css
/* Cores Principais */
--verde-primary: #2ecc71;    /* Calma, crescimento */
--laranja-accent: #e67e22;   /* Energia, entusiasmo */

/* Cores de UI */
--background: #f8f9fa;
--text: #2c3e50;
--text-muted: #7f8c8d;
```

### Tipografia

- **Fonte**: Inter, system-ui, sans-serif
- **Títulos**: Bold, Grande
- **Corpo**: Regular, Legível
- **Código**: Monospace

### Princípios de Design

1. **Simplicidade** - Interface limpa e sem distrações
2. **Acessibilidade** - Foco em WCAG 2.1 AA
3. **Responsividade** - Mobile-first
4. **Consistência** - Design system coeso
5. **Performance** - Carregamento rápido

## 🧪 Testando a Aplicação

### Fluxo de Teste Recomendado

1. **Landing Page** (`/`)
   - Conheça a Porti
   - Veja oportunidades em destaque
   - Clique em "Começar"

2. **Chat com a Porti** (`/form`)
   - Converse naturalmente
   - Compartilhe seu perfil (idade, escola, interesses)
   - Receba recomendações personalizadas

3. **Catálogo de Oportunidades** (`/opportunities`)
   - Explore por categoria
   - Filtre por destaques
   - Veja detalhes completos

4. **Detalhes da Oportunidade** (`/opportunities/:id`)
   - Leia descrição completa
   - Veja requisitos e benefícios
   - Confira próximos passos
   - Veja localização no mapa (se disponível)

### Perfis de Teste

```json
// Perfil 1: Estudante de Ensino Médio
{
  "idade": 17,
  "escolaPublica": true,
  "interesses": ["tecnologia", "programação"],
  "renda": "baixa",
  "escolaridade": "ensino médio"
}

// Perfil 2: Graduado buscando pós
{
  "idade": 23,
  "escolaPublica": false,
  "interesses": ["pesquisa", "mestrado"],
  "renda": "média",
  "escolaridade": "graduação"
}

// Perfil 3: Jovem empreendedor
{
  "idade": 19,
  "escolaPublica": true,
  "interesses": ["empreendedorismo", "negócios"],
  "renda": "baixa",
  "escolaridade": "ensino médio completo"
}
```

## 🐛 Troubleshooting

### Backend não inicia

```bash
# Verifique se o .env existe e tem OPENAI_API_KEY
cd backend
cat .env

# Reinstale dependências
rm -rf node_modules package-lock.json
npm install
```

### Frontend não conecta com API

```bash
# Verifique se o backend está rodando
curl http://localhost:3000/health

# Verifique CORS no backend
# FRONTEND_URL deve estar correto no .env do backend
```

### Erros de TypeScript

```bash
# Limpe cache e rebuilde
npm run build

# Ou verifique tipos
npm run lint
```

### OpenAI API retorna erro 401

- Verifique se a API Key está correta
- Confirme se há créditos na conta OpenAI
- Crie uma nova API Key se necessário

## 🚢 Deploy

### Deploy do Backend (Vercel)

```bash
cd backend
vercel --prod
```

**Variáveis de ambiente necessárias**:
- `OPENAI_API_KEY`
- `FRONTEND_URL` (URL do frontend em produção)
- `NODE_ENV=production`

### Deploy do Frontend (Vercel)

```bash
cd frontend
vercel --prod
```

**Variáveis de ambiente necessárias**:
- `VITE_API_URL` (URL do backend em produção)

### Configuração de Domínio Customizado

1. Configure domínio no Vercel
2. Atualize `FRONTEND_URL` no backend
3. Atualize `VITE_API_URL` no frontend
4. Redeploy ambos os projetos

## 📊 Métricas e Custos

### Custos OpenAI (Estimativa Mensal)

Usando `gpt-4o-mini`:

| Uso | Requisições | Custo |
|-----|-------------|-------|
| Chat | 1.000 conversas | ~$1.50 |
| Recomendações | 1.000 análises | ~$0.40 |
| **Total** | **2.000 req/mês** | **~$2 USD** |

### Performance Target

- **Lighthouse Score**: > 90
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

## 🔐 Segurança

### Práticas Implementadas

- ✅ Validação de inputs com Zod
- ✅ CORS configurado
- ✅ Variáveis de ambiente seguras
- ✅ Sanitização de dados do usuário
- ✅ Error handling sem exposição de detalhes internos

### Recomendações Adicionais (Produção)

- [ ] Rate limiting (proteção contra abuse)
- [ ] HTTPS obrigatório
- [ ] Autenticação de usuários
- [ ] Logs de auditoria
- [ ] Monitoramento de erros (Sentry)

## 🤝 Contribuindo

Adoramos contribuições! Para contribuir:

### 1. Fork & Clone

```bash
git clone https://github.com/seu-usuario/portoedu.git
cd portoedu
```

### 2. Crie uma Branch

```bash
git checkout -b feature/MinhaFeature
```

### 3. Desenvolva

- Siga as convenções de código
- Adicione testes se possível
- Documente mudanças significativas

### 4. Commit & Push

```bash
git commit -m "feat: adiciona minha feature incrível"
git push origin feature/MinhaFeature
```

### 5. Abra um Pull Request

- Descreva suas mudanças
- Adicione screenshots se relevante
- Mencione issues relacionadas

### Convenções de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova feature
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação, sem mudança de lógica
- `refactor:` - Refatoração de código
- `test:` - Testes
- `chore:` - Tarefas de build, configs, etc.

## 📚 Documentação Adicional

- [Backend Documentation](./backend/README.md) - Setup e API do backend
- [Frontend Documentation](./frontend/README.md) - Componentes e desenvolvimento
- [Backend Architecture](./BACKEND.md) - Especificação técnica detalhada

## 🏆 Equipe

Este projeto foi criado durante um hackathon e é mantido pela comunidade.

**Criado com** ❤️ **pela equipe PortoEdu**

## 📄 Licença

Este projeto é open-source e está disponível sob licença a definir.

## 🙏 Agradecimentos

- **OpenAI** - Por democratizar acesso a IA
- **Fastify** - Framework incrível e performático
- **Radix UI** - Componentes acessíveis de qualidade
- **Vercel** - Deploy simples e eficiente
- **Comunidade Open Source** - Por todas as ferramentas incríveis

---

## 💡 Inspiração

> "Educação é a arma mais poderosa que você pode usar para mudar o mundo." - Nelson Mandela

Acreditamos que **informação** e **orientação** são os primeiros passos para transformar vidas através da educação. A Porti está aqui para guiar cada jovem nessa jornada.

---

**Dúvidas? Sugestões? Contribuições?**

Abra uma [issue](https://github.com/seu-usuario/portoedu/issues) ou entre em contato!

🦫 **Vamos juntos transformar o acesso à educação no Brasil!**
