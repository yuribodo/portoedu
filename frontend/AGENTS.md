# Repository Guidelines

## Project Structure & Module Organization
- `src/` hosts all TypeScript sources. Use `components/` for reusable UI (place primitives in `components/ui/`), `pages/` for routed screens, `layouts/` for shared chrome, `data/` for static datasets, and `lib/` for utility helpers.
- `assets/` keeps bundled static media referenced from `src`. Avoid committing generated files into `dist/`; that directory is produced by the build.
- `index.html`, `vite.config.ts`, and `tailwind.config.js` control the Vite pipeline; prefer editing these over duplicating config.
- Path aliases are configured via `tsconfig.json` (`@/` maps to `src/`); use them to avoid deep relative imports.

## Build, Test, and Development Commands
- `npm install` — install or refresh dependencies. Re-run after updating `package.json`.
- `npm run dev` — launch the Vite dev server on http://localhost:5173 with hot module replacement.
- `npm run build` — run `tsc -b` type checks then emit a production build in `dist/`.
- `npm run preview` — serve the contents of `dist/` for a production-like smoke test.
- `npm run lint` — execute ESLint across the codebase; append `-- --fix` to auto-apply safe fixes.

## Coding Style & Naming Conventions
- Use TypeScript with React function components. Name components and files with `PascalCase` (e.g., `OpportunityCard.tsx`), hooks with `use` prefixes, and helpers in `camelCase`.
- Follow the existing 2-space indentation, no semicolons, and trailing commas where ESLint requests them.
- Co-locate Tailwind utility classes in JSX; extract shared styling into small components rather than global CSS. Keep global styles in `src/index.css`.
- Before pushing, run `npm run lint` to ensure the ESLint flat config passes; align with suggested fixes instead of overriding rules.

## Testing Guidelines
- Automated tests are not wired up yet; add new suites with Vitest if needed and place specs alongside the source (`Feature.test.tsx`) or under `src/__tests__/`.
- For now, gate changes with manual smoke tests in the dev server and, when applicable, share reproduction steps in the PR description.

## Commit & Pull Request Guidelines
- Craft concise, present-tense commit subjects (“Add layout shell for public pages”) and expand with context in the body when necessary.
- Keep PRs focused. Include a short summary, screenshots or GIFs for UI changes, and link to related issues or Linear tickets.
- Note any new scripts, env requirements, or manual QA steps so reviewers can verify quickly.
