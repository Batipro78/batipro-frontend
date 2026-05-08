# BatiPro Frontend

Next.js 15 web app for BatiPro SaaS — artisan management (devis, factures, IA vocale).

## Commands

- `npm run dev` — dev server on localhost:3000
- `npm run build` — production build
- `npm start` — serve production build
- `npm run lint` — eslint

## Architecture

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS v4 — classes in JSX only, no dynamic class objects
- **UI**: shadcn/ui components in `src/components/ui/`
- **Auth**: JWT in localStorage, AuthProvider in `src/lib/auth.tsx`
- **API**: fetch wrapper in `src/lib/api.ts` (auto-injects Bearer token)
- **Deploy**: Vercel

## Key patterns

- Pages in `src/app/` (App Router)
- Auth guard via `ProtectedLayout` component (not middleware.ts)
- `useSearchParams()` must be inside `<Suspense>` (Next.js 15 requirement)
- Tailwind v4: use utility classes directly in JSX, never build class strings dynamically
- API base URL: `NEXT_PUBLIC_API_URL` env var

## Gotchas

- JWT decode is client-side only — no SSR auth checks
- Trial enforcement: 14-day trial, then redirect to `/abonnement`
- CGU modal is non-closable on first login until accepted
- Stripe pages: `/abonnement`, `/abonnement/success`, `/abonnement/cancel`
- Images: remote patterns configured for Supabase Storage in `next.config.ts`
