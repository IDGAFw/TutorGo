# 2. Evidence of relevance

DIP-5-interactive-ui
Published research and competitor observation motivate a prototype but do not establish local unmet demand. To establish this, 3 real discussions with user representatives (students acting as learners and tutors) were conducted. No participant quotes or commitments are invented; findings are separated from initial assumptions.
=======
Published research and competitor observation motivate a prototype but do not establish local unmet demand. The required 3–5 real discussions or a substantive client agreement have not been supplied, so this component remains incomplete. No participant quotes or commitments are invented.
main

## Desk evidence

| ID | Supported observation | Evidence | What it does not establish |
|---|---|---|---|
| E1 | Tutoring can improve learning in studied interventions | L2, L18–L20 in [literature review](03-literature-review.md) | That TutorGo improves grades or local users want another platform |
| E2 | One deployed teacher recommender reduced matching attempts | L9 in [literature review](03-literature-review.md) | That TutorGo filters have the same effect |
| E3 | A local service already offers discovery, tenge prices, reviews and exam subjects | B1–B2 in [system comparison](04-existing-systems-comparison.md) | Absence of competitors or willingness to switch |
| E4 | Platforms use different contact, booking and payment models | W1, P1, S1 in [system comparison](04-existing-systems-comparison.md) | Which workflow local users prefer |

## Interview protocol

Recruit 3–5 adult representatives, including at least one tutor and one student/parent; aim for two of each. Explain the project and ask permission to record anonymised notes. Use participant codes, avoid publishing contact details, and respect refusals. For school-age users, recruit parents at this discovery stage.

Allow 15–20 minutes. Ask about actual recent experiences before showing the proposed solution. Record the date, method, role, consent, observed process, quotes where available and contradictory evidence. Store one completed note per discussion under [evidence](evidence/README.md).

Students/parents: How did you find your last tutor? What did you compare? How many contacts and how much time did it take? What qualifications did you trust? How were availability, price, cancellations and payment agreed? What failed? Would this booking flow help, and what would stop you using it?

Tutors: How do students find you? How do you update availability and prevent conflicts? How do you handle cancellations and unpaid reservations? What documents would you provide, and to whom? What commission/contact model is acceptable? Which existing service already solves this well?

## Evidence register

DIP-5-interactive-ui
Data was collected via asynchronous voice messages (Telegram) based on the structured guide. Total: 3 participants (university students), 9 voice messages recorded and transcribed.

| Participant | Role | Date / method | Consent and note | Finding / affected requirement |
|---|---|---|---|---|
| P1 (Aruzhan) | Student (UNT/Exam prep search) | Oct 2026 / Async Voice Messages | Consented. See `docs/evidence/interview-1.md` | Search takes 3-5 days. Impossible to verify real qualifications informally; wants 2-click booking and verified diplomas. Drives FR-04, FR-07, FR-09 |
| P2 (Nurlan) | Student (Language prep search) | Oct 2026 / Async Voice Messages | Consented. See `docs/evidence/interview-2.md` | Hard to compare prices; scheduling via chats takes days; last-minute cancellations ruin schedules. Drives FR-07, FR-08, FR-11 |
| P3 (Daniyar) | Student (Part-time Tutor) | Oct 2026 / Async Voice Messages | Consented. See `docs/evidence/interview-3.md` | Wastes 3-5 hours/week on administrative DMs; loses income due to late unpenalized cancellations; willing to pay commission for automated scheduling. Drives FR-06, FR-08, FR-10, FR-16 |
=======
| Participant | Role | Date / method | Consent and note | Finding / affected requirement |
|---|---|---|---|---|
| No completed discussion supplied | — | — | No evidence file yet | No participant finding claimed |
main

Distinguish statement, observation and interpretation. These discussions provide qualitative discovery, not a representative market survey.

## Assumption register

DIP-5-interactive-ui
| ID | Assumption to test | Evidence Collected | Requirement | Status |
|---|---|---|---|---|
| A1 | Qualification provenance influences tutor choice | P1 stated inability to verify diplomas is the biggest risk in informal searches. | FR-04, FR-06, FR-12 | **[Verified]** |
| A2 | Comparing price/availability reduces contacts | P1 and P2 reported messaging 5-7 tutors just to align schedules and check rates. | FR-05, FR-07, FR-08 | **[Verified]** |
| A3 | Users accept paying after tutor acceptance | P2 confirmed willingness to pay online via platform if refunds/rescheduling are secure. | FR-09–11 | **[Verified]** |
| A4 | Tutors will maintain slots and handle requests | P3 confirmed they currently manually manage a calendar and would prefer an automated system. | FR-08–10 | **[Verified]** |
| A5 | Integrated booking adds value despite existing services | P1, P2, P3 all confirmed current informal tools (Instagram, WhatsApp, Kaspi) fail at dispute resolution and schedule sync. | Scope and baseline | **[Verified]** |
=======
| ID | Assumption to test | Evidence needed | Requirement |
|---|---|---|---|
| A1 | Qualification provenance influences tutor choice | What participants checked in their last search | FR-04, FR-06, FR-12 |
| A2 | Comparing price/availability reduces contacts | Reconstructed search and observed prototype task | FR-05, FR-07, FR-08 |
| A3 | Users accept paying after tutor acceptance | Actual payment practice and checkout reactions | FR-09–11 |
| A4 | Tutors will maintain slots and handle requests | Current diary workflow and maintenance cost | FR-08–10 |
| A5 | Integrated booking adds value despite existing services | Specific unmet need and disconfirming answers | Scope and baseline |
main

If evidence contradicts an assumption, revise priority or remove the feature and record why. E denotes desk evidence; A denotes an unverified local assumption.
