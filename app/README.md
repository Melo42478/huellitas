# Huellitas Arcoíris — Sitio de adopción canina

Sitio web para un grupo de rescate y adopción de perros sin ánimo de lucro en Querétaro, México. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

**Live domain:** huellitasarcoiris.com (Vercel)

## Tech Stack

- **Frontend:** Next.js (App Router), React 19, TypeScript, Tailwind CSS v4
- **Backend/Database:** Supabase (Postgres, Auth, Storage)
- **Deployment:** Vercel
- **Design:** Figma handoff (`design_handoff_huellitas_arcoiris/`)

## Phase 1 Features

✅ **Implemented:**
- Global layout (Header/Footer with responsive navigation)
- Design token system (colors, typography, shadows, animations)
- Galería screen (`/galeria`) with live dog cards and estado filters
- Detalle screen (`/perrito/[id]`) with before/after, facts, story, sponsorship card
- All 9 routes with stubs for future screens
- Supabase schema (dogs, movimientos tables with RLS policies)
- 5 seed dogs with real photos (rocky, victoria, caramelo) + placeholders (manchas, luna)
- Image optimization via `next/image` with Supabase Storage remote pattern

🔄 **Planned (Phase 2+):**
- Admin panel with real Supabase Auth
- Finance tracking (movimientos CRUD)
- Payment integration (Mercado Pago / PayPal / Stripe)
- Donation modal

## Setup

### Prerequisites

- Node.js 18+ (for Tailwind CSS v4)
- npm or yarn
- A Supabase project (free tier works)
- A Vercel account (for deployment)

### Local Development

1. **Clone / set up project:**
   ```bash
   cd app/
   npm install
   ```

2. **Create Supabase project:**
   - Go to [supabase.com](https://supabase.com), create a free project
   - Note your `Project URL` and `Anon Key`

3. **Apply database schema:**
   - In Supabase dashboard, go to SQL Editor
   - Paste contents of `supabase/migrations/0001_init.sql`
   - Execute

4. **Create Storage bucket:**
   - Supabase Dashboard → Storage → New bucket
   - Name: `dog-photos`
   - Make **Public**

5. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase values:
   # NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   # NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
   # SUPABASE_SERVICE_ROLE_KEY=eyJhbG...  (from Settings → API)
   ```

6. **Seed database:**
   ```bash
   npm run seed
   ```
   This uploads real dog photos to Storage and inserts the 5 seed dogs + finance data.

7. **Run dev server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000

## File Structure

```
src/
  app/
    layout.tsx             # Root layout (Header/Footer, fonts)
    globals.css            # Tailwind + base styles
    page.tsx               # / (home) — stub
    galeria/page.tsx       # /galeria (real screen)
    perrito/[id]/page.tsx  # /perrito/:id (real screen)
    quienes/, adoptar/, donaciones/, historias/, contacto/, admin/  # stubs
  components/
    layout/                # Header, Footer, NavLinks
    dogs/                  # DogCard, StatusBadge, BeforeAfter, DogFacts, SponsorshipCard, DogGallery
    gallery/               # FilterPills (client component for ?estado= param)
    ui/                    # PageStub, EmptyState
  lib/
    types.ts               # TypeScript types (Dog, Movimiento, Estado, etc.)
    dogs.ts                # Helper functions (money, pct, facts, excerpt, etc.) + data queries
    constants.ts           # WhatsApp, Instagram, ubicación, URLs
    placeholder.ts         # SVG placeholder generator for dogs without photos
    supabase/
      server.ts            # Server Supabase client (anon key)
      admin.ts             # Admin Supabase client (service role key, server-only)
public/                    # Static assets (logo.png, instagram-qr.jpeg)
scripts/
  seed.ts                  # One-time seed script (uploads assets, inserts dogs)
supabase/
  migrations/
    0001_init.sql          # Database schema + RLS policies
tailwind.config.ts         # Design tokens (colors, fonts, shadows, radii, etc.)
next.config.ts             # Image remote patterns for Supabase Storage
.env.example               # Template for .env.local
```

## Design Tokens

All colors, typography, shadows, and breakpoints are defined in `tailwind.config.ts` and `src/app/globals.css`. Key token groups:

- **Colors:** `#FBF4E8` (bg), `#16808A` (teal), `#EF9BB4` (pink), `#6FA84E` (green), etc.
- **Fonts:** Baloo 2 (display), Nunito (body)
- **Breakpoints:** 460px (xs), 620px (sm2), 860px (md2)
- **Shadows:** card, card-hover, flip, toast
- **Animations:** floaty, fadeUp, reveal

See the design handoff `design_handoff_huellitas_arcoiris/README.md` for the complete token reference.

## Data Model

### Dogs (`dogs` table)
```
id: text (slug, e.g. 'rocky')
name, estado, sexo, edad, tamano, ubicacion
vacunado, esterilizado: boolean
historia: text (paragraphs separated by \n\n)
meta, recaudado: numeric(10,2) (MXN)
antes, ahora: text (Storage URLs)
gallery: text[] (array of Storage URLs)
created_at, updated_at: timestamptz
```

### Movimientos (`movimientos` table, phase 2+)
```
id: uuid
dog_id: text (nullable = general movement)
tipo: 'ingreso' | 'gasto'
concepto: text
monto: numeric(10,2)
fecha: date
created_at: timestamptz
```

## Deployment

### To Vercel

1. **Connect repo to Vercel** and set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - (Do NOT set `SUPABASE_SERVICE_ROLE_KEY` on Vercel — the seed script runs locally only)

2. **Deploy:**
   ```bash
   git push  # or use Vercel CLI
   ```

3. **Domain:** huellitasarcoiris.com (configure via Vercel Dashboard)

## Styling Guidelines

- Use Tailwind utilities directly in JSX; no CSS modules needed.
- For custom values, extend `tailwind.config.ts`.
- Form focus style defined as `.input-base:focus` in `globals.css`.
- Status colors (`estado`) and fact colors come from `lib/dogs.ts` — no hardcoding hex in components.

## Next Steps (Phase 2)

1. Build `/` (home) with hero, featured dogs, stats
2. Build remaining screens (Quiénes somos, Cómo adoptar, Donaciones, Historias, Contacto)
3. Implement Supabase Auth for admin (`/admin` login form)
4. Build admin CRUD (dog form, finance tracking)
5. Integrate payment processor (Mercado Pago / PayPal / Stripe)
6. Add donations modal
7. Analytics / monitoring

## References

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4)
- Design handoff: `design_handoff_huellitas_arcoiris/README.md`

## License

© 2026 Huellitas Arcoíris — Hecho con ♥ para los que no tienen voz
