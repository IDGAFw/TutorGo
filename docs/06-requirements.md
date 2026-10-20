# 6. Requirements specification

Priority: **M** = Must (MVP), **S** = Should, **C** = Could. These specify the future MVP; they are not implemented-feature claims or requirements to finish the whole application by 24 October. Each requirement maps to a concrete planned case in [tests](../tests/README.md) and the [verification plan](09-verification-plan.md). Source A means a local assumption in [02](02-evidence-of-relevance.md); L identifiers refer to [literature](03-literature-review.md). No local user discussion has yet validated these priorities.

## Functional requirements
| ID | Requirement | Pri | Acceptance criteria | Test | Source |
|---|---|---|---|---|---|
| FR-01 | A visitor can register as student or tutor with email + password | M | Given a unique email, when the form is submitted, then an account with the chosen role is created and the password is stored only as a hash; duplicate email is rejected with an error | T-01 | [A] |
| FR-02 | A user can log in/out; sessions use tokens | M | Valid credentials → access granted; invalid → 401; token expires after configured time | T-02 | [A] |
| FR-03 | Role-based access: student, tutor, admin | M | A student calling an admin endpoint receives 403 | T-03 | [A] |
| FR-04 | Tutor creates a profile (bio, education, experience, hourly rate, currency) | M | Own saved profile is visible publicly; required fields validated; another tutor cannot edit it | T-04 | A1, L6 |
| FR-05 | Tutor selects subjects with level and price | M | Tutor appears in search results for each selected subject | T-05 | A |
| FR-06 | Tutor uploads verification documents; admin approves/rejects | M | PDF/JPEG/PNG up to 10 MB; type/content checked; owner/admin access only; rejection needs a reason; badge requires an approved document and explains its meaning | T-06 | A1, L6 |
| FR-07 | Student searches tutors by subject, price range, rating, format, availability | M | Results contain only tutors matching all filters; empty result shows a message; response time per NFR-01 | T-07 | A, A4 |
| FR-08 | Tutor sets weekly availability and exceptions (days off) | M | Slots outside availability or inside an exception are not bookable | T-08 | A |
| FR-09 | Student requests a slot (online/offline) | M | One `pending` reservation for a future interval; active overlaps for the tutor rejected with 409; repeated client idempotency key returns the same booking; price/duration snapshotted | T-09 | A2–A4 |
| FR-10 | Tutor accepts/declines; participants cancel; eligible tutor completes | M | Acceptance sets `tutor_accepted_at` while booking stays `pending` until paid; decline/cancel/expiry makes it `cancelled`; cancellation reason recorded; only the owning tutor completes a confirmed booking after its end time | T-10 | A3–A4 |
| FR-11 | Sandbox payment for an accepted booking | M | Checkout requires tutor acceptance and unexpired `pending` booking; valid signed success for matching amount/currency confirms once; invalid signature rejected; duplicate events do not duplicate charge/state/payout; late payment cannot revive a cancelled booking | T-11 | A3, L24 |
| FR-12 | Student leaves one review (1–5 + comment) after a completed booking | M | Only owning student reviews; reject incomplete/already-reviewed booking; recalculate rating; comment length 1–2,000 characters | T-12 | A1, L6 |
| FR-13 | Student can favorite tutors | S | Favorite persisted and listed in the student's profile | T-13 | A |
| FR-14 | In-app messages between student and tutor tied to a booking | S | Receiver sees the message and unread flag; only booking participants can read | T-14 | A |
| FR-15 | Notifications for booking events | S | Event creates a notification record; marking as read updates `is_read` | T-15 | A |
| FR-16 | Tutor payout records | S | Completed paid bookings produce payout entry `pending→processing→completed` | T-16 | A |
| FR-17 | Admin moderates users and reviews beyond mandatory document checks | S | Admin can deactivate a user; deactivated user cannot log in, refresh or use protected endpoints; action audited | T-17 | A1 |
| FR-18 | Landing page with search entry and popular subjects | M | Landing renders at 360 px–1920 px without horizontal scroll; search button leads to results | T-18 | prototype |
| FR-19 | Optional ranked results and new-tutor visibility | C | Ranking rule and stable tie-break documented and covered by a fixture; explicit filters work without learned ranking | T-19 | L9–L10 |

