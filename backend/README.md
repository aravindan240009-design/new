# Backend

Spring Boot REST API for the Hostel Joining Application Management System.

## Run Locally

```bash
mvn clean install
mvn spring-boot:run
```

Required environment variables:

```text
DATABASE_URL=jdbc:postgresql://your-supabase-host:5432/postgres
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password
JWT_SECRET=use-a-long-random-secret-at-least-32-characters
CORS_ALLOWED_ORIGIN=http://localhost:5173
```

Default admin is seeded only when no admin exists:

- Username: `admin`
- Password: `admin123`

Change the password in production.
