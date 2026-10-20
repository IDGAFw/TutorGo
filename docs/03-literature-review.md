# 3. Literature review

Scope: tutoring effectiveness, two-sided marketplaces and trust/reputation, tutor recommendation, usability evaluation, API architecture. **17 candidate sources** are listed below. Bibliographic details, classifications and claims are imported from the archive and have not been independently verified during this import. The archive's ✔ marks are retained as author annotations, not as validation results. **Check titles, authors, dates, volume/pages and DOI before submission.**

## Structured analysis table
| ID | Source | Type | Year | Contribution | Limitation | Used for |
|---|---|---|---|---|---|---|
| L1 | Bloom, B.S. *The 2 Sigma Problem…* Educational Researcher 13(6), 4–16 | Scientific (foundational) | 1984 | Mastery 1:1 tutoring outperforms classroom instruction by ~2 SD | Small, old experiments | Motivation |
| L2 | Nickow, Oreopoulos, Quan. *The Promise of Tutoring for PreK–12 Learning…* AERJ, doi:10.3102/00028312231208687 ✔ | Scientific (meta-analysis) | 2024 | Pooled ES 0.288 SD over 89 RCTs; effect larger with ≥3 sessions/week | PreK-12, mostly school programs, not marketplaces | Motivation, session frequency in UX |
| L3 | MDRC. *You've Paid for Tutoring. Here's How to Make Sure It Works* ✔ | Report | 2024 | At scale effects smaller (0.06–0.09 SD); quality & dosage matter | US districts | Risk: platform ≠ outcome guarantee |
| L4 | Rochet & Tirole. *Platform competition in two-sided markets.* JEEA 1(4), 990–1029 | Scientific | 2003 | Pricing/cross-side network effects | Theory | Commission model, cold start |
| L5 | Hagiu & Wright. *Multi-sided platforms.* Int. J. Industrial Organization 43, 162–174 | Scientific | 2015 | When intermediaries vs. resellers; platform design | Economic focus | Scope (marketplace, not employer) |
| L6 | Resnick, Kuwabara, Zeckhauser, Friedman. *Reputation systems.* CACM 43(12), 45–48 | Scientific | 2000 | Reputation needed for trust between strangers | Pre-dates modern fraud | Reviews, verification |
| L7 | Resnick, Zeckhauser, Swanson, Lockwood. *The value of reputation on eBay.* Experimental Economics 9(2), 79–101 | Scientific | 2006 | Reputation has measurable price premium | eBay-specific | Rating design |
| L8 | Burke. *Hybrid recommender systems: survey and experiments.* UMUAI 12(4), 331–370 | Scientific | 2002 | Hybrid content+collaborative ranking handles cold start | Dated | Ranking/search design |
| L9 | Chen, Li, Ding, Liu. *An Educational System for Personalized Teacher Recommendation in K-12 Online Classrooms.* arXiv:2107.07124 ✔ | Scientific | 2021 | Matching attempts 7.22 → 3.09; novelty boosting for new teachers | Proprietary data; China K-12 | Future ranking, new-tutor fairness |
| L10 | Achón et al. *SOS TUTORÍA UC: diversity-aware tutor recommendation…* AI Communications (HHAI-WS 2023) ✔ | Scientific | 2023 | Competence + personality criteria; users want more selection info | Peer tutoring, small sample | Profile fields shown in search |
| L11 | Davis. *Perceived usefulness, perceived ease of use… (TAM).* MIS Quarterly 13(3), 319–340 | Scientific | 1989 | Adoption depends on usefulness & ease | Self-reported | Evaluation questionnaire |
| L12 | Brooke. *SUS: a "quick and dirty" usability scale.* Usability Evaluation in Industry | Scientific/standard | 1996 | 10-item usability score | Single number | [Verification plan](09-verification-plan.md) |
| L13 | Fielding. *Architectural Styles and the Design of Network-based Software Architectures* (PhD thesis, UC Irvine) | Scientific (foundational) | 2000 | REST constraints | — | [Tech comparison](05-technology-comparison.md) |
| L14 | Konkayeva et al. *Online Tutoring Marketplace* (NU capstone) ✔ nur.nu.edu.kz/handle/123456789/8026 | Student thesis | 2024 | React/Java/Flutter marketplace for KZ | Prototype; no verification/payments described | Local precedent; differentiation |
| L15 | Sharetribe. *How to build a marketplace for tutoring* ✔ | Industry guide | 2023+ | Feature baseline: search, booking, payments, video | Vendor blog | Feature baseline |
| L16 | VentureBeat. *Tutor Matching Service makes public debut* ✔ | News/interview | 2014* | Tutor pain, 10 % booking fee, university partners | Dated, US | Evidence A3 |
| L17 | Tutor.id one-pager (Education Estonia) ✔ | Vendor document | 2021 | AI matching, tutor tools, subscription model | Marketing claims | Competitor analysis |

\*check year on page.

**Recent sources (≥2021):** L2, L3, L9, L10, L14, L17. Foundational older works are retained deliberately (L1, L4, L6, L13). *Gap to close if supervisor requires more recent work:* add 2–3 papers (2021–2026) on payment/escrow in marketplaces and on RBAC/security of web APIs.

## Critical synthesis
1. **Why tutoring (L1–L3).** Effects are real but depend on frequency and quality; a platform therefore should support *regular* booking (recurring slots, reminders) and quality signals, not only first contact.
2. **Why trust features (L6–L7).** In markets between strangers, reputation and verification create trust and price premiums → tutor document verification (ER: `tutor_documents`) and one-review-per-booking rule (`reviews.booking_id UQ`).
3. **Why marketplace economics matter (L4–L5).** Cold start and cross-side effects: seed supply (tutors) first, charge commission on bookings, avoid direct-contact leakage.
4. **Matching (L8–L10).** Hybrid content-based ranking (subject, price, rating, availability) is feasible for MVP; collaborative/learning-to-rank is future work. New tutors need visibility (novelty boost).
5. **Existing local work (L14).** Shows feasibility in KZ; our differentiation = verification workflow, payments/payout tracking, exam-oriented subject catalogue (ЕНТ, НИШ/БИЛ).

## Limitations the project takes into account
- Effectiveness evidence concerns structured programs, not open marketplaces → we measure **process outcomes** (search/booking effort), not learning gains.
- Reputation systems can be gamed → reviews only for completed bookings, one per booking.
- Vendor sources are marketing → used only for feature baselines, labelled as such.
