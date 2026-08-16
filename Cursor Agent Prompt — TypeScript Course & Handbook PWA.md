# Build a TypeScript Course & Handbook PWA

You are an expert frontend engineer, TypeScript educator, UX designer, and technical writer.

Build a production-quality **Progressive Web App (PWA)** that acts as an interactive **TypeScript Course + Handbook**, taking a learner from absolute beginner concepts to advanced TypeScript and real-world patterns.

The application should not feel like a basic documentation website. It should feel like an interactive learning platform similar to a lightweight combination of MDN, freeCodeCamp, and a modern technical handbook.

---

# 1. Primary Goal

Create a complete TypeScript learning platform with:

- Beginner → Intermediate → Advanced curriculum
- Structured lessons
- Explanations
- Real-world examples
- Runnable TypeScript code
- Interactive exercises
- Expected output
- Hints
- Solutions
- Progress tracking
- Course completion tracking
- Search
- Bookmarks
- Dark/light mode
- Responsive design
- PWA/offline support
- Local persistence
- Keyboard navigation
- Clean developer-focused UI

The learner should be able to install the application as a PWA and continue learning even when offline.

---

# 2. Recommended Technology Stack

Use:

- React
- Vite
- TypeScript
- React Router
- Tailwind CSS
- shadcn/ui or a similarly clean component system
- Monaco Editor for code editing
- TypeScript compiler running in the browser
- Web Worker for executing user code
- vite-plugin-pwa
- IndexedDB for persistent learning data
- Zustand or another lightweight state-management solution
- Fuse.js or equivalent for client-side search
- Vitest
- React Testing Library
- ESLint
- Prettier

Do not introduce unnecessary frameworks or dependencies.

Prefer a simple architecture that is easy to understand and maintain.

---

# 3. Important Requirement: Content Must Be Separate From UI

Do NOT hardcode the entire course inside React components.

Create a content-driven architecture.

Example:

```text
src/
├── app/
├── components/
├── features/
│   ├── course/
│   ├── editor/
│   ├── exercises/
│   ├── progress/
│   └── search/
├── content/
│   └── typescript/
│       ├── 01-getting-started/
│       ├── 02-basic-types/
│       ├── 03-functions/
│       ├── 04-objects/
│       ├── 05-advanced-types/
│       └── ...
├── lib/
├── store/
├── hooks/
├── workers/
└── types/
```

Course content should be represented using Markdown/MDX or structured TypeScript/JSON metadata.

The UI should consume the content.

This should make it easy to add new lessons without modifying the application architecture.

---

# 4. Course Structure

Create the curriculum in the following progression.

## LEVEL 0 — Programming & JavaScript Prerequisites

Explain only what is necessary for someone who knows little JavaScript.

Lessons:

1. What is JavaScript?
2. What is TypeScript?
3. Why TypeScript?
4. JavaScript vs TypeScript
5. Installing Node.js
6. Creating a TypeScript project
7. tsconfig.json
8. Running TypeScript
9. TypeScript compilation
10. Type inference

---

# LEVEL 1 — TypeScript Fundamentals

Lessons:

1. Variables
2. Primitive types
   - string
   - number
   - boolean
   - bigint
   - symbol
3. Arrays
4. Tuples
5. Objects
6. Type aliases
7. Interfaces
8. Optional properties
9. Readonly properties
10. Union types
11. Literal types
12. Type narrowing
13. `any`
14. `unknown`
15. `never`
16. `void`
17. Null and undefined
18. Optional values
19. Type assertions
20. `as const`

Include plenty of small examples.

---

# LEVEL 2 — Functions

Lessons:

1. Function parameter types
2. Return types
3. Optional parameters
4. Default parameters
5. Rest parameters
6. Function types
7. Callback functions
8. Arrow functions
9. Higher-order functions
10. Overloads
11. `this` typing
12. Generic functions

---

# LEVEL 3 — Objects & Interfaces

Lessons:

1. Interfaces
2. Type aliases
3. Interface vs type
4. Extending interfaces
5. Intersection types
6. Nested objects
7. Index signatures
8. Readonly
9. Optional properties
10. Function properties
11. Method definitions
12. Declaration merging
13. Structural typing

---

# LEVEL 4 — Classes & OOP

Lessons:

1. Classes
2. Constructors
3. Properties
4. Methods
5. Access modifiers
6. public
7. private
8. protected
9. readonly
10. Parameter properties
11. Getters/setters
12. Static members
13. Abstract classes
14. Inheritance
15. Method overriding
16. Implements
17. Composition vs inheritance

---

# LEVEL 5 — Generics

