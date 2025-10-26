# 🎨 PortoEdu Frontend

Interface moderna e intuitiva da plataforma PortoEdu, onde a Porti (nossa capivara estudiosa) ajuda jovens a descobrir oportunidades educacionais através de uma experiência gamificada e acessível.

## 📚 Stack Tecnológica

### Core
- **React 18** - Biblioteca UI com hooks e componentes funcionais
- **TypeScript** - Tipagem estática para desenvolvimento seguro
- **Vite** - Build tool ultra-rápido com HMR instantâneo
- **React Router v7** - Roteamento client-side moderno

### Estilização
- **Tailwind CSS v4** - Framework CSS utility-first
- **Radix UI** - Componentes acessíveis e unstyled
- **class-variance-authority** - Variantes de componentes tipadas
- **clsx & tailwind-merge** - Utilitários para className

### Animações
- **Motion (Framer Motion)** - Animações fluidas e declarativas

### UI/UX
- **Phosphor Icons** - Ícones modernos e consistentes
- **Lucide React** - Biblioteca de ícones adicional
- **cmdk** - Command palette para navegação rápida

### Funcionalidades Específicas
- **Leaflet & React Leaflet** - Mapas interativos para localização de oportunidades
- **React Markdown** - Renderização de conteúdo markdown
- **remark-gfm** - Suporte a GitHub Flavored Markdown

## 🏗️ Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── chat/           # Chat com a Porti
│   │   ├── opportunities/  # Cards e listagens de oportunidades
│   │   ├── ui/             # Componentes base (Radix UI)
│   │   └── ...
│   ├── pages/              # Páginas da aplicação
│   │   ├── Inicial.tsx     # Landing page
│   │   ├── Form.tsx        # Chat com a Porti
│   │   ├── Opportunities.tsx  # Lista de oportunidades
│   │   ├── OpportunityDetail.tsx  # Detalhes da oportunidade
│   │   ├── Home.tsx
│   │   └── About.tsx
│   ├── layouts/            # Layouts compartilhados
│   │   └── Layout.tsx      # Layout principal com header/footer
│   ├── services/           # Integração com API
│   │   └── api.ts          # Cliente HTTP
│   ├── hooks/              # Custom React hooks
│   ├── types/              # Tipos TypeScript
│   ├── utils/              # Funções utilitárias
│   ├── data/               # Dados estáticos
│   ├── config/             # Configurações
│   ├── lib/                # Bibliotecas auxiliares
│   ├── App.tsx             # Componente principal com rotas
│   ├── main.tsx            # Entry point
│   └── index.css           # Estilos globais
├── public/                 # Arquivos estáticos
├── dist/                   # Build de produção
└── index.html              # HTML template
```

## 🎯 Funcionalidades Principais

### 1. Chat Inteligente com a Porti
- Conversa natural com assistente IA
- Interface de chat moderna e responsiva
- Histórico de conversação
- Sugestões contextuais

### 2. Sistema de Oportunidades
- Catálogo completo de oportunidades educacionais
- Filtros por categoria (bolsas, cursos, intercâmbios, etc.)
- Cards informativos com deadlines e tags
- Página de detalhes com informações completas
- Mapa interativo com localização das oportunidades

### 3. Recomendações Personalizadas
- Análise de perfil do usuário
- Match score para cada oportunidade
- Explicações motivadoras geradas por IA
- Próximos passos práticos

### 4. Interface Acessível
- Design responsivo (mobile-first)
- Componentes acessíveis (ARIA)
- Alto contraste e legibilidade
- Navegação por teclado

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ (recomendado: 20 LTS)
- npm ou yarn

### 1. Instalar Dependências

```bash
cd frontend
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do frontend (se necessário):

```env
VITE_API_URL=http://localhost:3000
```

### 3. Iniciar Desenvolvimento

```bash
npm run dev
```

O app estará disponível em `http://localhost:5173`

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento (HMR ativado)
- `npm run build` - Cria build de produção otimizado
- `npm run preview` - Preview do build de produção localmente
- `npm run lint` - Executa ESLint para verificar código

## 🎨 Conceito Visual

