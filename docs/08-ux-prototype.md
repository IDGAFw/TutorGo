# 8. UX / prototype

## Implemented prototype
Landing page (React + TypeScript + Tailwind + Framer Motion) in [`tutor-platform/`](../tutor-platform): header/navigation, hero with subject/goal search controls, popular subjects, tutor highlights, "how it works" and call-to-action sections. These controls are visual placeholders; search and booking are not implemented. Run: see [README](../README.md#run-the-frontend).

## Planned mockups of key scenarios

The archive does not contain a `prototype/` directory or these mockups. The filenames below are planned deliverables, not existing artifacts.
| # | Scenario | Requirements | File |
|---|---|---|---|
| 1 | Student searches and filters tutors | FR-07 | `prototype/01-search-results.png` (planned) |
| 2 | Student opens a profile and picks a free slot | FR-04, FR-08, FR-09 | `prototype/02-tutor-profile-booking.png` (planned) |
| 3 | Student pays; success and failure states | FR-09–11 | `prototype/03-checkout.png` (planned) |
| 4 | Tutor manages bookings, availability, payouts | FR-08, FR-10, FR-16 | `prototype/04-tutor-dashboard.png` (planned) |
| 5 | Admin verifies tutor documents | FR-06, FR-17 | `prototype/05-admin-verification.png` (planned) |

Planned format: low-fidelity wireframes with editable sources and PNG exports. Prices, names and numbers should be identified as sample data.

## Interaction principles
Booking in ≤4 steps (search → profile → slot → pay); verified badge visible in search and profile; empty/failed states are explicit (no results, payment failed, slot taken).

## Known gaps in the landing
Statistics ("12 000+ students", subject counters) and tutor cards are placeholder content; hero photo is hotlinked from Unsplash (replace with a local asset before release). Mark this explicitly during the demo.
