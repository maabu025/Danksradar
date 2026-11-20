# Danksradar backend

Admin panel, MySQL database and API for the Danksradar website.

- **Strapi 5** (headless CMS) + **MySQL 8** (MariaDB 10.6+ also works)
- Admin panel: `/admin`
- Content API (read by the website): `/api/products`, `/api/partners`, `/api/platforms`, `/api/categories`, `/api/site-setting`
- Form API (called by the website): `/api/forms/demo-request`, `/api/forms/contact`, `/api/forms/quote-request`
- Runs on **port 1337**

## 1. Create the MySQL database

```sql
CREATE DATABASE danksradar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'danksradar'@'localhost' IDENTIFIED BY 'a-strong-password';
GRANT ALL ON danksradar.* TO 'danksradar'@'localhost';
FLUSH PRIVILEGES;
```

## 2. Run it

Needs **Node.js 22 or newer**.

```bash
npm install
cp .env.example .env     # set DATABASE_PASSWORD and replace every "tobemodified" secret
npm run develop          # first start creates all the tables
```

Open http://localhost:1337/admin and create the first admin account.

Then, in a second terminal, load the starter content (partners, categories, products, platforms, site settings):

```bash
npm run seed
```

Use `npm run develop` while building (auto-reload, and you can edit content types in the admin panel).
In production use `npm run build` then `npm run start`.

## 3. Folders

| Folder | What's inside |
| --- | --- |
| `src/api/product`, `partner`, `category`, `platform` | Website content. The website can only **read** them (`find`, `findOne`). |
| `src/api/site-setting` | Phone, email, address, WhatsApp, homepage numbers |
| `src/api/demo-request`, `quote-request`, `contact-message` | Leads. **Private**: only staff see them in the admin panel. |
| `src/api/forms` | The three form endpoints the website posts to |
| `src/lib` | Form validation, email (Resend), spam check (Turnstile), rate limit |
| `src/index.ts` | On every start, gives the public read-only access to website content |
| `src/admin` | Admin panel branding (logo and purple theme) |
| `config` | Database, server, CORS (`middlewares.ts`), plugins |
| `scripts/seed.js` | Loads the starter content |

Each content type's fields are in `src/api/<name>/content-types/<name>/schema.json`.

## 4. Admin panel

- **Products, Partners, Platforms:** Strapi uses *Draft & Publish*. The website only shows **published** items, so unpublish a product to hide it.
- **Leads:** Demo request, Quote request, Contact message. Change the **status** (new, contacted, won, lost) as sales follow up.
- **Media Library:** upload product photos and partner logos here, then pick them on each product or partner.
- **Staff accounts:** Settings → Administration panel → Users. Give sales staff the **Author** or a custom role.

## 5. How a form submission works

1. The website posts JSON to `/api/forms/...`.
2. CORS only allows the addresses in `FRONTEND_URL`.
3. Each visitor is limited to 5 submissions per 10 minutes.
4. Fields are checked (`src/lib/validation.ts`), then the Turnstile token if `TURNSTILE_SECRET_KEY` is set.
5. The lead is saved in MySQL with status **new**.
6. Sales get an alert and the visitor a confirmation (if `RESEND_API_KEY` is set; otherwise it's printed in the terminal).

## 6. Deploy

Any Node.js host with MySQL works (a VPS, Render, Railway, DigitalOcean, or Strapi Cloud).

- Set every variable from `.env.example` on the host, with **new random secrets**.
- `PUBLIC_URL` = the backend's address (e.g. `https://api.danksradar.com`)
- `FRONTEND_URL` = the website's address (e.g. `https://danksradar.com`)
- Run `npm run build` then `npm run start` (keep it running with PM2 or the host's process manager).
- Uploaded images are saved in `public/uploads` by default. Back that folder up, or add an upload provider (e.g. AWS S3 or Cloudinary) if the host's disk isn't permanent.
- Back up the MySQL database daily (NFR-09).
