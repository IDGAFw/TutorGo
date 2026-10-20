# 6. Requirements specification

Priority: **M** = Must (MVP), **S** = Should, **C** = Could. Each requirement has an acceptance criterion (AC) that can be verified by a test case in [09](09-verification-plan.md) (column *Test*). Source column links to evidence ([02](02-evidence-of-relevance.md)) or marks **[A]** assumption.

## Functional requirements
| ID | Requirement | Pri | Acceptance criteria | Test | Source |
|---|---|---|---|---|---|
| FR-01 | A visitor can register as student or tutor with email + password | M | Given a unique email, when the form is submitted, then an account with the chosen role is created and the password is stored only as a hash; duplicate email is rejected with an error | T-01 | [A] |
| FR-02 | A user can log in/out; sessions use tokens | M | Valid credentials → access granted; invalid → 401; token expires after configured time | T-02 | [A] |
| FR-03 | Role-based access: student, tutor, admin | M | A student calling an admin endpoint receives 403 | T-03 | [A] |
| FR-04 | Tutor creates a profile (bio, education, experience, hourly rate, currency) | M | Saved profile is visible on the public tutor page; required fields validated | T-04 | A, L6 |
| FR-05 | Tutor selects subjects with level and price | M | Tutor appears in search results for each selected subject | T-05 | A |
| FR-06 | Tutor uploads verification documents; admin approves/rejects | M | Document status `pending→approved/rejected`; only tutors with ≥1 approved doc get the "verified" badge | T-06 | L6–L7 |
| FR-07 | Student searches tutors by subject, price range, rating, format, availability | M | Results contain only tutors matching all filters; empty result shows a message; response time per NFR-01 | T-07 | A, A4 |
| FR-08 | Tutor sets weekly availability and exceptions (days off) | M | Slots outside availability or inside an exception are not bookable | T-08 | A |
| FR-09 | Student books a slot (online/offline) | M | Booking is created as `pending`; overlapping bookings for the same tutor are rejected (conflict 409) | T-09 | A |
| FR-10 | Tutor confirms/declines; either party can cancel with reason | M | Status transitions follow `pending→confirmed→completed` or `→cancelled`; illegal transitions rejected | T-10 | A |
| FR-11 | Online payment for a booking via payment provider (sandbox) | M | Successful callback sets payment `success` and booking `confirmed`; failed/duplicate callbacks do not double-charge (idempotent by `provider_txn_id`) | T-11 | [A] |
| FR-12 | Student leaves one review (1–5 + comment) after a completed booking | M | Review rejected if booking not completed or already reviewed; tutor `rating_avg` recalculated | T-12 | L6–L7 |
| FR-13 | Student can favorite tutors | S | Favorite persisted and listed in the student's profile | T-13 | A |
| FR-14 | In-app messages between student and tutor tied to a booking | S | Receiver sees the message and unread flag; only booking participants can read | T-14 | A |
| FR-15 | Notifications for booking events | S | Event creates a notification record; marking as read updates `is_read` | T-15 | A |
| FR-16 | Tutor payout records | S | Completed paid bookings produce payout entry `pending→processing→completed` | T-16 | A |
| FR-17 | Admin moderates users, documents, reviews | S | Admin can deactivate user; deactivated user cannot log in | T-17 | A |
| FR-18 | Landing page with search entry and popular subjects | M | Landing renders at 360 px–1920 px without horizontal scroll; search button leads to results | T-18 | prototype |
| FR-19 | Recommended/ranked results (relevance, rating, novelty boost) | C | Ranking rule documented and covered by unit test | T-19 | L8–L9 |

## Non-functional requirements
| ID | Requirement | Pri | Acceptance criteria / metric | Test |
|---|---|---|---|---|
| NFR-01 | Performance | M | Search API p95 ≤ 500 ms with 1 000 tutors / 10 000 bookings on a dev machine | P-01 |
| NFR-02 | Security: passwords | M | bcrypt/argon2 hashes; no plaintext in DB or logs | S-01 |
| NFR-03 | Security: access control & input validation | M | OWASP Top-10 checklist items A01, A03 verified; SQL injection attempts return 4xx | S-02 |
| NFR-04 | Privacy: personal data and secrets | M | No secrets in repo; `.env.example` only; documents served via access-controlled URLs | S-03 |
| NFR-05 | Usability | M | SUS ≥ 68 and task success ≥ 90 % for "find and book" with 5 users | U-01 |
| NFR-06 | Responsiveness | M | Layout works at 360 px (mobile) and desktop | U-02 |
| NFR-07 | Reliability of booking/payment | M | No double booking and no double payment in concurrency test (50 parallel requests) | P-02 |
| NFR-08 | Localization | S | UI in Russian; Kazakh optional; prices in KZT | U-03 |
| NFR-09 | Maintainability | S | ≥ 70 % unit-test coverage of booking/payment services; CI runs lint+tests | C-01 |
| NFR-10 | Portability | S | `docker compose up` starts DB+API+frontend on a clean machine | D-01 |

## Constraints & assumptions
- Online lessons through external video link; no native mobile apps; payments in sandbox mode only.
- Requirements marked **[A]** must be re-checked after user discussions ([02](02-evidence-of-relevance.md)).

## Traceability
Requirements ↔ ER entities: FR-01–03 `users`; FR-04–06 `tutor_profiles`, `tutor_documents`; FR-05 `subjects`, `tutor_subjects`; FR-08 `tutor_availability`, `tutor_time_off`; FR-09–10 `bookings`; FR-11 `payments`; FR-12 `reviews`; FR-13 `favorites`; FR-14 `messages`; FR-15 `notifications`; FR-16 `payouts`.
