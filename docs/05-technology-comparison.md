# 5. Technology comparison

Method: weighted planning scores (1–5) against [requirements](06-requirements.md). These are proposed estimates, not benchmark results or measured team skills. Scores favour a shared TypeScript language and an explicit relational booking model. Record acceptance or revision in [ADR-0001](adr/0001-technology-stack.md); supervisor acceptance has not been obtained.

## T1. Server platform
Requirements: REST API, RBAC, transactions, payment webhooks, team skill, one language across stack.
| Criterion (weight) | Node.js + NestJS (TS) | Python + Django/DRF | Java + Spring Boot |
|---|---|---|---|
| Fit with existing TypeScript codebase (×3) | 5 | 4 | 2 |
| Shared language with frontend (×2) | 5 | 1 | 1 |
| Built-in auth/admin/ORM speed (×2) | 3 | 5 | 3 |
| Performance for MVP load (×1) | 4 | 3 | 5 |
| Ecosystem/docs (×1) | 5 | 5 | 5 |
| **Weighted total (max 45)** | **40** | 32 | 24 |
Decision (proposed): **NestJS (TypeScript)**; fallback Django if admin panel speed matters.

## T2. Data storage
Requirements (from [ER diagram](../diagrams/TutorGo.drawio)): UUID keys, FK integrity, enums, composite PKs, JSONB payload, transactions for booking/payment.
| Criterion | PostgreSQL | MySQL 8 | MongoDB |
|---|---|---|---|
| Relational integrity for 14 entities (×3) | 5 | 5 | 2 |
| JSONB / flexible payload (×1) | 5 | 3 | 5 |
| Transactions & constraints (booking conflicts) (×3) | 5 | 4 | 3 |
| UUID/enum/array support (×1) | 5 | 3 | 4 |
| Hosting/free tiers (×1) | 5 | 5 | 5 |
| **Total (max 45)** | **45** | 38 | 29 |
Proposed decision: **PostgreSQL**. Its [range exclusion constraints](https://www.postgresql.org/docs/18/rangetypes.html) support non-overlapping tutor/time intervals. Compare Prisma and TypeORM during backend setup; do not claim an ORM is selected or migrations already exist.

## T3. Component interaction
| Criterion | REST (JSON/HTTPS) | GraphQL | WebSocket (for chat) |
|---|---|---|---|
| Simplicity/testability (×3) | 5 | 3 | 3 |
| Fit for CRUD + booking flows (×2) | 5 | 4 | 2 |
| Real-time messages/notifications (×2) | 2 | 3 | 5 |
| Tooling/OpenAPI docs (×1) | 5 | 4 | 3 |
| **Total (max 40)** | **34** | 27 | 26 |
Decision: **REST + OpenAPI** for the main API; **WebSocket/SSE** only for messages & notifications.

## T4. Frontend (landing implemented)
| Option | Notes |
|---|---|
| **React + Vite + TypeScript** (current) | Fast dev, SPA, already used for landing |
| Next.js | SSR/SEO for tutor profile pages — consider if SEO is required |
| Vue/Nuxt | Would require porting the existing React prototype; no team-experience claim is made |
Decision: keep React+Vite for MVP; revisit Next.js if SEO becomes a new requirement. NFR-08 covers localization, not SEO.

## T5. Payment integration and online lessons
| Decision | Alternatives | Note |
|---|---|---|
| Payment integration | local provider sandbox / international provider sandbox / provider-independent mock adapter | Use a mock for design/integration tests; select a real sandbox only after confirming KZT, callbacks and access. No production provider selected |
| Online lessons | external link (Google Meet/Zoom/Jitsi) vs built-in WebRTC | MVP: external link (`bookings.meeting_url`) |

## Summary
Proposed stack: PostgreSQL + NestJS HTTP API + existing React SPA; messaging transport is deferred until that Should feature is implemented. Docker Compose is planned. Provider credentials, production certification and native video integration are outside this stage. The [NestJS module documentation](https://docs.nestjs.com/modules) supports service grouping; [Fielding](https://ics.uci.edu/~fielding/pubs/dissertation/abstract.htm) provides the REST foundation. [OWASP ASVS](https://owasp.org/projects/asvs) informs security checks. These references do not replace implementation tests.
