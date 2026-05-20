# Subscription Analytic System

**DBMS Project** — Full-stack web application for subscription data analysis using MySQL, Express.js, and React.

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5-000000)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1)](https://www.mysql.com/)

**Repository:** [github.com/samm7dx/subscription-analytics-system](https://github.com/samm7dx/subscription-analytics-system)

---

## Description

**Subscription Analytic System** is a DBMS course project that stores subscription, user, content, and activity data in MySQL and exposes eight SQL-based analytics endpoints. The React dashboard visualizes results with charts, a metric reference section, and an inspectable SQL query viewer.

---

## Features

- **8 SQL analytics queries** — DAU, revenue, top content, churn, engagement, monthly revenue, active users, genre engagement
- **Interactive dashboard** — line, area, bar, pie, doughnut charts, KPI cards, leaderboard table
- **Metric Reference** — definitions, schema mapping, SQL logic, and example insights per metric
- **SQL query viewer** — syntax-highlighted queries with copy button
- **Summary KPI cards** — revenue, DAU, active subscriptions, average engagement
- **REST API** — JSON responses with `title`, `description`, `query`, `chartType`, `data`
- **Production deployment** — Vercel + Render + Railway MySQL

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 8, Tailwind CSS 4 |
| Charts | Recharts |
| UI motion | Framer Motion |
| HTTP client | Axios |
| Backend | Node.js, Express.js 5 |
| Database | MySQL 8 |
| Deployment | Vercel, Render, Railway |

---

## Screenshots

> Add PNG/JPG files under `docs/screenshots/` and replace placeholders below.

| Home / Hero | Summary KPIs |
|-------------|----------------|
| ![Dashboard hero](./docs/screenshots/hero.png) | *Placeholder — add `hero.png`* |

| Metric Reference | Analytics charts |
|------------------|------------------|
| ![Metric reference](./docs/screenshots/knowledge.png) | *Placeholder — add `knowledge.png`* |

| SQL query viewer | Mobile layout |
|------------------|---------------|
| ![SQL viewer](./docs/screenshots/query.png) | *Placeholder — add `mobile.png`* |

---

## Database schema

Six normalized tables:

```
Users ──┬── Subscriptions ── Plans
        ├── WatchHistory ── Content
        └── UserLogs
```

| Table | Purpose |
|-------|---------|
| `Users` | User accounts (`user_id`, `name`, `email`, `signup_date`, `last_active`) |
| `Plans` | Subscription plans (`plan_id`, `plan_name`, `price`, `duration_days`) |
| `Subscriptions` | User subscriptions (`status`: active, expired, cancelled) |
| `Content` | Media catalog (`title`, `genre`, `duration`) |
| `WatchHistory` | Viewing sessions (`watch_duration`, `watch_time`) |
| `UserLogs` | Activity logs (`action`, `log_time`) |

**Files:** `database/schema.sql` · `database/sample_data.sql` · `analytics/queries.sql`

---

## Analytics overview

| # | Metric | Chart type | Primary tables |
|---|--------|------------|----------------|
| 1 | Daily Active Users (DAU) | Line | `UserLogs` |
| 2 | Total Revenue | KPI | `Subscriptions`, `Plans` |
| 3 | Top Watched Content | Bar | `WatchHistory`, `Content` |
| 4 | User Churn Analysis | Pie | `Subscriptions` |
| 5 | User Engagement | Bar | `Users`, `WatchHistory` |
| 6 | Monthly Revenue Trend | Area | `Subscriptions`, `Plans` |
| 7 | Most Active Users | Leaderboard | `Users`, `UserLogs` |
| 8 | Genre Engagement | Doughnut | `WatchHistory`, `Content` |

---

## API endpoints

Base URL (local): `http://localhost:5000/api/analytics`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/dau` | Daily active users |
| `GET` | `/revenue` | Total revenue (active subscriptions) |
| `GET` | `/top-content` | Top 10 content by views |
| `GET` | `/churn` | Subscription status distribution |
| `GET` | `/engagement` | User sessions and avg watch time |
| `GET` | `/monthly-revenue` | Monthly revenue trend |
| `GET` | `/active-users` | Top 10 users by log activity |
| `GET` | `/genre-engagement` | Views and duration by genre |

**Health check:** `GET /health` · **API root:** `GET /`

**Sample response shape:**

```json
{
  "title": "Daily Active Users",
  "description": "Displays unique active users for each day based on logs.",
  "query": "SELECT ...",
  "chartType": "line",
  "generatedFrom": "Computed from UserLogs table records.",
  "data": []
}
```

---

## Project structure

```
subscription-analytics-system/
├── frontend/                 # React + Vite (Vercel)
│   ├── src/
│   │   ├── components/       # UI, charts, knowledge center
│   │   ├── pages/            # Dashboard
│   │   ├── services/         # API client
│   │   ├── data/             # Metric reference content
│   │   └── constants/        # Branding strings
│   ├── vercel.json
│   └── .env.example
├── backend/                  # Express API (Render)
│   ├── config/db.js
│   ├── controllers/
│   ├── routes/
│   └── .env.example
├── database/
│   ├── schema.sql
│   └── sample_data.sql
├── analytics/
│   └── queries.sql
├── docs/screenshots/
├── DEPLOYMENT.md
├── render.yaml
├── LICENSE
└── README.md
```

---

## Local setup

### Prerequisites

- Node.js 18+
- MySQL 8 (local or Docker)

### 1. Database

```bash
mysql -u root -p -e "CREATE DATABASE subscription_analytics_system;"
mysql -u root -p subscription_analytics_system < database/schema.sql
mysql -u root -p subscription_analytics_system < database/sample_data.sql
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
npm install
npm run dev
```

API runs at `http://localhost:5000`.

### 3. Frontend

```bash
cd frontend
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api/analytics
npm install
npm run dev
```

App runs at `http://localhost:5173`.

### Production build (local)

```bash
cd frontend && npm run build && npm run preview
cd backend && npm start
```

---

## Deployment

Full step-by-step guide: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

| Service | Hosts |
|---------|--------|
| Frontend | [Vercel](https://vercel.com) — root `frontend`, env `VITE_API_URL` |
| Backend | [Render](https://render.com) — root `backend`, health `/health` |
| Database | [Railway](https://railway.app) MySQL — import `database/*.sql` |

**Quick env reference:**

```env
# Render (backend)
DB_HOST= DB_USER= DB_PASSWORD= DB_NAME=subscription_analytics_system
DB_PORT=3306 DB_SSL=true FRONTEND_URL=https://your-app.vercel.app

# Vercel (frontend)
VITE_API_URL=https://your-api.onrender.com/api/analytics
```

---

## Environment variables

| File | Purpose |
|------|---------|
| `backend/.env.example` | Backend local/production template |
| `frontend/.env.example` | Local `VITE_API_URL` |
| `frontend/.env.production.example` | Vercel production template |

Never commit `.env` files with real credentials.

---

## Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit changes with clear messages.
4. Open a pull request describing schema/API/UI impact.

Please keep the academic **DBMS Project** tone in UI copy and documentation.

---

## License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE).

Copyright (c) 2026 SAMRIDH RAJ

---

## Authors

- **SAMRIDH RAJ** — [GitHub @samm7dx](https://github.com/samm7dx)

Database schema contributors noted in SQL file headers.

---

## Acknowledgments

Built as a **DBMS Project** demonstrating relational schema design, SQL aggregation queries, and full-stack data visualization.
