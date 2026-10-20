# TutorGo UX prototype

Six static design screens describe five key workflows and a mobile search layout. These are specifications, not implemented application screens. All people, ratings, prices, bookings and documents are sample data. The existing runnable landing is in [tutor-platform](../tutor-platform/).

| Screen | PNG preview | Editable SVG | Requirements |
|---|---|---|---|
| Search and filter | [Search](01-search-results.png) | [Source](01-search-results.svg) | FR-07, FR-18, NFR-06 |
| Profile, slot and pending request | [Profile](02-tutor-profile-booking.png) | [Source](02-tutor-profile-booking.svg) | FR-04, FR-08–10 |
| Sandbox checkout and outcomes | [Checkout](03-checkout.png) | [Source](03-checkout.svg) | FR-09–11 |
| Tutor availability and requests | [Tutor dashboard](04-tutor-dashboard.png) | [Source](04-tutor-dashboard.svg) | FR-08, FR-10, FR-16 |
| Administrator verification | [Verification](05-admin-verification.png) | [Source](05-admin-verification.svg) | FR-06, FR-17, NFR-04 |
| Mobile search, 390 px | [Mobile](06-mobile-search.png) | [Source](06-mobile-search.svg) | FR-07, NFR-06 |

## Walkthrough

1. Select mathematics, a tenge budget and an available time in search. Open a tutor profile.
2. Select a free 60-minute slot. Sending a request creates a pending booking, not a confirmed lesson.
3. The tutor accepts or declines. Only an accepted, unexpired request can enter sandbox checkout.
4. A verified successful payment confirms the booking. Failure preserves the current request while it is still valid; retries do not create another charge/booking.
5. After the lesson is completed, an eligible student can leave one review. Review entry is specified in requirements; it does not have a separate mockup yet.

The tutor dashboard shows request acceptance, timetable editing and payout information. The admin screen shows a private-file preview, approval and mandatory rejection reason. It does not contain real certificates.

## Error and accessibility behaviour

Search with no results offers broader filters. Taken slots cannot be submitted; a conflict keeps entered data and offers fresh availability. Pending requests show the response/payment deadline. Expired/cancelled bookings cannot become confirmed after a late callback; that event enters refund/reconciliation handling. Rejection and payment failures use text as well as colour.

Implementation should provide keyboard navigation, visible focus, form labels, meaningful error messages and live status announcements. The mobile reference uses a single column; implementation still needs testing at 360, 390, 768 and 1440 px. Static mockups do not prove accessibility conformance or responsive behaviour.

## Rebuild

Use Node.js and run `npm ci` followed by `npm run design` in [tools](../tools/). The [generator](../tools/generate-design-assets.cjs) writes SVG/PNG pairs and the three updated draw.io diagrams. SVGs can also be edited in a vector editor; edit the generator to preserve changes across regeneration. The renderer is pinned in the tools lockfile. System fonts may vary across machines; PNGs are committed for a stable visual reference.
