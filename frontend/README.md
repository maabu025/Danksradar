# Danksradar frontend

The public Danksradar website.

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS 4**
- Runs on **port 3000**
- Sends form submissions to the **backend** (Strapi, `NEXT_PUBLIC_API_URL`, default http://localhost:1337)

## Run it

Needs Node.js 20.9+. Start the backend first if you want the forms to work.

```bash
npm install
cp .env.example .env        # NEXT_PUBLIC_API_URL should point to the backend
npm run dev
```

Open http://localhost:3000.

## Folders

| Folder | What's inside |
| --- | --- |
| `src/app/(frontend)/` | Pages: Home, Solutions, Management Platforms, Products & Services, product details, Partners, partner pages, About, Contact, Request a demo, Privacy policy, 404 |
| `src/components/layout/` | Nav with drop-downs and mobile menu, footer, logo, WhatsApp button |
| `src/components/home/` | Hero slideshow, "why us" video strip, solutions grid, partners slideshow, FAQ, call-to-action band |
| `src/components/products/` | Product card, search + filters, products overview |
| `src/components/partners/` | Partner card and logo, partnership level, 2×2 device grid |
| `src/components/platforms/` | Management platform card |
| `src/components/forms/` | Demo, contact and quote forms |
| `src/components/ui/` | Buttons, cards, form fields, section headers, image placeholders |
| `src/data/` | Starter content: menu, solutions, partners, products, platforms, FAQ, contact details |
| `src/lib/api.ts` | Backend address, form endpoints and a helper to read content from the backend |
| `src/app/globals.css` | Brand colours and font, defined once |
| `src/fonts/` | Poppins font files |
| `public/` | Logos, images, videos, favicon |

## Brand

| Name | Hex | Tailwind class |
| --- | --- | --- |
| Deep purple | `#241446` | `bg-deep`, `text-deep` |
| Purple | `#8A3FF0` | `bg-purple`, `text-purple` |
| Electric purple | `#A259FF` | `bg-electric` |
| Lavender | `#F3EEFF` | `bg-lav` |
| White | `#FFFFFF` | `bg-white` |

## Common changes

- **Menu:** `src/data/navigation.ts` (Management Platforms holds the Products & Services menu)
- **Contact details:** `src/data/site.ts`
- **Products:** `src/data/products.ts`; photos go in `public/images/products/`
- **Hero slides:** the `slides` list at the top of each page
- **"Why us" videos:** `public/videos/` + `src/components/home/WhyUsStrip.tsx`
- **Teltonika logo:** `public/logos/partners/teltonika-logo.png` + `src/data/partners.ts`

## Reading content from the admin panel

Pages use the starter content in `src/data/` for now. When staff have entered the real content in the backend, load it with:

```ts
import { fetchCollection, mediaUrl } from '@/lib/api'

const { data } = await fetchCollection('products', 'populate[0]=partner&populate[1]=category&populate[2]=images&sort=sortOrder:asc')
```

Only **published** items are returned, so staff hide a product by unpublishing it.

## Deploy

Deploy to Vercel as its own project. Set `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL` (the backend's live address)
and `NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
