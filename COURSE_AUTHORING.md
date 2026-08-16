# Course authoring

Lessons are TypeScript modules, not React pages.

## Lesson shape

```ts
import type { Lesson } from "@/types/course";

export const lesson: Lesson = {
  id: "union-types",
  slug: "union-types",
  title: "Union Types",
  description: "Model values that can be one of several types.",
  level: "beginner",
  sectionId: "fundamentals",
  order: 7,
  estimatedMinutes: 16,
  objectives: ["Write a union type"],
  blocks: [
    { type: "markdown", markdown: "## Why does this exist?\n\n..." },
    {
      type: "playground",
      playground: { id: "union-id", title: "Try it", code: `const id: string | number = 1;\nconsole.log(id);` },
    },
  ],
  exercises: [],
  takeaways: ["A union is one type or another."],
};
```

## Register the lesson

1. Export it from a file under `src/content/typescript/lessons/`.
2. Import that file in `src/content/typescript/course.ts`.
3. Include the lesson id in a section's `lessonIds`.

`registerLessons` throws if an id or slug is duplicated.

## Exercise types

| Type | What the learner does |
| --- | --- |
| `write-code` | Implement a function or type-backed snippet |
| `fix-bug` | Repair starter code |
| `predict-output` | Type the expected console/result string |
| `type-challenge` | Produce a type that satisfies tests |
| `multiple-choice` | Pick a concept answer |
| `refactoring` | Turn loose JS into typed TS |
| `real-world` | Build a small feature |

Write-code exercises should include:

- `starterCode`
- `tests` with boolean `expression`s, e.g. `add(2, 3) === 5`
- `hints`
- `solution`

Expressions run in the same scope as the learner code after TypeScript is transpiled. Prefer runtime-checkable tests. Do not rely on types surviving into the worker.

## Writing quality

Every lesson should answer:

1. What is this?
2. Why does it exist?
3. What problem does it solve?
4. How does it work?
5. How do I use it?
6. What mistakes should I avoid?
7. Where would I use this in real software?

Do not add empty placeholder lessons.
