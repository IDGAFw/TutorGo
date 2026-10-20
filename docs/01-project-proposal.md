# 1. Project proposal

**Title:** TutorGo.kz — tutor marketplace for Kazakhstan
**Team:** see [README](../README.md#team-and-supervisor) | **Supervisor:** Kamila Tanybergenova

Legend: E denotes published/observed desk evidence in [02](02-evidence-of-relevance.md); A denotes a local assumption to test. No interviews have yet been conducted. Existing local competitors, including BUKI, are included in [04](04-existing-systems-comparison.md).

## Problem statement
Students and parents in Kazakhstan looking for a tutor (school subjects, ЕНТ/UNT, NIS/BIL entrance, English, Kazakh) rely on word of mouth, Instagram/Telegram channels and classified ads **[A]**. As a result:
1. tutor qualifications and reviews cannot be verified **[A]**;
2. comparing price, subject level and free time slots requires many manual chats **[A]**;
3. scheduling, payment and cancellation are handled ad hoc, with no protection for either side **[A]**;
4. tutors may spend time on self-marketing and coordinating requests **[A]**. This needs direct local evidence; no invented participant or founder quotation is used.

## Target users
| Role | Needs |
|---|---|
| Student / parent | find a verified tutor by subject, goal, price, format; book a slot; pay; leave a review |
| Tutor | profile, subjects & prices, availability, verification, bookings, payouts, reputation |
| Administrator | verify tutor documents, moderate reviews/disputes, view payments & payouts |

## Aim
Design and implement an MVP web platform that lets students compare tutor evidence, request an available slot and complete a sandbox-paid booking. Evaluate whether finding a matching tutor and sending a valid request requires less effort than a controlled contact-based baseline. Tutor-response delay and payment correctness are evaluated separately. Improved academic performance is not claimed as an outcome of the marketplace.

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
**Must scope:** registration/login and role guards; tutor profiles and document verification; catalogue and filters; availability and booking requests; tutor acceptance; external online-lesson link; sandbox payment; completed-booking reviews. **Should scope:** favorites, messages, notifications, payout records and broader admin moderation. **Could scope:** optional ranking. Priorities and acceptance criteria are in [06](06-requirements.md).
**Out of scope:** native mobile apps, built-in video conferencing (external link used), AI matching, multi-language content beyond RU/KZ UI, live-payment production certification.

## Engineering complexity (for committee)
Multi-role system with RBAC; booking with conflict-free slot allocation (availability vs exceptions vs existing bookings); payment state machine with idempotent provider callbacks; rating aggregation; document-verification workflow; relational schema of 14 entities (see [ER diagram](../diagrams/TutorGo.drawio)).