### Tema
- **Mascote**: Porti, a capivara estudiosa
- **Cores Primárias**:
  - Verde (#2ecc71) - Calma e crescimento
  - Laranja (#e67e22) - Energia e entusiasmo
- **Estilo**: Flat design minimalista, limpo e amigável
- **Tom de Voz**: Gentil, paciente e encorajador

### Design System
- Componentes baseados em Radix UI para máxima acessibilidade
- Animações sutis com Motion para melhor UX
- Sistema de cores consistente via Tailwind
- Tipografia clara e legível

## 🗺️ Rotas

```typescript
/                    # Landing page (Inicial)
/form                # Chat com a Porti
/opportunities       # Lista de oportunidades
/opportunities/:id   # Detalhes da oportunidade
/home                # Home alternativa
/about               # Sobre o projeto
```

## 🔌 Integração com Backend

O frontend se comunica com a API backend através do serviço `api.ts`:

```typescript
// Exemplo de uso
import { chatService, opportunityService } from '@/services/api'

// Chat
const response = await chatService.sendMessage(message, profile)

// Recomendações
const recommendations = await chatService.getRecommendations(profile)

// Oportunidades
const opportunities = await opportunityService.getAll({ category: 'bolsa' })
const opportunity = await opportunityService.getById('prouni-2025')
```

## 🎨 Componentes Principais

### Chat Components
- `ChatContainer` - Container principal do chat
- `ChatMessage` - Mensagem individual (usuário/assistente)
- `ChatInput` - Input de mensagem com validação
- `TypingIndicator` - Indicador de digitação

### Opportunity Components
- `OpportunityCard` - Card de oportunidade
- `OpportunityFilters` - Filtros de categoria/busca
- `OpportunityMap` - Mapa interativo com Leaflet
- `OpportunitiesSection` - Seção de oportunidades destacadas

### UI Components (Radix UI)
- `Button` - Botão com variantes
- `Card` - Card container
- `Dialog` - Modal/Dialog
- `Progress` - Barra de progresso
- `Separator` - Divisor visual
- `Popover` - Popover contextual

## 🌍 Mapas Interativos

Utilizamos **Leaflet** para exibir a localização das oportunidades:

```typescript
// Exemplo de uso do mapa
<MapContainer center={[latitude, longitude]} zoom={13}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <Marker position={[latitude, longitude]}>
    <Popup>{opportunityName}</Popup>
  </Marker>
</MapContainer>
```

**Features do Mapa:**
- Marcadores para cada oportunidade com localização
- Popups com informações básicas
- Zoom e navegação interativa
- Tiles do OpenStreetMap

## 📱 Responsividade

O design é totalmente responsivo com breakpoints:

```css
sm:  640px   /* Tablets */
md:  768px   /* Tablets landscape */
lg:  1024px  /* Desktop */
xl:  1280px  /* Desktop large */
2xl: 1536px  /* Desktop XL */
```

Utilizamos abordagem mobile-first:

```tsx
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Mobile: 100%, Tablet: 50%, Desktop: 33.33% */}
</div>
```

## 🎭 Animações

Animações criadas com **Motion** (Framer Motion):

```tsx
// Exemplo de animação
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Conteúdo animado
</motion.div>
```

**Princípios de Animação:**
- Sutileza - não distrair do conteúdo
- Performance - usar transforms e opacity
- Acessibilidade - respeitar `prefers-reduced-motion`

## 🔧 Configuração de Build

### Vite

O projeto usa Vite com as seguintes otimizações:

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-popover'],
          'map-vendor': ['leaflet', 'react-leaflet']
        }
      }
    }
  }
})
```

### Tailwind CSS v4

Configuração moderna com PostCSS:

```css
/* index.css */
@import "tailwindcss";

@theme {
  /* Customizações de tema */
}
```

## 🐛 Troubleshooting

### "Module not found" ou erros de import

```bash
# Limpe cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Build falha com erro de memória

```bash
# Aumente limite de memória do Node
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Mapas não aparecem

- Verifique se importou o CSS do Leaflet
- Certifique-se de que o container do mapa tem altura definida
- Importe: `import 'leaflet/dist/leaflet.css'`

### Erros de CORS ao chamar API

- Verifique se o backend está rodando
- Confirme a URL da API no `.env`
- Verifique configuração de CORS no backend

## 🚢 Deploy

### Build de Produção

```bash
npm run build
```

Gera build otimizado na pasta `dist/`

### Deploy para Vercel

```bash
# Instale Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deploy para Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

## 📊 Performance

### Métricas Alvo
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Otimizações Aplicadas
- ✅ Code splitting por rota
- ✅ Lazy loading de componentes pesados
- ✅ Tree shaking automático (Vite)
- ✅ Compressão de assets
- ✅ Imagens otimizadas

## 🧪 Testes (Futuro)

Estrutura planejada para testes:

```bash
# Unit tests (Vitest)
npm run test

# E2E tests (Playwright)
npm run test:e2e

# Coverage
npm run test:coverage
```

## 🎨 Customização de Tema

Para customizar cores e estilo:

```css
/* src/index.css */
@theme {
  --color-primary: #2ecc71;
  --color-secondary: #e67e22;
  --font-family-sans: 'Inter', system-ui, sans-serif;
}
```

## 📚 Recursos Úteis

- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/)
- [Radix UI Docs](https://www.radix-ui.com/)
- [Motion Docs](https://motion.dev/)
- [React Router v7 Docs](https://reactrouter.com/)
- [Leaflet Docs](https://leafletjs.com/)


## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Convenções de Código

- Use TypeScript estrito
- Siga o guia de estilo do ESLint
- Componentes em PascalCase
- Hooks em camelCase com prefixo `use`
- Mantenha componentes pequenos e focados
- Documente props complexas com JSDoc

## 📄 Licença

Este projeto nasceu de um hackathon e é mantido pela comunidade.

---

Feito com ❤️ pela equipe PortoEdu
