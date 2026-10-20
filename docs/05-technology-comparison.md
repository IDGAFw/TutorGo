# 5. Technology comparison

Method: weighted scoring (1–5) against project requirements ([06](06-requirements.md)). Weights/scores are **team judgement**; adjust to your real skills and record the final choice in `docs/adr/`.

## T1. Server platform
Requirements: REST API, RBAC, transactions, payment webhooks, team skill, one language across stack.
| Criterion (weight) | Node.js + NestJS (TS) | Python + Django/DRF | Java + Spring Boot |
|---|---|---|---|
| Team skills (×3) | 5 | 4 | 2 |
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
Decision: **PostgreSQL** (+ Prisma/TypeORM migrations).

## T3. Component interaction
| Criterion | REST (JSON/HTTPS) | GraphQL | WebSocket (for chat) |
|---|---|---|---|
| Simplicity/testability (×3) | 5 | 3 | 3 |
| Fit for CRUD + booking flows (×2) | 5 | 4 | 2 |
| Real-time messages/notifications (×2) | 2 | 3 | 5 |
| Tooling/OpenAPI docs (×1) | 5 | 4 | 3 |
| **Total (max 40)** | **34** | 27 | 26 |
Decision: **REST + OpenAPI** for the main API; **WebSocket/SSE** only for messages & notifications.

## T4. Frontend (already implemented)
| Option | Notes |
|---|---|
| **React + Vite + TypeScript** (current) | Fast dev, SPA, already used for landing |
| Next.js | SSR/SEO for tutor profile pages — consider if SEO is required |
| Vue/Nuxt | Not used by team |
Decision: keep React+Vite for MVP; revisit Next.js if SEO becomes a new requirement. NFR-08 covers localization, not SEO.

## T5. Payments & online lessons (to confirm with real availability in KZ)
| Decision | Alternatives | Note |
|---|---|---|
| Payment provider | local acquiring provider / Stripe-like sandbox / manual confirmation | **Verify which provider supports KZT and sandbox** `<<check>>` |
| Online lessons | external link (Google Meet/Zoom/Jitsi) vs built-in WebRTC | MVP: external link (`bookings.meeting_url`) |

## Summary
PostgreSQL + NestJS REST API + React SPA + WebSocket for messaging; Docker Compose for local run. Each choice maps to requirements (FR-06…FR-12, NFR-01…NFR-08).
