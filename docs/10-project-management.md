# 10. Project management and risks

## Tools
- **Git:** this repository; use branches `DIP-<id>-<slug>` for confirmed tasks and PRs reviewed by a teammate. A contribution guide has not been added yet.
- **YouTrack:** [TutorGo project](https://tutorgo-team.youtrack.cloud/projects/DIP) — project key `DIP`. Each task should have an assignee, expected outcome, acceptance criteria and deadline; assignments have not been verified in this import.

## Responsibilities
| Member | Main areas |
|---|---|
| `<<Muratov Zhakhangir>>` | Frontend, UX mockups, landing |
| `<<Tynbayev Maden>>` | `<<Backend, DB, API>>` |
| `<<Savzikhanov Ildar>>` | `<<Analysis docs, testing, DevOps>>` |

## Milestones
| Milestone | Target date | Deliverable |
|---|---|---|
| Pre-defense 1 (tag `pre-defense-1`) | 24 Oct 2026 | Analysis, requirements, diagrams, prototype, plans |
| Backend core (auth, profiles, catalog) | `<<date>>` | API + tests |
| Booking + availability | `<<date>>` | Booking flow with conflict handling |
| Payments + reviews | `<<date>>` | Sandbox payments, reviews, payouts |
| Pre-defense 2 (`pre-defense-2`) | `<<date>>` | Working MVP, test results |
| Evaluation & final (`final-pre-defense`) | `<<date>>` | Evaluation report |

## Existing work and proposed backlog

Existing Git history records DIP-1 (landing and initial diagram) and DIP-2 (architecture diagrams). The remaining rows are proposed work items. Assign their actual IDs in YouTrack rather than reusing the example IDs from the draft archive.
| ID | Task | Assignee | Pri | Deadline |
|---|---|---|---|---|
| DIP-1 | Landing and initial diagram (merged PR #1, branch `DIP-1-landing-and-diagram`) | Confirm in YouTrack | | |
| DIP-2 | Architecture diagrams (merged PR #2, branch `DIP-2-architecture-diagrams`) | Confirm in YouTrack | | |
| To assign | Project README, repo structure, PR template | | High | |
| To assign | Evidence of relevance: 3–5 interviews | | High | |
| To assign | Literature review (verify citations) | | High | |
| To assign | Existing systems & technology comparison | | High | |
| To assign | Requirements specification + acceptance criteria | | High | |
| To assign | Review alignment of context / use case / component diagrams | | High | |
| To assign | UX mockups of key scenarios | | Medium | |
| To assign | Verification and evaluation plan | | Medium | |
| To assign | Backend skeleton + DB migrations from ER | | High | |

## Risks
| # | Risk | Prob. | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | Cannot get real user interviews in time | M | H | Short phone interviews; keep claims marked [A] until verified | |
| R2 | Payment provider unavailable/ KZT sandbox missing | M | H | Provider adapter + mock; manual confirmation fallback | |
| R3 | Scope creep (messaging, payouts, ranking) | H | M | MoSCoW; Should/Could after Must is done | |
| R4 | Team member overload / uneven contributions | M | M | Task assignment in YouTrack, weekly review, PR reviews | |
| R5 | Double booking / race conditions | M | H | DB constraint + transaction + concurrency test | |
| R6 | Personal data & documents leak | L | H | Access-controlled storage, no secrets in repo, `.env.example` | |
| R7 | Cold start: no tutors for evaluation | H | M | Seed dataset + recruit 5–10 real tutors for pilot | |

## Dependencies
Supervisor feedback → requirements freeze; payment provider access → payment module; real tutor/student participants → evaluation; ER diagram → DB migrations → API.
