# Free Deployment Guide

The best free setup with higher backend limits is:

- Frontend: Netlify Free
- Backend: Oracle Cloud Always Free VM
- Database: Supabase Free PostgreSQL

The easier fallback is:

- Frontend: Netlify Free
- Backend: Render Free
- Database: Supabase Free PostgreSQL

## What Cannot Be Automated From This Chat

Account creation, billing verification, OAuth login, DNS ownership, and secret entry must be done by you in your browser. Do not share account passwords or Supabase database passwords in chat.

## Database: Supabase

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase-schema.sql`.
4. Copy database connection values.
5. Use JDBC format for the backend:

```text
jdbc:postgresql://YOUR_SUPABASE_DB_HOST:5432/postgres?sslmode=require
```

## Backend: Oracle Always Free

1. Create an Ubuntu VM using Always Free Ampere A1 resources.
2. SSH into the VM.
3. Follow `deploy/oracle-backend/README.md`.
4. Put these values in `deploy/oracle-backend/.env`:

```text
DATABASE_URL
DATABASE_USERNAME
DATABASE_PASSWORD
JWT_SECRET
CORS_ALLOWED_ORIGIN
PORT
```

If you do not own a domain, use:

```text
http://YOUR_VM_PUBLIC_IP:8080
```

as the backend URL.

## Frontend: Netlify

1. Push this project to GitHub.
2. Create a Netlify site from the GitHub repository.
3. Base directory:

```text
frontend
```

4. Build command:

```text
npm run build
```

5. Publish directory:

```text
dist
```

6. Add environment variable:

```text
VITE_API_BASE_URL=https://newest-8ygb.onrender.com
```

7. After Netlify gives you a URL, update backend `CORS_ALLOWED_ORIGIN` to that URL and restart backend:

```bash
docker compose restart hostel-backend
```

## Backend Fallback: Render Free

Use `deploy/render-backend/render.yaml` or create a Render Web Service manually.

Required env vars:

```text
DATABASE_URL
DATABASE_USERNAME
DATABASE_PASSWORD
JWT_SECRET
CORS_ALLOWED_ORIGIN=https://hostel-joining-system.netlify.app
```

Render Free is easier but usually has sleep/cold-start behavior.
