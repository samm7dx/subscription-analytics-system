# Database — Subscription Analytic System

**DBMS Project** · MySQL 8+ · Cloud-compatible (Aiven, Railway, local)

---

## File structure

| File | Purpose |
|------|---------|
| `reset.sql` | Drop all tables (safe re-import) |
| `schema.sql` | Tables, primary keys, foreign keys |
| `indexes.sql` | Secondary indexes for analytics performance |
| `sample_data.sql` | Seed data (1000 users, 5000 logs, 5000 watch rows) |
| `analytics_queries.sql` | Core + optional SQL analytics |
| `README_DATABASE.md` | This guide |

Legacy reference: `../analytics/queries.sql` points to the same analytics definitions.

---

## Import order (required)

```bash
mysql -h HOST -P PORT -u USER -p DATABASE < database/reset.sql
mysql -h HOST -P PORT -u USER -p DATABASE < database/schema.sql
mysql -h HOST -P PORT -u USER -p DATABASE < database/indexes.sql
mysql -h HOST -P PORT -u USER -p DATABASE < database/sample_data.sql
```

One-liner (local):

```bash
mysql -u root -p subscription_analytics_system < database/reset.sql
mysql -u root -p subscription_analytics_system < database/schema.sql
mysql -u root -p subscription_analytics_system < database/indexes.sql
mysql -u root -p subscription_analytics_system < database/sample_data.sql
```

---

## Expected row counts

| Table | Rows |
|-------|------|
| Plans | 3 |
| Users | 1000 |
| Content | 20 |
| Subscriptions | 1000 |
| WatchHistory | 5000 |
| UserLogs | 5000 |

Verify:

```sql
SELECT 'Users' AS tbl, COUNT(*) AS cnt FROM Users
UNION ALL SELECT 'WatchHistory', COUNT(*) FROM WatchHistory
UNION ALL SELECT 'UserLogs', COUNT(*) FROM UserLogs;
```

---

## Cloud compatibility (Aiven / Railway)

### Why `sample_data.sql` was refactored

Older scripts used:

```sql
FROM information_schema.tables LIMIT 1000;
```

Cloud providers expose fewer `information_schema` rows (~336), which caused:

- Fewer than 1000 users
- `WatchHistory` / `UserLogs` referencing missing `user_id` values
- Foreign key errors on import

### Current approach

- **Recursive CTEs** (`WITH RECURSIVE`) generate exact row counts on any MySQL 8+ host
- **Deterministic `MOD()` mapping** keeps `user_id` ∈ [1, 1000] and `content_id` ∈ [1, 20]
- **`SET SESSION cte_max_recursion_depth = 10000`** allows 5000-row sequences

No dependency on `information_schema` or localhost-only features.

---

## Schema design notes

- **InnoDB** + **utf8mb4** for all tables
- Foreign keys: `ON DELETE RESTRICT`, `ON UPDATE CASCADE`
- Same table and column names as the Express API expects
- Indexes separated into `indexes.sql` for modular deployment

---

## Analytics

**Core queries (1–8)** match backend routes:

| # | Endpoint | Tables |
|---|----------|--------|
| 1 | `/dau` | UserLogs |
| 2 | `/revenue` | Subscriptions, Plans |
| 3 | `/top-content` | WatchHistory, Content |
| 4 | `/churn` | Subscriptions |
| 5 | `/engagement` | Users, WatchHistory |
| 6 | `/monthly-revenue` | Subscriptions, Plans |
| 7 | `/active-users` | Users, UserLogs |
| 8 | `/genre-engagement` | WatchHistory, Content |

**Optional queries (9–14)** in `analytics_queries.sql` for reports only (not exposed via API).

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| FK constraint fails on WatchHistory | Re-run full import order; confirm 1000 users exist |
| Recursive CTE limit | Ensure `cte_max_recursion_depth` is set (included in `sample_data.sql`) |
| Table already exists | Run `reset.sql` first |
| Duplicate email on re-import | Run `reset.sql` before `schema.sql` |

---

## Authors

DBMS Project — Subscription Analytic System