This should be a major section.

Lessons:

1. Why generics?
2. Generic functions
3. Generic interfaces
4. Generic type aliases
5. Generic classes
6. Multiple generic parameters
7. Generic constraints
8. `keyof`
9. Generic defaults
10. Generic utility functions
11. Conditional behavior with generics
12. Real-world generic patterns

Examples should include:

```ts
function identity<T>(value: T): T {
  return value;
}
```

And progressively more realistic examples.

---

# LEVEL 6 — Advanced Types

Lessons:

1. `keyof`
2. `typeof`
3. Indexed access types
4. Conditional types
5. `infer`
6. Mapped types
7. Template literal types
8. Recursive types
9. Discriminated unions
10. Exhaustiveness checking
11. Branded types
12. Nominal typing patterns
13. Type predicates
14. Assertion functions
15. `satisfies`
16. Advanced narrowing

---

# LEVEL 7 — Built-in Utility Types

Create dedicated lessons for:

- Partial
- Required
- Readonly
- Record
- Pick
- Omit
- Exclude
- Extract
- NonNullable
- Parameters
- ConstructorParameters
- ReturnType
- InstanceType
- Awaited

For each utility type explain:

1. What it does
2. Why it exists
3. Syntax
4. Simple example
5. Real-world example
6. How it works internally
7. Exercise

---

# LEVEL 8 — Modules & Project Structure

Lessons:

1. import
2. export
3. default exports
4. named exports
5. barrel files
6. module resolution
7. ESM vs CommonJS
8. package.json
9. tsconfig configuration
10. path aliases
11. Project architecture
12. Type declaration files

---

# LEVEL 9 — TypeScript + JavaScript Ecosystem

Teach TypeScript in realistic applications.

Examples:

- TypeScript + Node.js
- TypeScript + Express
- TypeScript + React
- TypeScript + REST APIs
- TypeScript + Fetch
- TypeScript + JSON
- TypeScript + environment variables
- TypeScript + npm packages
- TypeScript + third-party libraries

---

# LEVEL 10 — Real-World TypeScript Patterns

Lessons should include realistic engineering scenarios.

Examples:

## API response typing

```ts
interface User {
  id: number;
  name: string;
  email: string;
}
```

## Result type

```ts
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

## State machines

```ts
type State =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: string };
```

## Configuration objects

## Event systems

## Repository patterns

## DTOs

## API clients

## Validation

## Error handling

## Type-safe database models

---

# LEVEL 11 — TypeScript + React

Create a complete section.

Lessons:

1. Typing React props
2. Typing state
3. Typing events
4. Forms
5. useRef
6. useEffect
7. useReducer
8. Context
9. Custom hooks
10. Generic components
11. Component composition
12. API response types
13. Type-safe forms
14. Common React TypeScript mistakes

---

# LEVEL 12 — TypeScript + Backend

Cover:

- Node.js
- Express/Fastify concepts
- API DTOs
- Request types
- Response types
- Service types
- Repository types
- Error types
- Environment configuration
- Database models
- Runtime validation

Explain an important concept:

> TypeScript types disappear at runtime.

Then explain why runtime validation libraries such as Zod are sometimes required.

---

# LEVEL 13 — TypeScript Compiler Deep Dive

Advanced learners should understand what TypeScript actually does.

Lessons:

1. Type checking
2. Compilation
3. Type erasure
4. JavaScript output
5. tsconfig
6. Compiler options
7. strict mode
8. target
9. module
10. moduleResolution
11. declaration
12. sourceMap
13. noImplicitAny
14. strictNullChecks
15. noUncheckedIndexedAccess
16. exactOptionalPropertyTypes

Include examples showing how compiler configuration changes behavior.

---

# LEVEL 14 — Advanced Type System

Create an advanced section for experienced developers.

Topics:

- Structural typing
- Variance
- Covariance
- Contravariance
- Type compatibility
- Generic variance
- Conditional types
- Distributive conditional types
- `infer`
- Recursive types
- Higher-order type transformations
- Type-level programming

This section should be significantly more challenging.

---

# LEVEL 15 — TypeScript Design Patterns

Include:

- Factory
- Builder
- Strategy
- Adapter
- Repository
- Dependency Injection
- Result/Either
- State Machine
- Command
- Observer
- Type-safe event emitter

Explain when to use and when NOT to use each pattern.

---

# 5. Lesson Format

Every lesson must follow a consistent structure.

Example:

```text
# Union Types

## What You Will Learn

...

## Why Does This Exist?

...

## Basic Example

```ts
type ID = string | number;
```

## Try It Yourself

Interactive editor.

