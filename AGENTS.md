# AGENTS.md - Agentic Coding Guidelines

This document provides agentic coding guidelines for the Kabir Doha Cards project.

---

## Tech Stack

| Category        | Technology               |
| --------------- | ------------------------ |
| Framework       | Next.js 16 (App Router)  |
| Language        | TypeScript (Strict mode) |
| API             | External REST API        |
| Styling         | Tailwind CSS + SCSS      |
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
│   ├── options/          # Card customization controls
│   │   ├── ColorInput.tsx
│   │   ├── CopyButton.tsx
│   │   ├── DownloadButton.tsx
│   │   ├── OptionsBox.tsx
│   │   ├── RandomButton.tsx
│   │   ├── RangeSliderInput.tsx
│   │   ├── SearchInput.tsx
│   │   └── SearchModal.tsx
│   ├── preview/          # Card preview components
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
├── constants/             # Site configuration and SEO
│   ├── colors.ts         # Color constants
│   └── seo.ts           # SEO metadata and site config
│
├── styles/                # Global styles
│   └── globals.scss      # SCSS styles
│
└── utils/                 # Utility functions
    ├── classNameUtils.ts # Class name utilities (clsx)
    ├── download.ts       # Image download functionality
    ├── fetchCouplets.ts  # Fetch Doha from external API
    ├── preview.ts        # Preview calculations
    ├── share.ts          # Share functionality
    ├── toast.ts          # Toast notifications
    └── url.ts            # URL utilities
```

---

## External API Integration

This project uses the Kabir Ke Dohe API as an external data source via `fetchCouplets()` utility:

- **Base URL**: `https://kabir-ke-dohe-api.vercel.app`
- **Endpoint**: `/api/couplets`
- **Method**: POST

```typescript
import { fetchCouplets } from "@/utils/fetchCouplets";

// Fetch random Doha
const couplets = await fetchCouplets();
```

---

## Scripts

```bash
# Development
bun run dev              # Start development server with turbopack
bun run build            # Build for production
bun run start            # Start production server

# Linting & Formatting
bun run lint             # Lint all files
bun run lint:fix         # Fix auto-fixable issues
bun run format           # Format files
bun run format:check     # Check formatting

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

Output the exact git commands. Do NOT commit automatically.

---

## Available Commands

```bash
# Development
bun run dev              # Start development server with turbopack
bun run build            # Build for production
bun run start            # Start production server

# Linting & Formatting
bun run lint             # Lint all files
bun run lint:fix         # Fix auto-fixable issues
bun run format           # Format files
bun run format:check     # Check formatting

# Testing
bun run test             # Run tests once
bun run test:watch       # Run tests in watch mode
bun run test:coverage    # Run tests with coverage

# SEO
bun run postbuild        # Generate sitemap after build
bun run indexnow         # Submit sitemap to IndexNow
```

---

## Utils Knowledge Base

### Utility Functions (`src/utils/`)

| File                | Function                         | Description                                     |
| ------------------- | -------------------------------- | ----------------------------------------------- |
| `classNameUtils.ts` | `cn(...classes)`                 | Merge class names using clsx and tailwind-merge |
| `download.ts`       | `downloadImage(dataUrl)`         | Download preview as PNG image                   |
| `fetchCouplets.ts`  | `fetchCouplets()`                | Fetch random Doha from external API             |
| `preview.ts`        | `calcFontSize(screenWidth, ...)` | Calculate dynamic font size for preview         |
| `preview.ts`        | `formatCouplet(couplet)`         | Format couplet into max 4 lines                 |
| `share.ts`          | `shareOnTwitter(text, url)`      | Open Twitter share dialog                       |
| `share.ts`          | `copyToClipboard(text)`          | Copy text to clipboard                          |
| `toast.ts`          | `toast.success(message)`         | Show success toast notification                 |
| `toast.ts`          | `toast.error(message)`           | Show error toast notification                   |
| `url.ts`            | `getCanonicalUrl()`              | Get base URL for the application                |

---

## Coding Standards

### Naming

- Components: `PascalCase` (`OptionsBox.tsx`)
- Functions: `camelCase` (`fetchCouplets`, `calcFontSize`)
- Files: `PascalCase` for components, `camelCase` for utils
- Constants: `SCREAMING_SNAKE_CASE` (`MAX_RETRIES`) or `PascalCase` for exports

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
