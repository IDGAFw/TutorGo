# 10. Project management and risks

## Tracking and contribution history

Repository: [IDGAFw/TutorGo](https://github.com/IDGAFw/TutorGo). Tracker: [YouTrack DIP](https://tutorgo-team.youtrack.cloud/projects/DIP). Main contains the earlier landing/diagrams and the documentation import merged through [PR #3](https://github.com/IDGAFw/TutorGo/pull/3). This follow-up uses branch `DIP-4-documentation` and a `DIP-4:` commit prefix. New changes continue in the same repository.

The supplied YouTrack screenshot shows actual issue IDs that differ from the manually typed prefixes in issue titles. Use actual issue IDs in links; historical Git branch names are retained rather than rewriting previous contributions.

| Actual YouTrack issue | Work | Assignee / state in supplied screenshot | Historical Git reference |
|---|---|---|---|
| [DIP-2](https://tutorgo-team.youtrack.cloud/issue/DIP-2) | Vite/React landing | Maden Tynbayev / Done | DIP-1 branch, PR #1 |
| [DIP-3](https://tutorgo-team.youtrack.cloud/issue/DIP-3) | Architecture diagrams | Maden Tynbayev / Done | DIP-2 branch, PR #2 |
| [DIP-4](https://tutorgo-team.youtrack.cloud/issue/DIP-4) | Documentation, README and pre-defense package | eldar12062006 / Open | PR #3 import; current DIP-4 branch |
| [DIP-5](https://tutorgo-team.youtrack.cloud/issue/DIP-5) | Interactive UI flow | Zhahangir Muratov / Open | Separate frontend work; not delivered by static mockups |

No YouTrack state, deadline or assignment has been changed by this documentation work. Review and committee access should be checked by the team. The user requested merging the documentation without an additional review; that does not demonstrate the independent team review required by the academic workflow.

## Responsibilities

| Member | Responsibility | Evidence / planning status |
|---|---|---|
| Muratov Zhakhangir | Frontend and interaction implementation | DIP-5 screenshot; mockups in this package specify intended behaviour |
| Tynbayev Maden | Existing landing/architecture; proposed backend, database and API owner | Completed issues in screenshot; future backend ownership is a planning proposal |
| Savzikhanov Ildar | Analysis, documentation, test/evaluation preparation | Documentation assigned to eldar12062006; future testing/DevOps are proposed |
| Kamila Tanybergenova | Diploma supervisor | Name supplied by the team; no substantive review yet |

## Immediate work plan

Dates and owners below are proposed planning targets, not claims that YouTrack fields already contain them.

| Work item | Parent | Proposed owner | Priority | Target | Acceptance evidence |
|---|---|---|---|---|---|
| Source-based analysis, requirements and plans | DIP-4 | Ildar | High | 20 Oct 2026 | Linked sources, consistent criteria and traceability |
| Five main UX designs and mobile reference | DIP-4 | Ildar; frontend handoff to Zhakhangir | High | 20 Oct 2026 | SVG/PNG pairs and walkthrough |
| 3–5 real discussions | DIP-4 | Ildar coordinating team recruitment | High | 22 Oct 2026 | Anonymised dated notes and requirement changes |
| Supervisor review and response | DIP-4 | Team with Kamila Tanybergenova | High | 23 Oct 2026 | Actual comments, decisions and revision links |
| Independent team review and access check | DIP-4 | Another team member | High | 23 Oct 2026 | Recorded review and accessible artifacts |
| Stage submission | DIP-4 | Ildar | High | 24 Oct 2026 | `pre-defense-1`, summary and explicit limitations |
| Interactive implementation | DIP-5 | Zhakhangir | Normal in screenshot | Plan with assignee | Runnable scenario and implementation checks |
| Backend/auth/schema setup | New task needed | Proposed Maden | High, proposed | After checkpoint planning | API, migration and meaningful tests |

A complete application is not required for the first pre-defense. Later core API, booking/payment and evaluation milestones must receive agreed dates after scope review. Do not fabricate historical commits or mark future work done to imply continuous development.

## Risks and dependencies

| Risk | Probability / impact | Mitigation | Proposed owner |
|---|---|---|---|
| No actual discovery interviews before submission | High / High | Recruit adults now; preserve unsupported assumptions and report missing evidence | Ildar |
| Supervisor review not completed | High / High | Provide compact linked review package; record genuine response only | Team |
| Unsupported local novelty claim | Medium / High | Include BUKI; validate a specific unmet need rather than claiming no competitors | Ildar |
| Provider sandbox unavailable for KZT | Medium / High | Mock adapter for tests; production provider outside current scope | Maden |
| Slot/payment races | Medium / High | DB constraints, transactions, unique event IDs and P-02 races | Maden |
| Document or secret disclosure | Low / High | Private storage, ownership checks, example config and no real documents in mockups | Maden |
| Scope overload | High / Medium | Must/Should/Could boundaries; defer ranking, messaging and payout execution | Team |
| Mockups mistaken for implementation | Medium / Medium | Mark all screens as designs; track interactive delivery in DIP-5 | Zhakhangir |

Dependencies: interviews and supervisor feedback can change priorities; accepted lifecycle precedes schema migrations; schema/auth precede booking; provider access precedes real sandbox integration; functional implementation precedes empirical usability and load results.