## How It Works

...

## Real-World Example

...

## Common Mistakes

...

## Exercise

### Problem

...

### Expected Result

...

### Hint

...

### Solution

...

## Key Takeaways

...

## Next Lesson

...
```

Every lesson should contain:

- Learning objectives
- Concept explanation
- Code examples
- Runnable code
- Interactive exercise
- Expected output
- Hint
- Solution
- Common mistakes
- Real-world example
- Key takeaways
- Previous/next navigation

---

# 6. Interactive Code Editor

Create a reusable code editor component.

Requirements:

- Monaco Editor
- TypeScript syntax highlighting
- Code completion where practical
- Error highlighting
- Run button
- Reset button
- Copy button
- Output panel
- Console output
- Compile errors
- Runtime errors

Example UI:

```text
┌─────────────────────────────────────────────┐
│ TypeScript                                  │
│                                             │
│ const name: string = "Saroj";              │
│ console.log(name);                          │
│                                             │
│                           [Run] [Reset]     │
├─────────────────────────────────────────────┤
│ Output                                      │
│ Saroj                                       │
└─────────────────────────────────────────────┘
```

---

# 7. Code Execution Architecture

Do NOT execute arbitrary learner code directly on the main application thread.

Use a Web Worker.

Recommended flow:

```text
Monaco Editor
      ↓
TypeScript Compiler
      ↓
JavaScript
      ↓
Web Worker
      ↓
Captured console output
      ↓
Output panel
```

Implement:

- Execution timeout
- Error handling
- Console interception
- Infinite loop protection
- Worker termination
- Worker recreation after timeout

The editor should support TypeScript syntax even though execution ultimately happens using JavaScript.

Keep the execution environment intentionally limited.

---

# 8. Exercise System

Create a reusable exercise engine.

Exercise types:

### 1. Write Code

Learner writes TypeScript.

### 2. Fix the Bug

Provide broken code.

### 3. Predict the Output

Learner predicts output.

### 4. Type Challenge

Learner must create a type satisfying requirements.

### 5. Multiple Choice

Conceptual questions.

### 6. Refactoring

Convert poorly typed JavaScript into TypeScript.

### 7. Real-World Challenge

Build a small feature.

---

# 9. Exercise Example

```text
Exercise: Create a typed function

Write a function called `add` that:

- accepts two numbers
- returns a number
- does not use `any`

[Code Editor]

[Run Tests]

Tests:
✓ add(2, 3) === 5
✓ add(10, 5) === 15
```

The exercise engine should be capable of running predefined tests against learner code.

---

# 10. Progress Tracking

Track:

- Lessons started
- Lessons completed
- Exercises completed
- Exercise attempts
- Correct answers
- Course progress
- Section progress
- Bookmarks
- Last visited lesson
- Current streak if practical

Persist locally using IndexedDB.

The application must continue working without an account.

Example dashboard:

```text
TypeScript Course

Overall Progress
████████████░░░░░░ 62%

Fundamentals       100%
Functions           85%
Generics            40%
Advanced Types      15%

Exercises
Completed: 72
Remaining: 48

Continue Learning
→ Conditional Types
```

---

# 11. PWA Requirements

The application must be a real installable PWA.

Implement:

- Web App Manifest
- Service worker
- Offline caching
- Install prompt
- App icons
- Splash configuration where supported
- Offline fallback
- Cache course content
- Cache application assets
- Versioned cache strategy

The learner should be able to:

1. Open the site online.
2. Install it.
3. Disconnect from the internet.
4. Continue reading lessons.
5. Run exercises.
6. Track progress.

Do not make the application dependent on a backend for basic learning functionality.

---

# 12. Responsive Design

The application must work well on:

- Desktop
- Laptop
- Tablet
- Mobile

Desktop layout:

```text
┌──────────────┬──────────────────────────────┐
│              │                              │
│ Course       │ Lesson                       │
│ Navigation   │                              │
│              │ Content                      │
│              │                              │
│              │ Code Editor                  │
│              │                              │
│              │ Exercise                     │
│              │                              │
└──────────────┴──────────────────────────────┘
```

Mobile:

```text
┌──────────────────────────┐
│ ☰ TypeScript Handbook    │
├──────────────────────────┤
│ Lesson                   │
│                          │
│ Content                  │
│                          │
│ Code Editor              │
│                          │
│ Exercise                 │
└──────────────────────────┘
```

---

# 13. UI Design

Use a modern developer-focused design.

Characteristics:

- Clean
- Minimal
- Excellent typography
- Comfortable reading width
- Good code block presentation
- Strong visual hierarchy
- Dark mode
- Light mode
- Keyboard friendly
- No unnecessary animations

Think:

- modern documentation site
- developer IDE
- interactive learning platform

Avoid making it look like a generic corporate LMS.

---

# 14. Main Pages

Create:

## Home

Show:

- TypeScript Handbook
- Course description
- Beginner → Advanced
- Start Learning
- Continue Learning
- Course statistics

---

## Course

Show:

- All sections
- Lesson count
- Completion percentage
- Locked/unlocked status if used

---

## Lesson

Main learning interface.

Include:

- Breadcrumb
- Lesson title
- Progress
- Content
- Code examples
- Interactive editor
- Exercises
- Navigation

---

## Exercise

Dedicated exercise mode.

Show:

- Problem
- Requirements
- Editor
- Tests
- Output
- Hints
- Solution

---

## Progress Dashboard

Show:

- Overall progress
- Section progress
- Exercise statistics
- Recently completed lessons
- Continue learning

---

## Search

Search across:

- Lessons
- Concepts
- Code examples
- Exercises

Display:

```text
Search TypeScript...