## Non-functional requirements
| ID | Requirement | Pri | Acceptance criteria / metric | Test |
|---|---|---|---|---|
| NFR-01 | Performance | M | Search API p95 ≤ 500 ms with 1 000 tutors / 10 000 bookings on a dev machine | P-01 |
| NFR-02 | Security: passwords | M | bcrypt/argon2 hashes; no plaintext in DB or logs | S-01 |
| NFR-03 | Security: access control & input validation | M | Versioned OWASP ASVS 5.0.0 subset for authorization and validation; foreign-role/ownership and injection tests disclose no protected data or database internals; record exact checklist IDs before implementation review | S-02 |
| NFR-04 | Privacy: personal data and secrets | M | No secrets in repo; `.env.example` only; documents served via access-controlled URLs | S-03 |
| NFR-05 | Usability | M | Project targets: mean SUS ≥ 68 and unaided valid-request success ≥ 90% with 5–8 adults; report counts and failures under counterbalanced protocol | U-01 |
| NFR-06 | Responsiveness | M | Layout works at 360 px (mobile) and desktop | U-02 |
| NFR-07 | Reliability of booking/payment | M | No double booking and no double payment in concurrency test (50 parallel requests) | P-02 |
| NFR-08 | Localization | S | UI in Russian; Kazakh optional; prices in KZT | U-03 |
| NFR-09 | Maintainability | S | ≥ 70 % unit-test coverage of booking/payment services; CI runs lint+tests | C-01 |
| NFR-10 | Portability | S | `docker compose up` starts DB+API+frontend on a clean machine | D-01 |

## Constraints & assumptions
- Online lessons through external video link; no native mobile apps; payments in sandbox mode only.
- Requirements marked **[A]** must be re-checked after user discussions ([02](02-evidence-of-relevance.md)).

## Booking and payment lifecycle

All timestamps are stored in UTC and displayed in the selected user time zone. Availability uses the tutor's zone. Intervals are half-open `[starts_at, ends_at)`: adjacent lessons are permitted, overlaps are not. Persist a 60-minute sample lesson as a duration snapshot rather than deriving it from a later price change.

Initial planning parameters: the tutor has 24 hours to answer, bounded by lesson start; after acceptance the student has 15 minutes to pay, also bounded by lesson start. Store the effective deadline in `expires_at`. These values are configuration proposals to validate with users, not interview findings.

| Current state | Event and guard | Result |
|---|---|---|
| No booking | Valid future available interval, no active conflict | `pending`, unpaid; slot reserved until deadline |
| `pending`, not accepted | Owning tutor accepts before deadline | Remain `pending`; set acceptance timestamp and payment deadline |
| `pending`, accepted | Valid provider success, amount/currency match, before expiry | Payment `success`; booking `confirmed` in one transaction |
| `pending` | Decline, participant cancellation or deadline reached | `cancelled`; release slot; record reason |
| `confirmed` | Participant cancels before lesson starts | `cancelled`; paid amount enters sandbox refund/reconciliation workflow |
| `confirmed` | Owning tutor marks completed after lesson end | `completed`; eligible review and optional payout entry |
| `cancelled` | Delayed success callback | Remain `cancelled`; record event and refund/reconciliation item; never claim both cancelled and confirmed |
| Any state | Duplicate idempotency key/provider event | Return existing result; no duplicate side effect |

Unimplemented schema additions required for this lifecycle are explicitly listed in [architecture](07-architecture.md). No current diagram field is treated as an existing database migration.

## Traceability
Requirements ↔ ER entities: FR-01–03 `users`; FR-04–06 `tutor_profiles`, `tutor_documents`; FR-05 `subjects`, `tutor_subjects`; FR-08 `tutor_availability`, `tutor_time_off`; FR-09–10 `bookings`; FR-11 `payments`; FR-12 `reviews`; FR-13 `favorites`; FR-14 `messages`; FR-15 `notifications`; FR-16 `payouts`.
