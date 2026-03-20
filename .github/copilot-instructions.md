# Copilot Instructions

You are an expert Senior Developer in a Next.js 16 environment. Your role is to write clean, performant, and type-safe code following the exact specifications below.

---

## 1. Tech Stack

| Category        | Technology               |
| --------------- | ------------------------ |
| Framework       | Next.js 16 (App Router)  |
| Language        | TypeScript (Strict mode) |
| API             | External REST API        |
| Validation      | Zod                      |
| Styling         | Tailwind CSS + SCSS      |
| Icons           | React Icons              |
| UI Library      | Custom components        |
| Testing         | Vitest                   |
| Package Manager | Bun                      |

---

## 2. Project Architecture

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

## 3. External API Integration

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

## 4. Available Commands

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

## 5. Utils Knowledge Base

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

## 6. Coding Style

### Naming Conventions

| Type                | Convention           | Example            |
| ------------------- | -------------------- | ------------------ |
| Components          | PascalCase           | `OptionsBox.tsx`   |
| Functions/Variables | camelCase            | `fetchCouplets`    |
| Files               | PascalCase/camelCase | `fetchCouplets.ts` |
| Constants           | SCREAMING_SNAKE_CASE | `MAX_RETRIES`      |

### Import Order

1. React/Next.js built-ins
2. External libraries
3. Internal aliases (`@/`)
4. Relative imports (`../`, `./`)

---

## 7. Formatting (Prettier)

Follow the project's Prettier configuration. Check `prettier.config.mjs` before generating code.

```json
{
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

**Important**: Always format code blocks according to these rules.

---

## 8. TypeScript Standards

### Types vs Interfaces

```typescript
// Use interface for object shapes
interface UserSettings {
  color: string;
  fontSize: number;
}

// Use type for unions and tuples
type Status = "idle" | "loading" | "success" | "error";
```

### Strict Rules

- **NO `any`**: Use `unknown` if uncertain
- **Avoid `!`**: Use optional chaining `?.` or logical checks
- **Explicit returns**: Always define return types for exported functions

---

## 9. React Best Practices

- **Components**: Functional components only
- **Hooks**: Extract logic to custom hooks
- **Props**: Destructure in function signature
- **Memoization**: Use `useMemo` for expensive calculations, `useCallback` only when necessary

---

## 10. Testing (Vitest)

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

## 11. JSDoc Documentation

Add JSDoc comments for:

- Exported functions and hooks
- Complex utility functions
- Types and interfaces

Skip for:

- Obvious props (`className`, `children`)
- Simple interfaces

```typescript
/**
 * Fetches random Doha couplets from the server.
 *
 * @returns {Promise<Array<string> | null>} The fetched couplets or null in case of error.
 */
export async function fetchCouplets(): Promise<Array<string> | null> {
  // implementation
}
```

---

## 12. Commit Message Format

```
# Subject line: lowercase, max 50 characters
fix: standardize react types in components

# Body: can have normal case, describe changes
- Add react import for consistent type usage
- Use React.JSX.Element for return types
```

### Rules

- Subject line: lowercase only, max 50 characters
- Body: normal case allowed, max 72 characters per line
- Use conventional commits format (type: subject)

---

## 13. Committing Changes

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
