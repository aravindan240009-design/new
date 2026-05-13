# Hostel Joining Application Management System

A production-ready full-stack hostel joining portal that replaces paper forms with online submission, secure warden/admin review, status workflows, room allotment, advanced table management, CSV export, print, and PDF download.

## Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, React Router DOM, Axios, React Hook Form, Zod, TanStack Table, Lucide React, React Hot Toast, jsPDF, html2canvas
- Backend: Java 17, Spring Boot, Spring Web, Spring Data JPA, Spring Security, JWT, Bean Validation, Lombok, PostgreSQL Driver, Swagger/OpenAPI, Maven
- Database: Supabase PostgreSQL
- Hosting: Netlify frontend, Render backend, Supabase database

## Project Structure

```text
hostel-joining-system/
├── backend/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/hostel/application/
│       │   ├── HostelApplicationSystemApplication.java
│       │   ├── config/
│       │   ├── controller/
│       │   ├── dto/
│       │   ├── entity/
│       │   ├── enums/
│       │   ├── exception/
│       │   ├── repository/
│       │   ├── security/
│       │   └── service/
│       └── resources/
│           ├── application.properties
│           └── data.sql
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   ├── .env.example
│   ├── netlify.toml
│   └── src/
│       ├── api/
│       ├── components/
│       ├── pages/
│       ├── routes/
│       ├── types/
│       └── utils/
├── supabase-schema.sql
└── README.md
```

## Backend Local Setup

Create a Supabase PostgreSQL project first, then set environment variables.

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Required backend environment variables:

```bash
DATABASE_URL=jdbc:postgresql://your-supabase-host:5432/postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password
JWT_SECRET=use-a-long-random-secret-at-least-32-characters
CORS_ALLOWED_ORIGIN=http://localhost:5173
```

The backend uses `spring.jpa.hibernate.ddl-auto=update`, so JPA can create/update tables automatically. The optional SQL script is available at `supabase-schema.sql`.

Default admin is created only when no admin user exists:

- Username: `admin`
- Password: `admin123`

Change the default password immediately in production.

Swagger UI:

```text
http://localhost:8080/swagger-ui.html
```

## Frontend Local Setup

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env`:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

Frontend URL:

```text
http://localhost:5173
```

## API Overview

Public:

- `POST /api/applications` submits a student hostel application.
- `POST /api/auth/login` returns a JWT token for admin access.

Protected admin endpoints require `Authorization: Bearer <token>`:

- `GET /api/applications`
- `GET /api/applications/{id}`
- `PUT /api/applications/{id}`
- `DELETE /api/applications/{id}`
- `PATCH /api/applications/{id}/approve`
- `PATCH /api/applications/{id}/reject`
- `PATCH /api/applications/{id}/room`
- `GET /api/applications/search?keyword=`
- `GET /api/applications/filter?status=&gender=&course=`
- `GET /api/applications/stats`

## Supabase Setup

1. Create a Supabase project.
2. Open Project Settings, Database, and copy host, database, port, user, and password.
3. Convert the connection into a JDBC URL:

```text
jdbc:postgresql://HOST:5432/postgres
```

4. Optional: open Supabase SQL Editor and run `supabase-schema.sql`.
5. The backend can also create tables automatically through JPA.

## Render Deployment

1. Push this repository to GitHub.
2. Create a new Render Web Service.
3. Leave root directory as the repository root.
4. Use Docker deployment with Dockerfile path `backend/Dockerfile`.
5. Add environment variables:

```text
DATABASE_URL
DATABASE_USERNAME
DATABASE_PASSWORD
JWT_SECRET
CORS_ALLOWED_ORIGIN
```

6. Deploy the backend.
7. Copy the Render backend URL.

## Netlify Deployment

1. Create a new Netlify site from GitHub.
2. Set the base directory to `frontend`.
3. Build command:

```bash
npm run build
```

4. Publish directory:

```text
dist
```

5. Add Netlify environment variable:

```text
VITE_API_BASE_URL=https://newest-8ygb.onrender.com
```

6. Deploy the frontend.
7. Update Render `CORS_ALLOWED_ORIGIN` to `https://hostel-joining-system.netlify.app`.
8. Redeploy the backend so CORS picks up the Netlify URL.

## Higher-Limit Free Deployment

For a stronger free backend than Render Free, use Oracle Cloud Always Free for the Spring Boot API, Netlify Free for the React frontend, and Supabase Free for PostgreSQL.

See `DEPLOYMENT-FREE.md` and `deploy/oracle-backend/README.md`.

## Production Notes

- Use a strong `JWT_SECRET` of at least 32 characters.
- Change the default admin password after first deployment.
- Keep Supabase credentials in Render environment variables only.
- Keep Netlify `VITE_API_BASE_URL` pointed to the deployed Render backend.