Results

Generics
  → Generic Functions
  → Generic Constraints
  → Generic Interfaces
```

---

## Bookmarks

Allow learners to bookmark lessons.

---

## Settings

Include:

- Theme
- Font size
- Editor settings
- Reset progress
- PWA information

---

# 15. Navigation

Support:

- Sidebar navigation
- Previous lesson
- Next lesson
- Breadcrumbs
- Table of contents inside long lessons
- Keyboard navigation

Keyboard shortcuts:

```text
← Previous lesson
→ Next lesson
Ctrl/Cmd + K → Search
Ctrl/Cmd + Enter → Run code
```

---

# 16. Course Metadata

Create structured metadata.

Example:

```ts
interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  section: string;
  order: number;
  estimatedMinutes: number;
  prerequisites?: string[];
  objectives: string[];
  content: string;
  exercises: Exercise[];
}
```

Create types for:

```ts
Course
Section
Lesson
Exercise
ExerciseTest
Progress
Bookmark
CodeExample
```

---

# 17. Search

Implement client-side search.

Search should understand:

```text
generic
generics
generic function
Generic Functions
```

and return relevant results.

Highlight matching text.

---

# 18. Content Quality

Do not generate shallow filler content.

Every lesson should answer:

1. What is this?
2. Why does it exist?
3. What problem does it solve?
4. How does it work?
5. How do I use it?
6. What mistakes should I avoid?
7. Where would I use this in real software?

Progressively increase difficulty.

Do not introduce advanced concepts before the learner has the necessary foundation.

---

# 19. Projects

At the end of major sections, add mini projects.

Examples:

## Project 1 — Type-safe Todo

Topics:

- interfaces
- unions
- functions
- arrays

## Project 2 — Typed API Client

Topics:

- generics
- interfaces
- async/await
- API responses

## Project 3 — Type-safe Event System

Topics:

- generics
- mapped types
- keyof
- indexed access

## Project 4 — State Machine

Topics:

- discriminated unions
- exhaustive checking

## Project 5 — Type-safe Form System

Topics:

- generics
- mapped types
- utility types

## Final Project — TypeScript Application

Build a small production-style application combining:

- interfaces
- generics
- utility types
- API types
- error handling
- validation
- state management
- reusable components

---

# 20. Learning Progression

Use this progression:

```text
JavaScript Basics
       ↓
TypeScript Basics
       ↓
Types
       ↓
Functions
       ↓
Objects
       ↓
Classes
       ↓
Generics
       ↓
Utility Types
       ↓
Advanced Types
       ↓
Type-level Programming
       ↓
Real-world TypeScript
       ↓
React + TypeScript
       ↓
Backend + TypeScript
       ↓
Architecture & Design Patterns
       ↓
