# Faveda on Supabase

Faveda continues to use **Drizzle ORM** for all server-side PostgreSQL queries. Supabase becomes the managed PostgreSQL provider and is also ready for Storage, Realtime and Auth in future iterations.

## 1. Create the Supabase project

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard).
2. In **Project > Connect**, copy the **Shared Pooler / Session mode** connection URI for persistent Next.js server traffic.
3. Set it in the deployment environment as `SUPABASE_DATABASE_URL`.
4. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` only for future server-side Supabase features. Never expose the service role key in `NEXT_PUBLIC_*` variables.

## 2. Create the database schema

Use one of the following approaches:

```bash
# Recommended: Supabase CLI applies the checked-in SQL migration
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

Or paste `supabase/migrations/20260822170000_faveda_initial_schema.sql` in Supabase **SQL Editor** and run it once.

The migration includes all Faveda tables, foreign keys, operational indexes and RLS enabled by default. The Next.js server connects as a PostgreSQL server client; browser clients cannot query the business tables through the Data API.

## 3. Move existing local data (optional)

After the schema is deployed, export/copy the current sandbox data:

```bash
SOURCE_DATABASE_URL='postgresql://postgres:postgres@127.0.0.1:5432/app_db' \
SUPABASE_DATABASE_URL='postgresql://postgres.PROJECT_REF:PASSWORD@aws-REGION.pooler.supabase.com:5432/postgres' \
node scripts/migrate-to-supabase.mjs
```

The script copies tables in dependency-safe order and preserves IDs, passwords hashes, orders, audit history and sequence values. It does not log either connection string.

## 4. Use Supabase locally and in production

Configure deployment secrets from `.env.example`:

```env
SUPABASE_DATABASE_URL=postgresql://...
SUPABASE_URL=https://PROJECT_REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_SECRET=a-long-random-secret
```

`SUPABASE_DATABASE_URL` automatically takes precedence over `DATABASE_URL`. For Drizzle schema work against Supabase use:

```bash
npx drizzle-kit push --config=drizzle.config.ts
```

Use Supabase Direct connection for migrations / `pg_dump`; use the Supabase pooler (usually session mode port 5432) for the running Next.js application.
