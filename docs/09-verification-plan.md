# 9. Verification and evaluation plan

## Aim and baseline

Evaluate whether TutorGo reduces the effort of finding a suitable tutor and sending a valid booking request. Confirmation and payment correctness are separate technical outcomes. Learning gains are outside the evaluation claim.

Primary comparison: a controlled contact-based directory versus TutorGo using equivalent seeded tutor information, availability and task constraints. In the baseline, participants choose a tutor and compose a booking request to a study moderator; no strangers receive test messages and no real money changes hands. This models part of informal search, not the complete real-world market. Additional interviews reconstruct real recent searches but are analysed separately.

## Participants and procedure

Recruit 5–8 consenting adults, including students/parents unfamiliar with the design. This is a formative study, not a population estimate. Record relevant prior experience without public identifiers. Use two equivalent subject/budget/time tasks, counterbalance platform order, and do not reuse the same answer between conditions. Offer a practice task. Use the same device, network, dataset size and 10-minute task limit. Moderator help makes a task assisted and unsuccessful for the unaided-success metric.

The discovery endpoint is selecting a matching tutor/slot and submitting a valid request. Stop the timer there in both conditions. The tutor response is scripted outside this timer. Evaluate acceptance and sandbox checkout in a separate end-to-end scenario, so human response delay is not mistaken for interface performance.

## Metrics and planned decision rules

| Metric | Definition | Project target | Evidence |
|---|---|---|---|
| Request-task time | Seconds to valid request, cap 600 seconds; report failures separately | Platform median at most 50% of baseline median | Per-condition logs, medians, individual paired values |
| Unaided task success | Matching subject, budget and available slot; valid request submitted within limit | At least 90%; for 5–8 participants this requires all to succeed | Counts and denominator, not only rounded percentages |
| Contacts | Requests to a tutor/moderator before valid agreement | Median no greater than baseline | Observer event log |
| SUS | Standard 10-item perceived-usability instrument, calculated 0–100 | Mean at least 68 as a project target, not a universal pass/fail law | Questionnaire after tasks; instrument basis L12 in literature review |
| Search latency P-01 | End-to-end API p95 after warm-up | At most 500 ms | Load-test log with configuration |
| Booking/payment concurrency P-02 | Duplicate active bookings, confirmations, payouts or charges | Zero duplicates in the defined race scenarios | Database assertions and provider-mock event log |

Report number recruited, exclusions and reasons, successes, assisted attempts, failures, per-user times, SUS spread and qualitative issues. Preserve failures and contradictory observations. Do not present a small formative sample as proof of market demand or causal educational effectiveness.

## Technical measurement conditions

P-01: seed 1,000 tutors and 10,000 bookings; document seed, API version, CPU/RAM/OS, database version, local-network conditions and query mix. Warm up for 30 seconds; measure for 5 minutes at 10 requests/second. Report p50/p95/p99, error rate and sample count. Fail the planned check if p95 exceeds 500 ms or errors exceed 1%; do not silently omit slow or failed requests.

P-02: release 50 simultaneous requests for one tutor/slot using a start barrier. Assert at most one active booking, with other requests returning conflict. Repeat with different client idempotency keys, then with one reused key. Send 50 duplicate payment callbacks, plus reordered success/failure events, against an accepted request; verify exactly one paid state and at most one payout record. Race success against cancellation/expiry: a cancelled booking stays cancelled and late payment enters reconciliation. Run these scenarios 20 times and keep every result.

## Test catalogue and traceability

Concrete scenarios and expected results for T-01–T-19, S-01–S-03, U-01–U-03, P-01–P-02, C-01 and D-01 are in [tests/README.md](../tests/README.md). These are planned cases, not executed tests.

| Level | Scope | Planned tooling |
|---|---|---|
| Unit | Availability, state guards, review eligibility, idempotency | Vitest/Jest |
| Integration | API + PostgreSQL constraints, ownership, callbacks | HTTP test client and isolated database |
| E2E | Search → request → tutor acceptance → sandbox payment → completion → review | Playwright and provider mock |
| Security | Versioned OWASP ASVS 5.0.0 subset for authentication, validation, ownership and protected files | Automated negative tests plus manual inspection |
| Performance | Defined latency and race workloads | k6 or equivalent reproducible script |
| Usability | Controlled comparison and SUS | Consented observation and anonymised records |

## Current results

Only documentation/asset checks for this submission have been performed; see [submission status](12-submission-status.md). No participant study, backend test, latency benchmark or payment integration has run. Frontend build and lint commands exist, but this document does not claim they passed. The complete application is not required for this analysis/design stage.
