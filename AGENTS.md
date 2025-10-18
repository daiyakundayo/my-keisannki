# Repository Guidelines

## Project Structure & Module Organization
Store all calculator logic in `src/core/` as pure TypeScript modules so they can be reused by any interface. Place UI or interface layers—whether React components or CLI wrappers—inside `src/components/`, keeping each feature in its own folder with an `index.tsx` entry. Shared utilities belong in `src/utils/`, while static assets (icons, sounds, localization files) live under `public/assets/`. Test fixtures or mock data should sit in `tests/fixtures/`. When adding a feature, pair the core logic update with a matching component and include a short README if the flow is non-obvious.

## Build, Test, and Development Commands
- `npm install`: install dependencies defined in `package.json`; run after syncing with `main`.
- `npm run dev`: launch the Vite dev server on `http://localhost:5173` for rapid UI feedback.
- `npm run build`: create optimized bundles in `dist/`; verify before tagging a release.
- `npm test`: execute the unit test suite in watch mode; use `npm run test:ci` for the headless CI configuration.
Document any new scripts inside `package.json` and mirror them in the project README to keep onboarding quick.

## Coding Style & Naming Conventions
Write all new code in strict TypeScript. Format with Prettier (2-space indent, single quotes, trailing commas where valid) and lint with ESLint before opening a PR. Use camelCase for variables/functions, PascalCase for components or classes, and SCREAMING_SNAKE_CASE for constants. File and directory names stay kebab-case (`memory-store.ts`). Keep functions under 40 lines; extract helpers rather than nesting deeply. Inline comments should explain intent, not mechanics.

## Testing Guidelines
Place Jest/Vitest specs in `tests/`, mirroring the source path (`src/core/add.ts` → `tests/core/add.test.ts`). Unit tests cover edge cases (negative numbers, overflow). Integration or UI smoke tests go under `tests/integration/` with the `.spec.ts` suffix. Aim for ≥90% statement coverage on `src/core/` and quality assertions on UI rendering. Use `npm run test:ci` locally before pushing if you touched calculator math or formatting logic.

## Commit & Pull Request Guidelines
Write commits with imperative subjects (“Add memory recall command”) and keep the body for rationale or follow-up TODOs. Reference issues in the body (`Refs #12`) and squash before merging. Pull requests need: a concise summary, testing evidence (command output or screenshots), noted side effects, and any blocked work. Link design discussions when behavior changes. Request at least one review, address feedback promptly, and update documentation when behavior or public APIs shift.

## Agent Workflow Tips
Sync from `main` before starting, and log architectural decisions in `docs/` if they affect calculator math or UI flows. Favor small, reviewable slices over broad rewrites. When touching shared utilities, notify owners and include migration notes in the PR description to avoid downstream regressions.
日本語ですべて答えてください