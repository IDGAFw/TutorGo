# 1. Project proposal

**Title:** TutorGo.kz — tutor marketplace for Kazakhstan
**Team:** see [README](../README.md#team-and-supervisor) | **Supervisor:** `<<name>>`

Legend: **[V]** verified by evidence in [02-evidence](02-evidence-of-relevance.md); **[A]** assumption to be verified.

## Problem statement
Students and parents in Kazakhstan looking for a tutor (school subjects, ЕНТ/UNT, NIS/BIL entrance, English, Kazakh) rely on word of mouth, Instagram/Telegram channels and classified ads **[A]**. As a result:
1. tutor qualifications and reviews cannot be verified **[A]**;
2. comparing price, subject level and free time slots requires many manual chats **[A]**;
3. scheduling, payment and cancellation are handled ad hoc, with no protection for either side **[A]**;
4. tutors spend time on self-marketing instead of teaching **[A]** (the same problem is reported by founders of comparable platforms, see [03](03-literature-review.md)).

## Target users
| Role | Needs |
|---|---|
| Student / parent | find a verified tutor by subject, goal, price, format; book a slot; pay; leave a review |
| Tutor | profile, subjects & prices, availability, verification, bookings, payouts, reputation |
| Administrator | verify tutor documents, moderate reviews/disputes, view payments & payouts |

## Aim
Design and implement an MVP web platform that lets students find verified tutors and book paid lessons within a few steps, and demonstrate (by measured evaluation) that it reduces the effort of finding and booking a tutor compared with the current informal process.

## Objectives
1. Collect evidence from ≥3–5 users/tutors on how tutors are found today.
2. Review literature and 3–5 existing platforms; justify the technology stack.
3. Specify functional/non-functional requirements with acceptance criteria.
4. Produce architecture (context, use case, component, ER) and UX mockups.
5. Implement MVP: auth, tutor profiles + verification, search/filter, availability & booking, payments (sandbox), reviews, notifications/messages.
6. Evaluate against the baseline (informal search) using the plan in [09](09-verification-plan.md).

## Expected outcomes
- Documented analysis and design (this repository).
- Working MVP (web) with automated tests.
- Evaluation report: task completion time, success rate, usability score vs baseline.

## Scope
**In scope (MVP):** registration/login (student, tutor, admin); tutor profile & document verification; subject catalogue; search & filters; tutor availability & booking (online/offline); online-lesson link; payment via sandbox provider; payouts record; reviews & ratings; favorites; in-app messages and notifications; admin panel (verification, moderation).
**Out of scope:** native mobile apps, built-in video conferencing (external link used), AI matching, multi-language content beyond RU/KZ UI, live-payment production certification.

## Engineering complexity (for committee)
Multi-role system with RBAC; booking with conflict-free slot allocation (availability vs exceptions vs existing bookings); payment state machine with idempotent provider callbacks; rating aggregation; document-verification workflow; relational schema of 14 entities (see [ER diagram](../diagrams/TutorGo.drawio)).
