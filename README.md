# Mobile Gaming Management System - Backend

Spring Boot 4 REST backend implementing the Mobile Gaming Management System SRS. It targets **Java 26**, Maven, PostgreSQL, Flyway migrations, JWT authentication, role-based access control, validation, audit logging, and the SRS API surface.

## Prerequisites

- JDK 26 installed and selected in IntelliJ (`Project SDK` and Maven runner JRE).
- PostgreSQL running locally. Create the database once:

```sql
CREATE DATABASE mobile_gaming_management;
```

The default connection uses `postgres` / `102938Sm@#` as requested. For a safer setup, override `DB_PASSWORD` and `JWT_SECRET` in your IntelliJ run configuration.

## Run in IntelliJ IDEA

Open this folder as a Maven project, set the Project SDK to JDK 26, then open `MobileGamingApplication.java` and click the green Run button beside `main()`. This is the recommended setup for this project.

The API is served at `http://localhost:8080/api/v1`; health is at `/actuator/health`. Flyway creates the schema automatically. Register the first account, then promote it to `ADMIN` in PostgreSQL if administrative setup is needed.

## Run from PowerShell (optional)

From the IntelliJ terminal or PowerShell, run the included launcher. It uses the configured Java 26 SDK and IntelliJ's bundled Maven, so no global Maven installation is needed:

```powershell
.\run-backend.cmd
```

The command below works only after Apache Maven has been installed and its `bin` folder has been added to the Windows `Path` environment variable:

```powershell
mvn spring-boot:run
```

## Authentication

`POST /api/v1/auth/register` registers a player and returns access/refresh tokens. Send `Authorization: Bearer <accessToken>` for protected routes. Tokens expire according to the SRS role policy (1 hour player through 12 hours admin); refresh tokens are persisted and can be revoked with logout.

## SRS coverage and production integrations

The database migration covers the SRS core tables: users, games, players, game sessions, purchases, achievements, events, game content, notifications, social connections, leaderboards, refresh sessions, and audit logs. The API provides the corresponding operational workflows, including RBAC for Player, QA Tester, Community Manager, Data Analyst, Game Developer, Live Ops Manager, and Admin roles.

App-store receipt verification, FCM/APNs push delivery, social login, WebSocket multiplayer, payment-provider fraud checks, and predictive analytics are intentionally represented by secure workflow endpoints/data models rather than mocked third-party calls. Add their provider credentials and service adapters before a production launch. Do not deploy the default database password or JWT secret.

## Endpoint map

| Area | Endpoints |
|---|---|
| Auth/profile/privacy | `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout`, `/auth/password-reset`, `/users/profile`, `/users/me/export`, `/users/me` (DELETE) |
| Games/content/releases | `/games`, `/games/{id}`, `/games/{id}/version`, `/games/{id}/analytics`, `/games/{id}/content`, `/content/{id}` |
| Players/progression | `/players/{gameId}`, `/players/{gameId}/progress`, `/players/{gameId}/achievements`, `/players/{gameId}/achievements/{id}/unlock` |
| Sessions | `/sessions/start`, `/sessions/{id}/update`, `/sessions/{id}/end`, `/sessions/history` |
| Economy/purchases | `/purchases/initiate`, `/purchases/validate`, `/purchases/history`, `/purchases/refund`, `/games/{gameId}/achievements` |
| Live ops | `/events`, `/events/active`, `/events/{id}`, `/notifications`, `/notifications/broadcast` |
| Community/competition | `/players/{gameId}/social`, `/social`, `/leaderboards`, `/leaderboards/{gameId}` |
| Analytics/admin | `/analytics/dashboard`, `/analytics/players/{gameId}`, `/analytics/revenue/{gameId}`, `/analytics/custom-report`, `/admin/users`, `/admin/audit-logs` |

Detailed request examples are in `docs/API.md`.
