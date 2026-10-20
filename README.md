# TutorGo

TutorGo.kz is a diploma project for a tutor marketplace in Kazakhstan. It aims to help students and parents compare tutors, check qualifications, find an available lesson slot and book a lesson. Tutors will manage profiles, availability and bookings; administrators will verify documents and moderate the platform.

## Team and supervisor

Responsibilities below are proposed in the imported project plan and need team confirmation.

| Team member | Proposed responsibility |
|---|---|
| Muratov Zhakhangir | Frontend and UX |
| Tynbayev Maden | Backend, database and API |
| Savzikhanov Ildar | Analysis, testing and DevOps |

Supervisor: to be added. Supervisor feedback has not yet been recorded in this repository.

## Scope and development status

The repository currently contains a frontend landing prototype, editable architecture diagrams with PNG exports, and draft analysis and planning documents. The expected outcome is an MVP with registration, tutor profiles and verification, search, availability, booking, sandbox payments and reviews, followed by an evaluation of search and booking effort against an informal search baseline.

Authentication, search results, booking, payments and backend services are planned. The landing page uses sample names, ratings and statistics, and its controls do not implement these workflows. Native mobile apps, built-in video conferencing and production payments are outside the initial scope.

## Technologies

- Existing frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons.
- Proposed backend: NestJS, PostgreSQL and a REST API; WebSocket/SSE for messaging if needed.
- Proposed local infrastructure: Docker Compose. Backend and infrastructure are not implemented yet.

See the [technology comparison](docs/05-technology-comparison.md) and [proposed architecture decision](docs/adr/0001-technology-stack.md).

## Project tracking and documentation

[YouTrack project DIP](https://tutorgo-team.youtrack.cloud/projects/DIP). New work must be linked to actual YouTrack tasks; the draft backlog is not evidence that those tasks have been created or assigned.

| Document | Contents |
|---|---|
| [Project proposal](docs/01-project-proposal.md) | Problem, users, objectives and scope |
| [Evidence of relevance](docs/02-evidence-of-relevance.md) | Desk evidence, assumptions and interview templates |
| [Literature review](docs/03-literature-review.md) | Draft source analysis and synthesis |
| [Existing systems comparison](docs/04-existing-systems-comparison.md) | Five systems and ten comparison criteria |
| [Technology comparison](docs/05-technology-comparison.md) | Alternatives and proposed decisions |
| [Requirements](docs/06-requirements.md) | Priorities, acceptance criteria and test identifiers |
| [Architecture](docs/07-architecture.md) | Diagrams and requirement traceability |
| [UX prototype](docs/08-ux-prototype.md) | Existing landing and planned user scenarios |
| [Verification plan](docs/09-verification-plan.md) | Metrics, baseline and planned tests |
| [Project management](docs/10-project-management.md) | Proposed responsibilities, milestones and risks |
| [Supervisor feedback](docs/11-supervisor-feedback.md) | Template for actual review feedback |

## Repository structure

- `tutor-platform/`: frontend source and dependency/configuration files.
- `docs/`: analysis, plans, requirements, architectural decisions and evidence templates.
- `diagrams/`: editable draw.io files; `diagrams/exports/` contains PNG exports.

Automated feature tests will be added with the corresponding implementation. The current verification plan describes intended tests, not completed test results.

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

The imported materials are working drafts. Before a pre-defense submission, the team still needs to:

- Conduct and record 3–5 real user discussions, then revise assumptions and requirements.
- Verify bibliographic details and competitor claims, and review the balance of recent scientific sources.
- Confirm the supervisor, responsibilities, task assignments, priorities and deadlines in YouTrack.
- Create mockups for search, profile/booking, checkout, tutor management and admin verification.
- Record actual supervisor feedback and address it in traceable changes.
- Review changes through a pull request and check access for the supervisor and committee.
- Tag the reviewed submission as `pre-defense-1` and report completed work, limitations and outstanding tasks.

No pre-defense submission tag is created by importing these drafts.
