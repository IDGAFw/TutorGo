# 9. Verification and evaluation plan

## 9.1 Aim being demonstrated
The platform lets a student find and book a suitable tutor with less effort than the **baseline** (informal search: messenger/social media/word of mouth).

## 9.2 Baseline
Informal process measured with the same task and participants: find a tutor for a given subject/budget/time and agree a lesson slot using Instagram/Telegram/Google. Record time, number of contacts, success.

## 9.3 Metrics and targets
| Metric | Definition | Target | Tool |
|---|---|---|---|
| Task completion time | Seconds from start to confirmed booking | ≤ 50 % of baseline median | stopwatch/logs |
| Task success rate | % participants who complete find→book unaided | ≥ 90 % | observation |
| Contacts needed | Tutors contacted before a booking | ≤ 1 (platform) vs baseline | observation |
| Usability | SUS score (Brooke, 1996) | ≥ 68 | questionnaire |
| Perceived usefulness/ease | 5-point TAM items (Davis, 1989) | mean ≥ 4.0 | questionnaire |
| API performance | Search p95 latency | ≤ 500 ms (NFR-01) | k6/autocannon |
| Correctness under load | Double-bookings / double-payments in 50 parallel requests | 0 | concurrency test |

## 9.4 Measurement conditions
5–8 participants (students/parents/tutors), same tasks and order, desktop + mobile, seeded dataset of 50 tutors, sandbox payments, think-aloud observation, consent and anonymisation.

## 9.5 Test plan
| Level | What | Tools | Maps to |
|---|---|---|---|
| Unit | availability calculation, booking status transitions, rating aggregation, ranking | Jest/Vitest | FR-08–12, FR-19 |
| Integration | API + PostgreSQL: auth, booking conflict (409), payment callback idempotency | Supertest + Testcontainers/Docker | FR-01–11 |
| E2E | find → book → pay → review | Playwright | FR-07–12 |
| Security | OWASP Top-10 checklist, RBAC (403), SQLi attempts, no secrets in repo | manual + ZAP/npm audit, gitleaks | NFR-02–04 |
| Usability | task-based sessions with SUS/TAM | protocol above | NFR-05–06 |
| Non-functional | latency, concurrency | k6, scripted parallel calls | NFR-01, NFR-07 |
| Static | lint, type-check in CI | ESLint, tsc | NFR-09 |

Test-case IDs T-01…T-19, S-01…S-03, U-01…U-03, P-01…P-02, C-01, D-01 are defined by the acceptance criteria in [06](06-requirements.md); each case is stored in `tests/` (spec or scenario file) when the feature is implemented.

## 9.6 Current status
Frontend `npm run build` / `npm run lint` available. Other test levels start with the backend. `<<fill: date of first run>>`
