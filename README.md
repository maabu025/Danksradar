# Danksradar

Website for **Danksradar**, a subsidiary of Dankslite. Two projects:

```
danksradar/
├── frontend/   the public website (Next.js + Tailwind CSS), port 3000
└── backend/    admin panel, MySQL database and API (Strapi 5), port 1337
```

```
Visitor ──> frontend ──(forms: POST /api/forms/...)──────> backend ──> MySQL
                     <──(content: GET /api/products...)──        └──> email (Resend)
Staff ──> backend /admin
```

## Run both

You need **Node.js 22+** and **MySQL 8** (or MariaDB 10.6+).

1. **Backend** (terminal 1): see `backend/README.md` to create the database first.
   ```bash
   cd backend
   npm install
   cp .env.example .env      # database password + secrets
   npm run develop           # http://localhost:1337/admin
   npm run seed              # in another terminal, once: starter content
   ```
2. **Frontend** (terminal 2)
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev               # http://localhost:3000
   ```

The two must agree on addresses:
- frontend `NEXT_PUBLIC_API_URL` = the backend's address (default http://localhost:1337)
- backend `FRONTEND_URL` = the frontend's address (otherwise the browser blocks the forms)

## Before launch

- [ ] Real contact details, WhatsApp number and office address (`frontend/src/data/site.ts` and Site settings in the admin panel)
- [ ] Final product list and photos
- [ ] Teltonika logo
- [ ] Confirm partnership levels
- [ ] Final About, mission and vision text
- [ ] Hero photos/GIFs and "why us" videos
- [ ] Privacy policy reviewed against the Data Protection Act, 2012 (Act 843)
- [ ] Resend domain verified, Turnstile keys added
- [ ] New random secrets in the backend `.env` on the server
- [ ] Daily MySQL backups and a backup of `backend/public/uploads`
- [ ] Google Analytics with a cookie banner
