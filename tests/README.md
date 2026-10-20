# Planned verification scenarios

This is the acceptance-test catalogue for the future MVP. Every case is **not run**: the backend and feature flows are not implemented. Isolate data, use adult/demo accounts and sandbox providers, and record commit, environment, steps, actual result and pass/fail when execution becomes possible.

| Case | Setup / action | Expected result |
|---|---|---|
| T-01 | Register a unique student and tutor, then repeat the email and request admin role | Valid allowed roles created; duplicate rejected; public admin registration denied; password never returned |
| T-02 | Log in with valid/invalid credentials; expire token; log out and reuse revoked refresh token | Valid session only; invalid/expired/revoked credentials rejected |
| T-03 | Student calls admin endpoint and another student's booking endpoint | 403/404 without data disclosure; changing request IDs cannot bypass authorization |
| T-04 | Save valid tutor profile; omit required fields; edit another tutor | Own valid data persisted and displayed; invalid/foreign edits rejected |
| T-05 | Add two subject/level/price entries; search each; remove one | Only applicable tutor-subject entries appear; displayed price uses selected subject |
| T-06 | Upload valid/oversized/disallowed document; admin approve/reject; student fetch private URL | Size/type restrictions enforced; rejection reason required; badge follows approval; private file denied to student |
| T-07 | Search combined subject, rate, rating, format, availability filters; search impossible combination | Every result satisfies all filters; deterministic pagination; empty state and reset available |
| T-08 | Set weekly hours and day-off exception; query boundary and blocked times | Only available, unoccupied, non-exception slots returned; UTC conversion correct |
| T-09 | Request a free interval, retry same idempotency key, then overlap with another request | One pending booking; retry returns same booking; overlap 409; adjacency permitted |
| T-10 | Tutor accept then student cancel; tutor decline; unauthorised completion; complete after lesson | Allowed transitions only; reason recorded; acceptance alone does not confirm unpaid request; only eligible actor/time may complete |
| T-11 | Attempt checkout before acceptance; pay accepted request; duplicate/invalid-signature/late callbacks | Pre-acceptance denied; authenticated success confirms once; signature failure denied; cancelled booking not revived |
| T-12 | Review completed booking twice, review uncompleted/foreign booking | One 1–5 review by owning student; invalid attempts rejected; aggregate recalculated |
| T-13 | Favorite tutor twice, reload, remove; inspect another student's favorites | Idempotent own favorites; persistent on reload; ownership enforced |
| T-14 | Participants send/read message; unrelated user requests same thread | Participants see content/unread status; foreign access denied |
| T-15 | Accept, cancel and pay booking; retry same event; mark notification read | Appropriate participant notifications, no duplicate event notification; own read state updates |
| T-16 | Complete paid booking; repeat completion and callback; inspect payout history | At most one payout entry per eligible booking; unpaid/cancelled booking has none |
| T-17 | Admin deactivate user; user attempts login/refresh and protected request | Deactivated account cannot regain/use authenticated access; change audited |
| T-18 | Open landing and use subject search once implemented | Readable layout; query carried to results; controls usable by keyboard |
| T-19 | Compare optional ranking implementation with documented deterministic fixture | Order follows published rule; tie-breaking stable; no unsubstantiated AI claim |
| S-01 | Inspect stored credentials, API responses and redacted test logs | Password hashes only; secrets/passwords never returned or logged |
| S-02 | Send injection payloads, missing/foreign-role requests and malformed fields | Validation and ownership enforced; no database error detail; safe query handling |
| S-03 | Inspect tracked files and request private document as owner/admin/stranger | No secrets; example config only; least-privilege protected document access |
| U-01 | Run counterbalanced discovery tasks and standard SUS with 5–8 adults | Metrics and raw counts recorded under protocol in verification plan; compare with project targets |
| U-02 | At 360, 390, 768, 1440 and 1920 px, navigate all implemented scenarios by keyboard | No unintended horizontal page scroll; controls and errors accessible; focus visible |
| U-03 | Inspect Russian UI, tenge formatting and UTC+5 sample converted from stored UTC | Consistent selected locale, currency and displayed time; no silent time-zone shift |
| P-01 | Run defined 1,000-tutor/10,000-booking workload | p95 at most 500 ms and errors at most 1%, with complete workload/environment log |
| P-02 | Run 50-way booking, duplicate callback and cancel/pay races, 20 repetitions | No duplicate active booking/charge/payout; terminal cancellation not reversed |
| C-01 | Run lint and implemented unit tests in CI; inspect booking/payment service coverage | Checks pass; at least 70% measured service coverage; no claim before services exist |
| D-01 | Clone on a clean machine and run documented Compose command once available | DB/API/frontend start with example configuration; health checks pass; no production credentials needed |

Backend security and state-machine checks must run before a public pilot. Keep user interviews and supervisor feedback distinct from software-test results.
