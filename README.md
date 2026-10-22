# TutorGo

TutorGo.kz is a diploma project for a tutor marketplace in Kazakhstan. It aims to help students and parents compare tutors, check qualifications, find an available lesson slot and book a lesson. Tutors will manage profiles, availability and bookings; administrators will verify documents and moderate the platform.

## Team and supervisor

Responsibilities combine the supplied project plan and YouTrack screenshot; future backend/testing assignments remain planning proposals.

| Team member | Proposed responsibility |
|---|---|
| Muratov Zhakhangir | Frontend and UX |
| Tynbayev Maden | Backend, database and API |
| Savzikhanov Ildar | Analysis, testing and DevOps |

Supervisor: **Kamila Tanybergenova** (name supplied by the team; English transliteration). The team confirms that interviews have not yet been conducted and supervisor feedback has not been obtained.

## Scope and development status

The repository contains a frontend landing, analysis and planning documents, editable architecture diagrams with matching exports, and [five UX scenario mockups plus a mobile reference](prototype/README.md). The expected MVP covers registration, profiles and verification, filters, availability, tutor-accepted booking requests, sandbox payment and reviews. The evaluation compares discovery/request effort with a controlled contact-based baseline; a complete application is not required at this checkpoint.

Authentication, search results, booking, payments and backend services are planned. The landing page uses sample names, ratings and statistics, and its controls do not implement these workflows. Native mobile apps, built-in video conferencing and production payments are outside the initial scope.

## Technologies

- Existing frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons.
- Proposed backend: NestJS, PostgreSQL and a REST API; WebSocket/SSE for messaging if needed.
- Proposed local infrastructure: Docker Compose. Backend and infrastructure are not implemented yet.

See the [technology comparison](docs/05-technology-comparison.md) and [proposed architecture decision](docs/adr/0001-technology-stack.md).

## Project tracking and documentation

[YouTrack project DIP](https://tutorgo-team.youtrack.cloud/projects/DIP). Documentation belongs to [DIP-4](https://tutorgo-team.youtrack.cloud/issue/DIP-4); interactive UI implementation is [DIP-5](https://tutorgo-team.youtrack.cloud/issue/DIP-5). Actual issue IDs differ from manually typed prefixes in some titles; see the [history mapping](docs/10-project-management.md). Initial documentation was merged through [PR #3](https://github.com/IDGAFw/TutorGo/pull/3); the follow-up branch is `DIP-4-documentation`.

| Document | Contents |
|---|---|
| [Project proposal](docs/01-project-proposal.md) | Problem, users, objectives and scope |
| [Evidence of relevance](docs/02-evidence-of-relevance.md) | Desk evidence, assumptions and interview templates |
| [Literature review](docs/03-literature-review.md) | 13 source analyses: nine scientific works and four technical references |
| [Existing systems comparison](docs/04-existing-systems-comparison.md) | Four systems, eight criteria and primary source register, including BUKI Kazakhstan |
| [Technology comparison](docs/05-technology-comparison.md) | Alternatives and proposed decisions |
| [Requirements](docs/06-requirements.md) | Priorities, acceptance criteria and test identifiers |
| [Architecture](docs/07-architecture.md) | Diagrams and requirement traceability |
| [UX prototype](docs/08-ux-prototype.md) | Existing landing and six static design screens with editable sources |
| [Verification plan](docs/09-verification-plan.md) | Metrics, baseline and planned tests |
| [Project management](docs/10-project-management.md) | Proposed responsibilities, milestones and risks |
| [Supervisor feedback](docs/11-supervisor-feedback.md) | Template for actual review feedback |
| [Submission status](docs/12-submission-status.md) | Completed artifacts, evidence gaps and demonstration sequence |

## Repository structure

- `tutor-platform/`: frontend source and dependency/configuration files.
- `docs/`: analysis, plans, requirements, architectural decisions and evidence templates.
- `diagrams/`: editable draw.io files; `diagrams/exports/` contains PNG exports.
- `prototype/`: five workflow mockups and a mobile layout in SVG and PNG.
- `tests/`: 29 planned acceptance scenarios; execution awaits feature implementation.
- `tools/`: pinned asset renderer/generator and documentation consistency checker.

Automated feature tests will be added with implementation. The [test catalogue](tests/README.md) and verification plan describe intended tests, not completed application results.

## Run the frontend

Install Node.js compatible with the locked Vite version (for example Node 22.12+ or Node 24) and npm, then run:

```sh
cd tutor-platform
npm ci
npm run dev
```

Open the local URL printed by Vite. The landing loads photos from Unsplash, so those images require internet access. No environment variables are required for the current frontend.

Available checks and preview:

```sh
npm run lint
npm run build
npm run preview
```

`build` runs the TypeScript compiler and Vite. There is no automated feature-test command yet.

## Preparation for 24 October 2026

The [submission report](docs/12-submission-status.md) distinguishes prepared artifacts from missing evidence. Sources, competitor comparison, scenario mockups, state-machine criteria and measurement conditions have been revised. Remaining work includes:

- Conduct and record 3–5 real user discussions, then revise assumptions and requirements.
- Discuss the source-review depth with the supervisor; some publications were available only as abstracts or indexed text.
- Confirm future responsibilities and proposed priorities/deadlines in YouTrack; the supervisor is identified above.
- Record actual supervisor feedback and address it in traceable changes.
- Record independent team review and check access for the supervisor and committee. Merging on user instruction is not evidence of that review.
- Use `pre-defense-1` to identify the exact submitted snapshot and provide the linked limitations report. A tag does not imply full criterion completion.

## Check documentation and rebuild design assets

```sh
cd tools
npm ci
npm run check
npm run design
```

The checker verifies local Markdown targets/anchors, requirement/test IDs, expected design files and diagram endpoints. The generator rebuilds PNG/SVG mockups and matching draw.io diagram exports. It does not implement application features or replace human evaluation.
