---
title: "Hirearchy"
slug: "hirearchy"
status: "published"
tags: ["React", "Node", "Authentication", "MongoDB"]
timeline:
  - date: "2026-04-05"
    label: "Initial commit — project scaffolded"
  - date: "2026-04-06"
    label: "Built sidebar and dashboard UI"
  - date: "2026-04-07"
    label: "Completed employee management UI"
  - date: "2026-04-08"
    label: "Completed attendance and leave UI"
  - date: "2026-04-09"
    label: "Finished payslip UI — frontend complete"
  - date: "2026-04-10"
    label: "Started backend — routes and controllers"
  - date: "2026-04-11"
    label: "Built employee, auth, and attendance APIs"
  - date: "2026-04-12"
    label: "Finished leave and payslip controllers"
  - date: "2026-04-13"
    label: "Backend completed — dashboard API, admin seed script"
  - date: "2026-04-14"
    label: "v1 complete"
  - date: "2026-06-04"
    label: "Refactor pass — sidebar, dashboards, and core UI"
  - date: "2026-06-12"
    label: "Refactored remaining flows — attendance, leave, payslip, profile"
  - date: "2026-07-17"
    label: "Added JWT auth with refresh tokens, rate limiting, input validation"
  - date: "2026-08-05"
    label: "Branding polish — favicon, cleanup"
startDate: "2026-04-05"
lastUpdated: "2026-08-06"
summary: "A role-aware HR platform for managing employees, attendance, leave, and payroll."
---

## Overview

Hirearchy is built for small business owners or team leads managing 10–50 employees who are still tracking attendance and leave in spreadsheets. Tools like Workday are bloated and expensive for a small startup. The goal was a lightweight, self-service HR hub — employees can clock in or request time off in seconds, and the owner gets one dashboard to approve requests, track hours, and generate monthly payslips without the admin overhead.

## Architecture

React frontend, Express API, MongoDB, JWT-based auth with role middleware.

One decision worth calling out: how attendance, approved leaves, and the background cron job connect. The automated job originally sent "missing check-in" emails to anyone who hadn't clocked in by 11:30 AM — but employees on approved leave were getting flagged too. Fixing it meant having the background worker cross-reference active employees against approved `LeaveApplication` date ranges _before_ deciding who actually counts as absent.

## Problems I Solved

Early on, the focus was entirely on making the core workflows work — login, check-in, leave requests. What I didn't think about was what happens when the input isn't well-formed: a bad payload to a POST route would hit Mongoose's schema validation and throw an unhandled error, crashing the route instead of failing gracefully.

Coming back to it later, I added Zod schema validation, Helmet headers, and rate limiting so malformed or malicious requests get rejected before they ever reach the database.

## Trade-offs

**JWT over sessions** — JWTs kept the API stateless, which meant I could deploy the React frontend and Express backend separately without standing up a session store like Redis.

**MongoDB over Postgres** — Employee profiles and payslip structures kept changing while I was building. MongoDB's flexible schema let me iterate on the data model without writing a migration every time I added a field.

## Lessons Learned

I treated security as "can this user log in?" and called it done. Shipping v1 taught me that security isn't something you sprinkle on afterward — next time I'd build in input validation, rate limiting, and proper token refresh handling from day one instead of patching them in three months later.
