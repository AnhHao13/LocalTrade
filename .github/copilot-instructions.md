# Copilot Instructions - E-commerce Frontend

## Tech Stack

- **Next.js 16** with App Router, TypeScript, React 19, Tailwind CSS v4
- **State**: Zustand with persist middleware (see `stores/`)
- **UI**: Radix primitives via shadcn/ui (components in `components/ui/`)
- **i18n**: i18next with locale-prefixed routing (`/[locale]/...`)

## Project Architecture

### Routing & Internationalization

- All pages live under `app/[locale]/` — locale is extracted from URL path
- **Single source of truth**: [i18n.config.ts](i18n.config.ts) — add new languages here only
- Middleware handles locale detection (Cookie → Accept-Language → default `en`)
- Server Components: use `createTranslation(locale, namespace)` from `app/[locale]/i18n/server.ts`
- Client Components: use `useTranslation(namespace)` from `app/[locale]/i18n/client.ts`
- Translation files: `app/[locale]/i18n/locales/{locale}/{namespace}.json`

### Type System (Domain vs DTO)

- **Domain types** (`types/*.types.ts`): camelCase, used throughout the app (`Product`, `User`, `Cart`)
- **API DTOs** (`types/api/*.dto.ts`): snake_case, match backend responses (`ProductDTO`)
- Services map DTOs → Domain types (see `mapProductDTO` in [services/product.service.ts](services/product.service.ts))

### API Layer

- All API calls go through `services/api-client.ts` — **never use fetch() directly**
- API client auto-adds locale prefix: `/api/{locale}/...`
- Service pattern: factory function returns typed methods (`createProductService(locale)`)
- Auth tokens stored in Zustand + localStorage (see `setAccessToken`/`getAccessToken`)

### Layouts

- Export layouts from `layouts/index.ts` (e.g., `MainLayout`, `AuthLayout`, `ShopLayout`)
- Wrap pages in appropriate layout; `MainLayout` includes Header/Footer by default
- Providers hierarchy: `ThemeProvider` → `LocaleProvider` → `I18nProvider`

## Key Patterns

### Components

```tsx
// Client component with translations
"use client";
import { useTranslation } from "@/app/[locale]/i18n/client";

export function MyComponent() {
  const { t } = useTranslation("common"); // namespace
  return <span>{t("key.nested")}</span>;
}
```

### Services

```typescript
// Always use service factories, never raw fetch
import { createProductService } from "@/services";
const productService = createProductService(locale);
const products = await productService.getProducts({ page: 1 });
```

### Adding a New Language

1. Add locale code to `LANGUAGES` array in `i18n.config.ts`
2. Create folder `app/[locale]/i18n/locales/{newLocale}/`
3. Copy & translate JSON files from `/en/`

## Conventions

- Use `cn()` from `lib/utils.ts` for conditional class merging
- Import UI components from `@/components/ui/*` (shadcn pattern)
- Barrel exports: `components/home/index.ts`, `services/index.ts`, `types/index.ts`
- Icons: Lucide React (`lucide-react`)

## Commands

```bash
pnpm dev      # Development server
pnpm build    # Production build
pnpm lint     # ESLint
```
