import type { Lesson } from "@/types/course";

export const realWorldLessons: Lesson[] = [
  {
    id: "result-type",
    slug: "result-type",
    title: "The Result Type",
    description: "Replace thrown exceptions with a typed success / failure union.",
    level: "advanced",
    sectionId: "real-world",
    order: 15,
    estimatedMinutes: 16,
    objectives: [
      "Model success and failure as data",
      "Write helper constructors",
      "Know when not to use Result",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## The pattern

\`\`\`ts
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };
\`\`\`

A function that can fail returns a \`Result\`. Callers must handle both sides.

## Why this exists

\`throw\` is invisible in the type system. \`Result\` makes failure part of the contract. That is valuable at API and domain boundaries.

## When not to use it

Do not wrap every function. Programming errors (bugs) can still throw. Use Result for expected failures: not found, validation, payment declined.

## Real-world example

Parsing JSON, talking to a payment API, or loading a user by id.
`,
      },
      {
        type: "playground",
        playground: {
          id: "parse-age",
          title: "Parse with Result",
          code: `type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function parseAge(raw: string): Result<number> {
  const value = Number(raw);
  if (Number.isNaN(value)) {
    return { success: false, error: "Not a number" };
  }
  return { success: true, data: value };
}

console.log(parseAge("37"));
console.log(parseAge("nope"));
`,
        },
      },
    ],
    exercises: [
      {
        id: "ok-err",
        type: "write-code",
        title: "Build ok and err helpers",
        prompt:
          "Write `ok<T>(data: T)` and `err(error: string)` that return the two Result variants. Then write `unwrapOr<T>(result, fallback: T): T`.",
        starterCode: `type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function ok(data) {
  return { success: true, data };
}

function err(error) {
  return { success: false, error };
}

function unwrapOr(result, fallback) {
  return fallback;
}
`,
        solution: `type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

function err(error: string): Result<never> {
  return { success: false, error };
}

function unwrapOr<T>(result: Result<T>, fallback: T): T {
  return result.success ? result.data : fallback;
}
`,
        hints: ["ok sets success: true.", "unwrapOr checks result.success."],
        tests: [
          {
            id: "ok",
            description: "unwraps success",
            expression: 'unwrapOr(ok("Ada"), "x") === "Ada"',
          },
          {
            id: "err",
            description: "uses fallback",
            expression: 'unwrapOr(err("no"), "Ada") === "Ada"',
          },
        ],
      },
    ],
    takeaways: [
      "Result makes expected failure visible.",
      "Do not replace every throw.",
      "Helpers keep construction consistent.",
    ],
  },
  {
    id: "typing-react-props",
    slug: "typing-react-props",
    title: "Typing React Props",
    description: "Type component props, children, and common React TypeScript mistakes.",
    level: "intermediate",
    sectionId: "react",
    order: 16,
    estimatedMinutes: 16,
    objectives: [
      "Type props with an interface",
      "Type event handlers",
      "Avoid React.FC unless you need its extras",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## Props are just objects

\`\`\`ts
interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

function Button({ label, disabled, onClick }: ButtonProps) {
  return label;
}
\`\`\`

There is no special React type you must use. An interface is enough.

## Events

\`\`\`ts
function onChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value);
}
\`\`\`

## Common mistakes

- Typing props as \`any\`.
- Using \`React.FC\` only to get \`children\`, then being surprised by other defaults.
- Annotating \`useState\` when the initial value already infers: \`useState(0)\` is \`number\`.

This playground is TypeScript, not a React runtime. Treat the function as a typed UI helper.
`,
      },
      {
        type: "playground",
        playground: {
          id: "button-props",
          title: "A typed button helper",
          code: `interface ButtonProps {
  label: string;
  disabled?: boolean;
}

function renderButton({ label, disabled = false }: ButtonProps): string {
  return disabled ? label + " (disabled)" : label;
}

console.log(renderButton({ label: "Save" }));
console.log(renderButton({ label: "Save", disabled: true }));
`,
        },
      },
    ],
    exercises: [
      {
        id: "card-props",
        type: "write-code",
        title: "Type a Card helper",
        prompt:
          "Write `renderCard(props: { title: string; body: string }): string` that returns `title + \": \" + body`.",
        starterCode: `function renderCard(props) {
  return "";
}
`,
        solution: `function renderCard(props: { title: string; body: string }): string {
  return props.title + ": " + props.body;
}
`,
        hints: ["Give props an object type.", "Concatenate title and body."],
        tests: [
          {
            id: "card",
            description: "formats the card",
            expression: 'renderCard({ title: "Ada", body: "Pioneer" }) === "Ada: Pioneer"',
          },
        ],
      },
    ],
    takeaways: [
      "Props are typed objects.",
      "Event types come from the element.",
      "Let useState infer when the initial value is enough.",
    ],
  },
  {
    id: "runtime-validation",
    slug: "runtime-validation",
    title: "Runtime Validation",
    description: "Types are erased. Validate unknown data from APIs before you trust it.",
    level: "intermediate",
    sectionId: "backend",
    order: 17,
    estimatedMinutes: 16,
    objectives: [
      "Explain type erasure",
      "Treat JSON as unknown",
      "See why libraries such as Zod exist",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## The important sentence

> TypeScript types disappear at runtime.

\`fetch\` returns \`unknown\` data dressed up as JSON. This compiles and can still explode later:

\`\`\`ts
const user = (await response.json()) as User;
user.email.toLowerCase();
\`\`\`

If the server omitted \`email\`, the assertion did not protect you.

## What to do

1. Type the intended shape.
2. Validate the actual value.
3. Only then treat it as \`User\`.

A validator (Zod, Valibot, ArkType, or a few manual checks) runs in JavaScript. That is the missing half of TypeScript at the network edge.

## Minimal manual check
`,
      },
      {
        type: "playground",
        playground: {
          id: "validate-user",
          title: "Validate unknown JSON",
          code: `type User = { id: string; name: string };

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.id === "string" && typeof record.name === "string";
}

function readUser(value: unknown): User {
  if (!isUser(value)) {
    throw new Error("Invalid user");
  }
  return value;
}

console.log(readUser({ id: "1", name: "Ada" }).name);
`,
        },
      },
      {
        type: "markdown",
        markdown: `## Common mistakes

- \`as User\` on every \`json()\` call.
- Validating only in development.
- Trusting query params and environment variables without parsing.
`,
      },
    ],
    exercises: [
      {
        id: "is-point",
        type: "write-code",
        title: "Write a type predicate",
        prompt:
          "Write `isPoint(value: unknown): boolean` that returns true only when value is an object with numeric `x` and `y`.",
        starterCode: `function isPoint(value: unknown): boolean {
  return false;
}
`,
        solution: `function isPoint(value: unknown): boolean {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.x === "number" && typeof record.y === "number";
}
`,
        hints: ["Reject null and non-objects.", "Check typeof x and y."],
        tests: [
          {
            id: "yes",
            description: "accepts a point",
            expression: "isPoint({ x: 1, y: 2 }) === true",
          },
          {
            id: "no",
            description: "rejects a string",
            expression: 'isPoint("no") === false',
          },
        ],
      },
    ],
    takeaways: [
      "Types do not run.",
      "External data is unknown until validated.",
      "Zod-style libraries exist because of type erasure.",
    ],
  },
  {
    id: "project-todo",
    slug: "project-todo",
    title: "Project: Type-safe Todo",
    description: "Build a small domain model with interfaces, unions, and typed functions.",
    level: "intermediate",
    sectionId: "projects",
    order: 18,
    estimatedMinutes: 20,
    objectives: [
      "Model a todo with a status union",
      "Write typed operations over an array",
      "Keep impossible states out of the model",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## The project

Build the types and functions for a todo list. This is the first mini-project: interfaces, unions, functions, and arrays.

## Suggested model

\`\`\`ts
type Status = "open" | "done";

interface Todo {
  id: string;
  title: string;
  status: Status;
}
\`\`\`

Do not use a \`completed: boolean\` plus a leftover \`status\` string. One field is enough.

## Operations

- \`createTodo(title)\` → a new open todo
- \`complete(todo)\` → the same todo marked done
- \`openTodos(list)\` → only open items
`,
      },
      {
        type: "playground",
        playground: {
          id: "todo-preview",
          title: "Starter domain",
          code: `type Status = "open" | "done";

interface Todo {
  id: string;
  title: string;
  status: Status;
}

function createTodo(title: string): Todo {
  return { id: "t1", title, status: "open" };
}

console.log(createTodo("Learn TypeScript"));
`,
        },
      },
    ],
    exercises: [
      {
        id: "todo-ops",
        type: "real-world",
        title: "Implement todo operations",
        prompt:
          "Implement `createTodo(title: string): Todo` (id can be any string), `complete(todo: Todo): Todo`, and `openTodos(list: Todo[]): Todo[]`.",
        starterCode: `type Status = "open" | "done";

interface Todo {
  id: string;
  title: string;
  status: Status;
}

function createTodo(title: string): Todo {
  return { id: "x", title, status: "open" };
}

function complete(todo: Todo): Todo {
  return todo;
}

function openTodos(list: Todo[]): Todo[] {
  return list;
}
`,
        solution: `type Status = "open" | "done";

interface Todo {
  id: string;
  title: string;
  status: Status;
}

function createTodo(title: string): Todo {
  return { id: "t1", title, status: "open" };
}

function complete(todo: Todo): Todo {
  return { ...todo, status: "done" };
}

function openTodos(list: Todo[]): Todo[] {
  return list.filter((todo) => todo.status === "open");
}
`,
        hints: [
          "complete should return a new object with status done.",
          "Filter the list by status === \"open\".",
        ],
        tests: [
          {
            id: "create",
            description: "creates an open todo",
            expression: 'createTodo("Read").status === "open" && createTodo("Read").title === "Read"',
          },
          {
            id: "complete",
            description: "marks a todo done",
            expression: 'complete({ id: "1", title: "A", status: "open" }).status === "done"',
          },
          {
            id: "filter",
            description: "filters open todos",
            expression:
              'openTodos([{ id: "1", title: "A", status: "open" }, { id: "2", title: "B", status: "done" }]).length === 1',
          },
        ],
      },
    ],
    takeaways: [
      "A small domain model is mostly types plus functions.",
      "Unions beat overlapping booleans.",
      "Keep operations typed at the boundary.",
    ],
  },
];
