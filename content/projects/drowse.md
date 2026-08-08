---
title: "Drowse"
slug: "drowse"
status: "published"
tags: ["React", "Web Audio API", "localStorage"]
timeline:
  - date: "2026-05-01"
    label: "Assets, data models, background categories, player controls"
  - date: "2026-05-03"
    label: "v1 complete — bug fixes, README"
  - date: "2026-05-08"
    label: "Migrated media to Cloudinary, added video preloading and quality adaptation"
  - date: "2026-06-20"
    label: "Accessibility pass, video playback fixes, audio loading/error states"
  - date: "2026-06-22"
    label: "Built FocusTimer, presets, swipe-to-dismiss panels, localStorage persistence"
  - date: "2026-06-27"
    label: "Task management and scene management replace static presets"
  - date: "2026-07-02"
    label: "Layout polish and code cleanup"
startDate: "2026-05-01"
lastUpdated: "2026-07-02"
summary: "A web-based ambient study app combining video backgrounds, lo-fi music, a sound effect mixer, and a focus timer — no account required."
---

## Overview

Most study tools either require an account, put ambient mixing behind a paywall, or bury the actual controls under a cluttered interface. Drowse combines video backgrounds, lo-fi music, a multi-track sound effect mixer, and a focus timer into one screen — built for college students studying for exams, remote workers who want background noise, or anyone who wants a zero-friction lo-fi setup without signing up for anything.

## Architecture

React frontend, Web Audio API for sound, localStorage for persistence.

The non-obvious piece was structuring audio around a shared Web Audio API `AudioContext` singleton with custom gain nodes for sound effects, while background music runs on standard HTML5 audio/video elements. Each individual SFX volume slider maps to its own sub-gain node feeding into a master gain node — so adjusting overall ambience or switching scenes doesn't reset or break individual sound levels.

## Problems I Solved

Browsers block the Web Audio API from starting until the user interacts with the page, which meant the sound effect mixer and timer alarms would silently fail if someone loaded a saved scene right away — no error, just no sound. Fixing it meant adding a user-gesture listener that safely resumes the shared `AudioContext` on first click, plus strict cleanup logic so rapidly switching scenes didn't leave orphan audio nodes looping in the background.

## Trade-offs

**localStorage over a backend database** — Users get instant access with no signup friction, at the cost of saved scenes not syncing across devices.

**Native Web Audio API over a library like Howler.js** — Kept the bundle small and gave direct control over gain nodes, at the cost of handling audio context state and browser autoplay restrictions manually instead of letting a library abstract it away.

## Lessons Learned

UI controls and visual scenes got built first, with audio state and browser autoplay quirks treated as a late-stage fix. Next time, mapping out the audio lifecycle — context resumption, cleanup hooks — comes before building UI features on top of it, not after.
