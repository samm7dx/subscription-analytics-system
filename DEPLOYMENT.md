# Deployment Guide — Subscription Analytic System

Production stack: **Vercel** (frontend) · **Render** (backend) · **Railway** (MySQL)

---

## Deployment checklist

- [ ] Railway MySQL provisioned and schema + sample data imported
- [ ] Render web service deployed with all env vars
- [ ] Render `/health` returns `{ "status": "ok", "database": "connected" }`
- [ ] Vercel frontend deployed with `VITE_API_URL` pointing to Render
- [ ] `FRONTEND_URL` on Render set to exact Vercel URL (no trailing slash)
- [ ] CORS verified: dashboard loads all 8 charts
- [ ] Screenshots added to `docs/screenshots/` and linked in README

---

## 1. Railway MySQL

### Create database

1. Sign in at [railway.app](https://railway.app).
2. **New Project** → **Provision MySQL**.
3. Open the MySQL service → **Connect** → note:
   - `MYSQLHOST` → `DB_HOST`
   - `MYSQLPORT` → `DB_PORT` (usually `3306`)
   - `MYSQLUSER` → `DB_USER`
   - `MYSQLPASSWORD` → `DB_PASSWORD`
   - `MYSQLDATABASE` → create or use `subscription_analytics_system`

### Import schema and data

**Option A — Railway CLI / MySQL client**

```bash
mysql -h <DB_HOST> -P <DB_PORT> -u <DB_USER> -p <DB_NAME> < database/schema.sql
mysql -h <DB_HOST> -P <DB_PORT> -u <DB_USER> -p <DB_NAME> < database/sample_data.sql
```

**Option B — Railway Query tab**

Paste and run `database/schema.sql`, then `database/sample_data.sql`.

### Production notes

- Enable **SSL** for external connections (`DB_SSL=true` on Render).
- Use a strong password; never commit `.env` files.
- Free tier may sleep; first query after idle can be slow.

---

## 2. Render (backend)

### Create service

1. [dashboard.render.com](https://dashboard.render.com) → **New** → **Web Service**.
2. Connect GitHub repo: `samm7dx/subscription-analytics-system`.
3. Settings:

| Setting | Value |
|--------|--------|
| **Root Directory** | `backend` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Health Check Path** | `/health` |

### Environment variables

| Key | Value |
|-----|--------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` (Render sets automatically; optional) |
| `DB_HOST` | Railway host |
| `DB_PORT` | `3306` |
| `DB_USER` | Railway user |
| `DB_PASSWORD` | Railway password |
| `DB_NAME` | `subscription_analytics_system` |
| `DB_SSL` | `true` |
| `FRONTEND_URL` | `https://your-app.vercel.app` (after Vercel deploy) |

4. Deploy → copy service URL, e.g. `https://subscription-analytic-api.onrender.com`.

### Verify API

```bash
curl https://<your-render-url>/health
curl https://<your-render-url>/api/analytics/dau
```

---

## 3. Vercel (frontend)

### Import project

1. [vercel.com](https://vercel.com) → **Add New** → **Project** → import GitHub repo.
2. Settings:

| Setting | Value |
|--------|--------|
| **Framework Preset** | Vite |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### Environment variable

| Key | Value |
|-----|--------|
| `VITE_API_URL` | `https://<your-render-url>/api/analytics` |

3. Deploy → copy production URL.
4. Update Render `FRONTEND_URL` to that Vercel URL → **Redeploy** backend.

### Local production build test

```bash
cd frontend
cp .env.production.example .env.production
# Edit VITE_API_URL to your Render URL
npm run build
npm run preview
```

---

## 4. Environment variable summary

### Backend (Render)

```env
NODE_ENV=production
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=subscription_analytics_system
DB_PORT=3306
DB_SSL=true
FRONTEND_URL=https://your-project.vercel.app
```

### Frontend (Vercel)

```env
VITE_API_URL=https://your-service.onrender.com/api/analytics
```

---

## 5. GitHub push

```bash
git add .
git status
git commit -m "Add production deployment config and documentation"
git remote add origin https://github.com/samm7dx/subscription-analytics-system.git
git branch -M main
git push -u origin main
```

---

## 6. Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS error in browser | Set `FRONTEND_URL` on Render to exact Vercel origin; redeploy backend |
| 500 on analytics routes | Check Railway credentials, `DB_SSL=true`, schema imported |
| Empty charts | Confirm `VITE_API_URL` ends with `/api/analytics` |
| Render cold start | Free tier sleeps ~50s; wait and refresh |
| MySQL connection refused | Verify Railway public networking / TCP proxy enabled |

---

## Live URLs (fill after deploy)

| Service | URL |
|---------|-----|
| Frontend (Vercel) | `https://________________.vercel.app` |
| Backend (Render) | `https://________________.onrender.com` |
| Database (Railway) | Private — credentials in Railway dashboard |
