# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PortoEdu is a React 18 application built with TypeScript, Vite, and Tailwind CSS. The project uses React Router for navigation and follows a utility-first CSS approach with custom theming.

## Sobre o PortoEdu – Seu guia no mar das oportunidades

### Resumo
O PortoEdu é uma plataforma educacional que ajuda pessoas a descobrir e entender seus benefícios sociais e oportunidades de estudo. A ideia nasceu de um hackathon e tem como mascote o **Porti**, uma tartaruguinha estudiosa que simboliza sabedoria, calma e persistência — inspirada no estilo acolhedor e didático do Duolingo.

### 🎯 Objetivo
Facilitar o acesso a informações sobre benefícios educacionais e sociais (como bolsas, programas públicos, e auxílios estudantis), transformando a descoberta dessas oportunidades em uma experiência simples, guiada e gamificada.

### 💡 Principais recursos
- Assistente interativo (Porti) que orienta o usuário passo a passo
- Sistema de recomendações baseado no perfil do usuário (idade, cidade, renda, etc)
- Interface acessível e leve, com linguagem amigável e visual inspirador
- Gamificação com conquistas, progressos e incentivo à aprendizagem contínua

### 🧠 Conceito visual
- **Mascote**: Porti, a capivara estudiosa
- **Cores**: tons de verde e laranja, transmitindo calma e energia positiva
- **Estilo**: flat minimalista, limpo e simpático
- **Tom de voz**: gentil, paciente e encorajador

## Development Commands

### Start Development Server
```bash
npm run dev
```
Starts Vite dev server at http://localhost:5173 with hot module replacement.

### Build for Production
```bash
npm run build
```
Runs TypeScript compiler (`tsc -b`) followed by Vite build. Output goes to `dist/`.

### Lint Code
```bash
npm run lint
```
Runs ESLint with TypeScript support. Fix issues before committing.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

## Architecture

### Routing Structure
The app uses React Router v7 with a Layout wrapper pattern:
- `src/App.tsx` - Defines all routes using BrowserRouter
- `src/layouts/Layout.tsx` - Shared layout with navigation and Outlet for child routes
- All routes are nested under the Layout component for consistent navigation

Current routes:
- `/` - Inicial page (landing/home)
- `/form` - Form page
- `/home` - Home page
- `/about` - About page

### Path Aliasing
The project uses `@/` as an alias for `src/`:
- Configured in `vite.config.ts` (resolve.alias)
- Configured in `tsconfig.json` (paths)
- Used for cleaner imports: `import { cn } from '@/lib/utils'`

### Styling System
The project uses Tailwind CSS v4 with a custom theme:

**Color Scheme** (defined in `src/index.css`):
- Background: `#F4FAFF` (light blue-white)
- Primary: `#45E27F` (bright green)
- Primary Dark: `#22C55E` (darker green)
- Text: `#120309` (near black)

**Custom Animations** (defined in `tailwind.config.js`):
- `animate-fade-in` - Basic fade-in with slide up
- `animate-fade-in-delay` - Same with 0.2s delay
- `animate-fade-in-delay-long` - Same with 0.4s delay

### UI Components
The project is configured to use shadcn/ui components with:
- Style: "new-york"
- Components path: `@/components`
- Utils path: `@/lib/utils`
- Aceternity UI registry integration at `@aceternity`
- The `cn()` utility function in `src/lib/utils.ts` combines clsx and tailwind-merge for conditional class merging

### TypeScript Configuration
- Strict mode enabled with additional linting rules:
  - `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
  - `noUncheckedSideEffectImports`
- Target: ES2020
- Module: ESNext with bundler resolution
- JSX: react-jsx (new JSX transform)

## Key Dependencies

- **motion** (`^12.23.24`) - Animation library for React components
- **react-router-dom** (`^7.9.4`) - Routing (note: using v7)
- **clsx** + **tailwind-merge** - Class name management (combined via `cn()` utility)

## Design & UX Principles

### 1. Simplicidade Radical
- **Zero curva de aprendizado**: Avó de 70 anos deve entender
- **Um objetivo por tela**: Nunca confunda o usuário
- **Hierarquia visual clara**: O que fazer AGORA deve gritar

### 2. Gamificação Sutil
- **Micro-celebrações**: Cada ação pequena é recompensada
- **Progresso visível**: Barras, percentuais, checkmarks everywhere
- **Feedback imediato**: Animações confirmam cada ação

### 3. Amigável e Humano
- **Linguagem casual**: "Opa! 🎉" > "Sucesso na operação"
- **Mascote/Personagem**: Avatar guia que "conversa" com usuário

### 4. Mobile-First Always
- **Thumb-friendly**: Botões na parte inferior
- **Gestos naturais**: Swipe, pull-to-refresh
- **Rápido**: <100ms de resposta em interações

## Styling and Component Guidelines

### Styling Approach
**Always use Tailwind CSS for styling.** Do not write custom CSS files or inline styles unless absolutely necessary. Leverage Tailwind utility classes for all styling needs.

### Icons
**Use Phosphor Icons as the default icon library.** Access the icons at https://phosphoricons.com/
- Phosphor Icons offer multiple weights (thin, light, regular, bold, fill, duotone)
- Choose icons that align with the friendly, clean aesthetic of PortoEdu
- Maintain consistency in icon weight across the application

### Component Development
**When creating new components, always try to use a shadcn/ui component as the base.** Before building a component from scratch:
1. Check if shadcn/ui has a similar component
2. Use the MCP shadcn tools to search and view available components
3. Extend or customize the shadcn component using Tailwind classes
4. Only build from scratch if no suitable shadcn component exists

## Important Notes

- The project uses Tailwind CSS v4 with the new `@theme` directive in CSS files
- Animation classes are defined in the Tailwind config and can be used directly in components
- All pages should be placed in `src/pages/` and registered in `src/App.tsx`
- The Layout component provides consistent navigation across all pages
