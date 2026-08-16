# Contributing

## Local setup

```bash
npm install
npm run dev
```

Run checks before opening a pull request:

```bash
npm run test:run
npm run lint
npm run build
```

## Project rules

1. Use strict TypeScript. Avoid `any` unless the reason is documented next to the use.
2. Keep course content in `src/content`. Do not hardcode lessons into page components.
3. Reuse existing UI. Do not add a second button, card, or editor.
4. Execute learner code only in the Web Worker.
5. Keep the app usable without a network and without an account.
6. Prefer a small, obvious change over a new abstraction.

## Content changes

Follow `COURSE_AUTHORING.md`. A new lesson needs real explanation, a runnable example, an exercise, a solution, and takeaways.

## Application changes

- UI: `src/components` and `src/features`
- Persistence: `src/lib/idb.ts` and `src/store`
- Execution: `src/workers/executor.worker.ts` and `src/lib/executor.ts`

Add or update tests when you change progress, search, navigation, or the exercise engine.
