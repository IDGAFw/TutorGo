# 7. Architecture and diagrams

Editable sources: [ER diagram](../diagrams/TutorGo.drawio), [system context](../diagrams/System_Context_Diagram.drawio), [use cases](../diagrams/Use_Case_Diagram.drawio) and [component diagram](../diagrams/Component_Diagram.drawio). Existing PNG exports: [`diagrams/exports/`](../diagrams/exports). The descriptions below are the proposed design; alignment with each existing diagram still needs a team review.

## 7.1 System context
![System context](../diagrams/exports/System_Context_Diagram.drawio.png)
The existing diagram shows Student, Tutor and Administrator, plus payment, video and notification providers. It currently describes generating meeting links through a video API. The proposed MVP stores an external lesson link instead; the diagram needs updating after this decision is confirmed.

## 7.2 Use cases
![Use cases](../diagrams/exports/Use_Case_Diagram.drawio.png)
The existing diagram covers Student, Tutor and Admin scenarios; *Book a Lesson* includes *Pay for Lesson*. Visitor inheritance, an explicit slot-selection use case and a payment-provider actor are not in the current diagram and remain proposed refinements.

## 7.3 Component diagram (draft)
![Component diagram](../diagrams/exports/Component_Diagram.drawio.png)
The existing draft shows a SPA, API gateway/router, backend services, PostgreSQL, file storage and payment/video integrations. It lists frontend and API alternatives rather than a final stack. The proposed design is React SPA → NestJS modular monolith (REST + WebSocket/SSE for messages) → PostgreSQL and file storage, with provider adapters for external integrations. This selection still needs to be reflected in the diagram.

## 7.4 Data model
ER diagram: [`diagrams/TutorGo.drawio`](../diagrams/TutorGo.drawio), page 1 — 14 tables: `users`, `tutor_profiles`, `tutor_documents`, `tutor_availability`, `tutor_time_off`, `subjects` (hierarchical via `parent_id`), `tutor_subjects`, `favorites`, `bookings`, `payments`, `payouts`, `reviews` (one per booking), `notifications`, `messages`.

## 7.5 Consistency matrix (requirements ↔ components ↔ data ↔ scenarios)
| Requirement | Use case | Component | Tables |
|---|---|---|---|
| FR-01–03 | Register / Log in | Auth & Users | users |
| FR-04–06 | Manage profile, Upload documents, Verify documents | Tutor Profiles & Verification, Admin | tutor_profiles, tutor_documents, subjects, tutor_subjects |
| FR-07 | Search tutors | Search & Ranking, Catalog | tutor_profiles, tutor_subjects, tutor_availability |
| FR-08 | Set availability | Availability & Time-off | tutor_availability, tutor_time_off |
| FR-09–10 | Book lesson, Select slot, Cancel, Confirm/decline | Booking Service | bookings |
| FR-11 | Pay for lesson | Payment Service + Provider Adapters | payments |
| FR-12 | Leave review | Reviews & Rating | reviews |
| FR-13 | Manage favorites | Tutor Profiles | favorites |
| FR-14–15 | Messages, notifications | Messaging & Notifications | messages, notifications |
| FR-16 | View payouts | Payouts | payouts |
| FR-17 | Moderate | Admin / Moderation | users, reviews |

## 7.6 Key decisions
See [`docs/adr/`](adr) and [05](05-technology-comparison.md). Booking conflicts are prevented by a database-level constraint/transaction; payment callbacks are idempotent by `provider_txn_id`.
