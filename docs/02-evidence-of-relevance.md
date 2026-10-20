# 2. Evidence of relevance

> **Criterion:** 3–5 discussions with user representatives (or a substantive agreement with the actual client). Committee checks *what evidence informs the requirements* and whether **verified findings are separated from assumptions**.

## Status
| Item | Status |
|---|---|
| Desk evidence (published sources on tutoring demand/marketplaces) | Collected — section A |
| User discussions (3–5 required) | **`<<0/5 done — fill section B after real conversations>>`** |
| Client agreement | `<<none / describe>>` |

> ⚠ Do not invent interview results. The committee can ask for names/dates/notes. If a discussion has not happened yet, leave the row empty and keep the related claim marked **[A] assumption**.

## A. Desk evidence (verified from sources)
| # | Finding | Source |
|---|---|---|
| A1 | One-to-one tutoring consistently improves learning; pooled effect 0.288 SD across 89 RCTs (PreK-12) | Nickow, Oreopoulos & Quan (2024), AERJ, doi:10.3102/00028312231208687 |
| A2 | Marketplaces connect students and tutors and typically bundle discovery, booking, payments, messaging | Sharetribe guide; see [03](03-literature-review.md) |
| A3 | Tutors report self-marketing and finding regular students as a major pain; students "look for tutors and never find one" | Founder interview, VentureBeat (Tutor Matching Service) |
| A4 | Recommender/matching reduced student–teacher matching attempts 7.22 → 3.09 on a real platform | Chen et al. (2021), arXiv:2107.07124 |
| A5 | A Nazarbayev University capstone built a tutoring marketplace in 2024, i.e. local demand/interest exists, but it is a student prototype, not a market | NU repository, handle 123456789/8026 |

## B. User discussions (FILL IN — real data only)
| # | Date | Participant (role, anonymised ok) | Format/length | Key statements | Requirement(s) affected |
|---|---|---|---|---|---|
| 1 | | Student/parent | | | |
| 2 | | Student/parent | | | |
| 3 | | Tutor | | | |
| 4 | | Tutor | | | |
| 5 | | Student/parent or admin of a tutoring centre | | | |

Store raw notes in `docs/evidence/interview-<n>.md` (use the template below). Get verbal/written consent; anonymise names.

### Interview guide (15 min each; Telegram/phone is fine)
**Students/parents**
1. How did you find your last tutor (or how would you look for one)? Which channels?
2. How long did it take, and how many tutors did you contact before choosing?
3. What did you check to trust the tutor (diploma, reviews, trial lesson)? What was missing?
4. How do you agree on schedule, price, payment, cancellations? Any problems?
5. Online or offline? Why?
6. What would make you use a platform instead? What would stop you (fees, trust, payment)?
7. Would you pay online upfront? Under which conditions?

**Tutors**
1. Where do you get students now? How much time per week goes to finding/answering them?
2. How do you manage schedule and payments? Missed/cancelled lessons?
3. What do you think about a commission (e.g. 10–15 %) in exchange for students and payments?
4. What would you need in a tutor profile? Would you upload diplomas for verification?
5. What worries you about a platform?

### Note template (`docs/evidence/interview-N.md`)
```
Date / role / duration:
Context:
Verbatim key quotes (2–4):
Observed pains:
Stated needs:
Contradicts/confirms assumption(s): A1…
```

## C. Verified vs assumed (traceability to requirements)
| Claim | Status | Evidence | Drives requirement |
|---|---|---|---|
| Tutors are hard to find/verify informally | **[A]** → update after B | | FR-04, FR-12 |
| Students want to compare price/availability quickly | **[A]** | | FR-05, FR-07 |
| Online payment is acceptable to users | **[A]** | | FR-11 |
| Tutoring improves outcomes | **[V]** | A1 | project motivation |
| Matching/recommendation reduces search effort | **[V]** (other context) | A4 | future work, FR-19 ranking |
