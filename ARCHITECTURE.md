# Architecture

The UI never owns course text. Lessons are data. Pages render that data.

```text
src/
├── app entry          main.tsx, App.tsx
├── components/        layout and reusable UI
├── features/
│   ├── course/        navigation helpers and stats
│   ├── editor/        Monaco playground
│   ├── exercises/     exercise engine UI
│   ├── progress/      derived progress views
│   ├── search/        command palette
│   └── pwa/           install + offline notice
├── content/typescript course metadata and lessons
├── lib/               idb, search, executor bridge
├── store/             zustand stores
├── workers/           TypeScript compile + run
└── types/             Course, Lesson, Exercise, Progress
```

## Content pipeline

1. Lesson files export `Lesson` objects.
2. `course.ts` registers them and defines sections.
3. `registry.ts` looks up lessons by id/slug and builds the search index.
4. `LessonPage` renders markdown blocks, playgrounds, and exercises.

Adding a lesson should not require changing layout or routing code.

## Code execution

```text
Monaco Editor
      ↓
TypeScript compiler (Web Worker)
      ↓
JavaScript
      ↓
sandboxed Function in the worker
      ↓
captured console + test results
      ↓
Output panel
```

The worker is killed and recreated after a 4 second timeout.

## Persistence

`useProgressStore` hydrates from IndexedDB (`ts-handbook` / `kv` / `progress`) and writes back on every mutation. Settings use `localStorage` via Zustand persist. The app does not need a backend.

## Routing

| Path | Page |
| --- | --- |
| `/` | Home |
| `/course` | Section list |
| `/lesson/:slug` | Lesson |
| `/exercise/:slug/:exerciseId` | Focused exercise |
| `/progress` | Dashboard |
| `/search` | Search |
| `/bookmarks` | Bookmarks |
| `/settings` | Theme, editor, reset |

Lesson routes and Monaco are lazy-loaded so the first paint does not download the editor.
