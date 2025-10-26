# PortoEdu

Projeto React com TypeScript, Vite, Tailwind CSS e React Router.

## Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Roteamento

## Estrutura do Projeto

```
portoedu/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   │   ├── Home.tsx
│   │   └── About.tsx
│   ├── layouts/        # Layouts da aplicação
│   │   └── Layout.tsx
│   ├── App.tsx         # Componente principal com rotas
│   ├── main.tsx        # Entry point
│   └── index.css       # Estilos globais
├── public/             # Arquivos estáticos
└── dist/               # Build de produção
```

## Comandos

### Desenvolvimento

```bash
npm run dev
```

Inicia o servidor de desenvolvimento em http://localhost:5173

### Build

```bash
npm run build
```

Cria build de produção na pasta `dist/`

### Preview

```bash
npm run preview
```

Visualiza o build de produção localmente

### Lint

```bash
npm run lint
```

Executa o ESLint no projeto

## Começando

1. Instale as dependências:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra http://localhost:5173 no navegador
