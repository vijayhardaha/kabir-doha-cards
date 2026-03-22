# AGENTS.md - Agentic Coding Guidelines

This document provides agentic coding guidelines for the Kabir Doha Cards project.

---

## Tech Stack

| Category        | Technology               |
| --------------- | ------------------------ |
| Framework       | Next.js 16 (App Router)  |
| Language        | TypeScript (Strict mode) |
| API             | External REST API        |
| Styling         | Custom SCSS only         |
| Icons           | React Icons              |
| Testing         | Vitest                   |
| Package Manager | Bun                      |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router - routing only
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles (CSS variables)
│
├── components/             # Reusable UI components
│   ├── drawer/            # Drawer component for modals
│   │   └── Drawer.tsx
│   ├── options/           # Card customization controls
│   │   ├── ActionButton.tsx
│   │   ├── ColorInput.tsx
│   │   ├── CopyButton.tsx
│   │   ├── DownloadButton.tsx
│   │   ├── ImageDrawer.tsx
│   │   ├── OptionsBox.tsx
│   │   ├── RandomButton.tsx
│   │   ├── SearchDrawer.tsx
│   │   └── SearchInput.tsx
│   ├── preview/           # Card preview components
│   │   ├── AuthorSignature.tsx
│   │   ├── BackgroundElement.tsx
│   │   ├── CoupletContent.tsx
│   │   ├── CoupletText.tsx
│   │   ├── PreviewBox.tsx
│   │   ├── QuoteIcon.tsx
│   │   ├── SideAuthor.tsx
│   │   └── WebsiteInfo.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Logo.tsx
│   └── MainContent.tsx
│
├── constants/              # Site configuration and constants
│   ├── card.ts
│   ├── colors.ts
│   └── seo.ts
│
├── hooks/                  # Custom React hooks
│   ├── useImageDownload.tsx
│   └── useSearchCouplets.tsx
│
├── styles/                 # Global styles
│   ├── _variables.scss    # SCSS variables
│   ├── _mixins.scss       # SCSS mixins
│   ├── globals.scss       # Global imports
│   └── components/        # Component styles
│       ├── _drawer.scss
│       └── options/       # Option component styles
│
├── types/                  # TypeScript type definitions
│   ├── api.ts
│   ├── common.ts
│   ├── components.ts
│   ├── couplet.ts
│   └── index.ts
│
└── utils/                  # Utility functions
    ├── classnames.ts      # Class name utilities
    ├── download.ts        # Image download functionality
    ├── fetch-couplets.ts  # Fetch Doha from external API
    ├── preview.ts         # Preview calculations
    ├── seo.ts             # SEO utilities
    ├── share.ts           # Share functionality
    └── toast.ts           # Toast notifications
```

---

## External API Integration

This project uses the Kabir Ke Dohe API as an external data source:

- **Base URL**: `https://kabir-ke-dohe-api.vercel.app`
- **Endpoint**: `/api/couplets`
- **Method**: POST

```typescript
import fetchCouplets from "@/utils/fetch-couplets";

// Fetch random Doha
const { data, error } = await fetchCouplets("random");
```

---

## Scripts

```bash
# Development
bun run dev              # Start dev server with turbopack
bun run build            # Build for production
bun run start            # Start production server

# Linting & Formatting
bun run lint             # Lint all files
bun run lint:fix         # Fix auto-fixable issues
bun run format           # Format files
bun run format:check     # Check formatting

# SCSS Linting
bun run lint:scss        # Lint SCSS files
bun run lint:scss:fix    # Fix SCSS lint issues

# Testing
bun run test             # Run tests once
bun run test:watch       # Run tests in watch mode
bun run test:coverage    # Run tests with coverage

# SEO
bun run postbuild        # Generate sitemap after build
bun run indexnow         # Submit sitemap to IndexNow
```

---

## Commit Message Format

```
# Subject line: lowercase, max 50 characters
fix: standardize react types in components

# Body: can have normal case, describe changes
- Add react import for consistent type usage
- Use React.JSX.Element for return types
```

---

## Committing Changes

NEVER commit or stage automatically unless user explicitly asks once for a specific task.

After completing a task:

1. Run `git status` and `git diff` to review changes
2. Group changes into logical commits:
   - **One file changed**: Single commit
   - **Multiple files with similar changes**: One commit per logical change
   - **Unrelated changes**: Separate commits
3. Prepare `git add` and `git commit` commands following commitlint rules:
   - Max subject: 50 characters
   - Max body line: 72 characters
   - Subject must be lowercase
4. Update git.md with the new prepared commands
5. Remove stale commits from git.md when changes are committed

Output the exact git commands. Do NOT commit or stage automatically.

---

## Coding Standards

### Naming

- Components: `PascalCase` (`OptionsBox.tsx`)
- Functions: `camelCase` (`fetchCouplets`, `calcFontSize`)
- Files: `PascalCase` for components, `camelCase` for utils
- Constants: `SCREAMING_SNAKE_CASE` (`MAX_RETRIES`) or `PascalCase` for exports
- Hooks: `camelCase` with "use" prefix (`useImageDownload`)

### Function Declaration Rules

CRITICAL: All functions, interfaces, and types MUST use named declarations with inline exports:

```typescript
// CORRECT - Named function with inline export
export function useImageDownload(): ImageDownloadState { ... }
export default function SearchDrawer(props): JSX.Element { ... }

// CORRECT - Interface/type with inline export
export interface ImageDrawerProps { ... }
export type DrawerDirection = 'bottom' | 'right';

// INCORRECT - const arrow functions
const useImageDownload = (): ImageDownloadState => { ... };
const SearchDrawer = (props) => { ... };

// INCORRECT - Separate export statements
function useImageDownload() { ... }
export { useImageDownload };
```

### Import Order

1. React/Next.js built-ins
2. External libraries
3. Internal aliases (`@/`)
4. Relative imports (`../`, `./`)

### TypeScript

- Use `interface` for object shapes
- Use `type` for unions and tuples
- Use explicit return types on exported functions
- NO `any` - use `unknown` if uncertain
- Avoid `!` - use optional chaining

---

## Validation (Zod)

```typescript
import { z } from "zod";

const SearchSchema = z.object({ search: z.string().min(1) });
```

---

## Testing (Vitest)

Tests are located alongside the code they test with `.test.ts` or `.test.tsx` extension.

```bash
# Run tests in watch mode
bun run test:watch

# Run tests once
bun run test
```

### Test File Conventions

- Test files use `.test.ts` or `.test.tsx` extension
- Place tests next to the code they test (same directory)
- Use descriptive test names: `describe('FunctionName', () => { it('should...') })`

---

## JSDoc Requirements

Add JSDoc to:

- Exported functions and hooks
- Complex utility functions
- Types and interfaces

Skip for:

- Obvious props (`className`, `children`)
- Simple interfaces
