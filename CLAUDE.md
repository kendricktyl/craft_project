# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint via next lint
```

No test suite is configured.

## Architecture

**Craft** is a Next.js 16 App Router e-commerce site for handmade fiber arts (crochet toys, flowers, sewn clothes). It uses Supabase for data and Zustand for client-side cart state.

### Data flow

- Server components (`app/page.tsx`, `app/products/page.tsx`) fetch directly from Supabase using `lib/supabase.ts` and ISR (`export const revalidate = 60`).
- The product detail page renders `<ProductCustomizer>` — the main interactive client component — which handles color variant selection, cart actions, and wishlist toggle.
- Cart state lives in `lib/cartStore.ts` (Zustand `persist` middleware, key `craft-cart`). Cart items use a composite ID `${product.id}-${variant.id}` so the same product in different colors is tracked separately.

### Key files

| Path | Purpose |
|------|---------|
| `lib/supabase.ts` | Supabase browser client (anon key) |
| `lib/cartStore.ts` | Zustand cart store — `CartItem` type, `addItem/removeItem/updateQuantity/clearCart` |
| `types/database.ts` | Canonical `Product` and `ProductVariant` TypeScript types |
| `components/ProductCustomizer.tsx` | Full product detail UI — variant swatch picker, add-to-bag, wishlist |
| `schema.sql` | Supabase schema + seed data (run in SQL Editor to reset) |

> `components/AddToCartButton.tsx` is a legacy component that imports from `lib/placeholder.ts`. Prefer `ProductCustomizer` and `types/database.ts` for any new product-related work.

### Database schema

`products` → `product_variants` (one-to-many). Variants carry `hex_code`, `color_name`, `stock_status` (`in_stock` | `low_stock` | `out_of_stock`), `stock_count`, and `price_modifier`. Orders and wishlists require Supabase Auth (`auth.uid()`). All tables have RLS enabled — products and variants are publicly readable; orders/wishlists are user-scoped.

### Design system

Custom Tailwind tokens (see `tailwind.config.ts`):
- **Colors:** `terracotta` (#C17B5C), `pattina` (#5B8FA8), `cream-{50,100,200,300}`, `clay`, `sidney`
- **Fonts:** `font-display` → Cormorant Garamond (serif, editorial), `font-sans` → DM Sans (body)
- Typography style: small caps labels use `text-[10px] tracking-[0.3em] uppercase font-sans`

### Environment variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
