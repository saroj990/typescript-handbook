# TypeScript Course & Handbook

An interactive Progressive Web App for learning TypeScript from beginner concepts to real-world patterns. Lessons, runnable examples, exercises, search, bookmarks, and progress tracking all work locally — including offline after the first visit.

## Tech stack

- React + Vite + TypeScript
- Tailwind CSS
- React Router
- Monaco Editor
- TypeScript compiler in a Web Worker
- Zustand + IndexedDB
- Fuse.js
- vite-plugin-pwa
- Vitest + React Testing Library

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

Open the printed local URL. You can start learning immediately; no account is required.

## Build

```bash
npm run build
npm run preview
```

## Test

```bash
npm run test:run
```

Watch mode:

```bash
npm test
```

## Lint and format

```bash
npm run lint
npm run format
```

## Add a lesson

Course content lives in `src/content/typescript/lessons/`. Export a `Lesson` object (or an array of them), register the files in `src/content/typescript/course.ts`, and add the lesson id to a section. See `COURSE_AUTHORING.md`.

## Add an exercise

Add an `Exercise` to the lesson's `exercises` array. Write-code exercises need `starterCode`, `solution`, `hints`, and `tests` whose `expression` is evaluated after the learner code. See `COURSE_AUTHORING.md`.

## How code execution works

The Monaco editor stays on the main thread. When you click Run, the TypeScript source is sent to `src/workers/executor.worker.ts`. The worker compiles with the TypeScript compiler, executes the JavaScript with a captured `console`, and posts logs, diagnostics, and test results back. A timeout terminates and recreates the worker.

Learner code is never executed on the UI thread.

## How PWA functionality works

`vite-plugin-pwa` generates a web app manifest and a service worker. The first online visit caches the application shell, course content, and editor assets. After that you can install the app and keep reading lessons, running exercises, and saving progress while offline. Progress is stored in IndexedDB on the device.

## Architecture

See `ARCHITECTURE.md` for the content-driven layout and data flow.

## Contributing

See `CONTRIBUTING.md`.
