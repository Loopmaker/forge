# Forge

_Behind every build._

Forge is a developer journal for documenting real software projects — not just what was built, but _why_: the architecture decisions, the trade-offs, the bugs that took too long to find, and what I'd do differently next time.

Instead of a portfolio that just shows finished projects, Forge treats each one as a case study: Overview, Architecture, Problems Solved, Trade-offs, and Lessons Learned — written the way an engineer would actually explain their own decisions.

**Live:** _[add deployed URL here]_
**Read a case study:** `/journal/hirearchy`

---

## Why Next.js

Forge was built specifically to demonstrate Next.js patterns where the framework is load-bearing, not decorative:

- **Static Site Generation** — case study pages are pre-rendered at build time via `generateStaticParams`
- **Server Actions** — all create/update/delete operations use `"use server"` functions called directly from HTML forms, no separate API layer
- **Auth-gated routes** — the dashboard is protected via Clerk, with resource-based auth checks in each page/action rather than middleware-only protection
- **Cache revalidation** — publishing or editing an entry calls `revalidatePath`, so changes appear immediately without a redeploy
- **Dynamic metadata** — `generateMetadata` produces per-project titles and Open Graph tags for link sharing

---

## Tech Stack

| Layer              | Choice                                                                 |
| ------------------ | ---------------------------------------------------------------------- |
| Framework          | Next.js 16 (App Router)                                                |
| Language           | TypeScript                                                             |
| Styling            | Tailwind CSS v4 (custom `@theme` design tokens)                        |
| Database           | PostgreSQL (Neon, serverless)                                          |
| ORM                | Prisma 6                                                               |
| Auth               | Clerk                                                                  |
| Markdown rendering | react-markdown                                                         |
| Fonts              | Fraunces (display), Public Sans (body), JetBrains Mono (metadata/code) |

---

## Design

Forge's visual identity — "Logbook" — is built around the feel of a physical engineer's notebook: warm cream paper, a dot-grid texture, a persistent red left-margin rule (echoing a ledger), and a rotated "rubber stamp" treatment for draft/published status.

Key design decisions:

- **Serif for headings, sans for body, monospace for metadata** — mirrors how a real notebook separates title, prose, and timestamps
- **The red margin rule repeats at every scale** — page layout, individual case study headings, and timeline entries all reuse the same motif rather than introducing new patterns
- **The Timeline component** uses a dashed connector line rather than a solid one, deliberately reading as hand-drawn rather than corporate

---

## Features

- **Public journal** (`/journal`) — browse published case studies, filter by tag, full-text search across title/summary/content
- **Case study pages** — architecture breakdown, build-log timeline, trade-offs, lessons learned, rendered from Markdown
- **Authenticated dashboard** (`/dashboard`) — create, edit, and delete entries via Server Actions
- **Draft/Published workflow** — draft entries are visible only in the dashboard, filtered out of all public routes and direct links
- **Auto-generated slugs** — derived from title server-side, avoiding broken URLs from manual entry

---

### Prerequisites

- Node.js 18+
- A PostgreSQL database (this project uses [Neon](https://neon.tech))
- A [Clerk](https://clerk.com) account for auth

---

## Case Studies

Forge currently documents:

- **[Hirearchy](/journal/hirearchy)** — role-aware HR platform (React, Express, MongoDB, JWT)
- **[Holler](/journal/holler)** — e-commerce with live chat/video support (React, Express, PostgreSQL, Clerk, Stream)
- **[Drowse](/journal/drowse)** — ambient study app (React, Web Audio API, localStorage)

---

## What's Next

- Timeline entry management from the dashboard (currently seed-only)
- A Forge self-entry — documenting the build of Forge itself
- Markdown preview while editing