Final Project
```

---

# 21. Testing

Add automated tests for:

- Components
- Course navigation
- Progress tracking
- Exercise validation
- Code execution
- Search
- PWA behavior where practical

Also add sample tests for the exercise engine.

---

# 22. Accessibility

Follow good accessibility practices.

Include:

- Semantic HTML
- Keyboard navigation
- Focus states
- ARIA labels where necessary
- Accessible editor controls
- Sufficient contrast
- Screen-reader-friendly navigation

---

# 23. Performance

The application should load quickly.

Use:

- Lazy-loaded lesson routes
- Code splitting
- Lazy loading Monaco where practical
- IndexedDB for local data
- Efficient search indexing
- PWA caching

Do not load the entire course and Monaco editor unnecessarily on the initial page.

---

# 24. Project Documentation

Create a `README.md` explaining:

- What the project is
- Architecture
- Tech stack
- How to install
- How to run
- How to build
- How to test
- How to add a lesson
- How to add an exercise
- How code execution works
- How PWA functionality works

Also create:

```text
CONTRIBUTING.md
ARCHITECTURE.md
COURSE_AUTHORING.md
```

---

# 25. Development Phases

Do not try to build everything in one giant implementation.

Work in phases.

## Phase 1 — Foundation

Build:

- Vite
- React
- TypeScript
- Tailwind
- Routing
- Layout
- Theme
- Basic PWA

Verify the application runs.

---

## Phase 2 — Course Engine

Build:

- Course metadata
- Sections
- Lessons
- Markdown/MDX rendering
- Navigation
- Table of contents

Add 5–10 sample lessons.

---

## Phase 3 — Interactive Editor

Build:

- Monaco
- TypeScript compilation
- Web Worker
- Output panel
- Error handling
- Run/reset/copy

Create several runnable examples.

---

## Phase 4 — Exercise Engine

Build:

- Exercise model
- Exercise UI
- Test execution
- Hints
- Solutions
- Completion state

Add at least 10 exercises.

---

## Phase 5 — Progress

Build:

- IndexedDB
- Progress store
- Lesson completion
- Exercise completion
- Dashboard
- Continue learning

---

## Phase 6 — Search & Bookmarks

Build:

- Search
- Search index
- Bookmarks
- Search UI

---

## Phase 7 — Complete Curriculum

Populate the full TypeScript curriculum.

Ensure every major topic has:

- Explanation
- Examples
- Runnable code
- Exercise
- Solution
- Real-world example

---

## Phase 8 — Polish

Improve:

- UX
- Responsive design
- Accessibility
- Performance
- PWA
- Error handling
- Testing

---

# 26. Important Engineering Rules

Follow these rules throughout the project:

1. Use strict TypeScript.

2. Avoid `any` unless there is a documented reason.

3. Prefer type-safe abstractions.

4. Do not duplicate components.

5. Keep course content separate from application logic.

6. Build reusable components.

7. Keep components reasonably small.

8. Use meaningful names.

9. Add tests for important logic.

10. Do not over-engineer.

11. Prefer simple solutions.

12. Do not add a backend unless there is a strong reason.

13. Learning progress should work entirely offline.

14. Code execution must happen in a Worker.

15. Never execute learner code directly on the main thread.

---

# 27. Initial Deliverable

Start by creating the complete project structure.

Before implementing the entire curriculum:

1. Create the application.
2. Configure TypeScript.
3. Configure PWA.
4. Configure routing.
5. Create the layout.
6. Create course data structures.
7. Create lesson rendering.
8. Create sidebar navigation.
9. Create the code editor architecture.
10. Create the exercise architecture.
11. Create progress persistence.
12. Create 5 representative lessons.
13. Create 5 representative exercises.
14. Verify everything works.
15. Then progressively populate the remaining curriculum.

Do not create hundreds of placeholder lessons.

The first version should be functional end-to-end with a smaller number of high-quality lessons.

---

# 28. Definition of Done

The project is considered successful when I can run:

```bash
npm install
npm run dev
```

and see a complete TypeScript learning application.

I should be able to:

1. Open the course.
2. Navigate through lessons.
3. Read explanations.
4. Run TypeScript examples.
5. See compiler/runtime errors.
6. Complete exercises.
7. Get exercise results.
8. View hints.
9. Reveal solutions.
10. Mark lessons complete.
11. Close the browser.
12. Reopen it.
13. See my progress preserved.
14. Search the course.
15. Bookmark lessons.
16. Install the site as a PWA.
17. Disconnect from the internet.
18. Continue learning offline.

---

# 29. Cursor Agent Behavior

You are working as the primary engineering agent.

Before coding:

1. Inspect the repository.
2. Determine whether a project already exists.
3. Reuse existing infrastructure where appropriate.
4. Do not overwrite existing work unnecessarily.
5. Create a clear implementation plan.

While coding:

- Work incrementally.
- Keep the application runnable.
- Run tests after significant changes.
- Fix TypeScript errors.
- Fix lint errors.
- Avoid leaving broken placeholders.
- Prefer working features over excessive abstractions.

When finished with each phase:

```text
PHASE COMPLETE

Implemented:
- ...

Files changed:
- ...

Tests:
- ...

Next phase:
- ...
```

Do not stop after creating the UI mockup.

Build the actual working application.

Start with **Phase 1 — Foundation**, then continue through the phases until the application has a functional end-to-end learning experience.