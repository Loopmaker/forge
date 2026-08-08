---
title: "Holler"
slug: "holler"
status: "published"
tags: ["React", "Express", "PostgreSQL", "Clerk", "Stream"]
timeline:
  - date: "2026-05-03"
    label: "Initial commit — project scaffolded"
  - date: "2026-05-04"
    label: "Database schema, Clerk auth, Docker setup, cron job"
  - date: "2026-05-05"
    label: "Product/stream/user routers, checkout flow, Polar webhook, Sentry error tracking"
  - date: "2026-05-06"
    label: "Cart functionality with Zustand, product catalog and home page"
  - date: "2026-05-07"
    label: "Order chat and video calls via Stream, admin product management, checkout confirmation"
  - date: "2026-05-11"
    label: "Documentation and deployment polish"
startDate: "2026-05-03"
lastUpdated: "2026-05-11"
summary: "An e-commerce store with live chat and video support built into the shopping experience."
---

## Overview

Most e-commerce tutorials stop at "add to cart" and a basic checkout. Holler simulates a real modern store where live customer support is built directly into the shopping experience. The main user is an online shopper who wants instant help via chat or video before buying, plus store admins who need a back-office dashboard to manage products and handle incoming support requests in one place.

## Architecture

React frontend, Express API, PostgreSQL, Clerk for auth, Stream for real-time chat and video.

The trickiest piece was connecting Clerk auth to Stream's chat and video. Stream requires secure server-side tokens tied to authenticated user IDs, so clients can't forge chat identities. Instead of letting the frontend request chat access directly, Express endpoints verify the user's Clerk session first, then issue the corresponding Stream token — keeping real-time sessions secure without cluttering the frontend logic.

## Problems I Solved

Early on, navigating between product pages or refreshing during an active support session would disconnect the Stream chat — the client was re-initializing on every route change. Fixing it meant moving chat state management into a React Context provider higher up the component tree, so the connection persists while the user browses instead of resetting on every navigation.

## Trade-offs

**PostgreSQL over MongoDB** — E-commerce needs strict relationships and transactional consistency for orders, products, and inventory. SQL constraints prevent race conditions like two users buying the last item in stock at the same moment.

**Third-party services over building in-house** — Building custom auth, WebRTC video, and image CDN processing from scratch would take months. Clerk, Stream, and ImageKit let me ship faster and stay focused on core store logic.

## Lessons Learned

The biggest lesson was not trusting client-side data for order math. In the first pass, product prices were passed straight from React state to the backend during checkout — a real security risk, since nothing stopped a modified request from changing the price. It was refactored so the frontend only sends item IDs and quantities, and the backend re-fetches prices from PostgreSQL to calculate the final total. Next time, server-side validation on financial data goes in from day one, not after.
