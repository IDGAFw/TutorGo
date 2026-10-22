# ADR-0001: Technology stack
- **Status:** Proposed, 20 October 2026. Supervisor acceptance not yet recorded.
- **Context:** Requirements in [06](../06-requirements.md); comparison in [05](../05-technology-comparison.md).
- **Decision:** React + Vite + TypeScript (frontend); NestJS (REST API); PostgreSQL; REST + WebSocket/SSE; Docker Compose.
- **Consequences:** One language across stack; relational integrity for bookings/payments; no SSR (revisit Next.js if SEO needed).
