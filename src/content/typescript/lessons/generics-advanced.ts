import type { Lesson } from "@/types/course";

export const genericsAdvancedLessons: Lesson[] = [
  {
    id: "why-generics",
    slug: "why-generics",
    title: "Why Generics?",
    description: "Reuse one implementation across many types without falling back to any.",
    level: "intermediate",
    sectionId: "generics",
    order: 11,
    estimatedMinutes: 16,
    objectives: [
      "Explain the problem generics solve",
      "Write a generic identity function",
      "See how inference fills in type arguments",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## The problem

You want a function that returns whatever it received.

\`\`\`ts
function identity(value: any): any {
  return value;
}
\`\`\`

That compiles, and it throws away every useful type. \`identity("ts")\` should stay a \`string\`.

## The solution

\`\`\`ts
function identity<T>(value: T): T {
  return value;
}
\`\`\`

\`T\` is a type parameter. Callers get their own type back. You write the function once.

## Why this exists

Arrays, promises, maps, React state, and API clients all wrap "some other type." Generics are how TypeScript talks about wrappers without hard-coding \`string\` or \`User\`.

## How inference helps

You rarely write \`identity<string>("ts")\`. TypeScript sees the argument and fills in \`T\`.
`,
      },
      {
        type: "playground",
        playground: {
          id: "identity",
          title: "Generic identity",
          code: `function identity<T>(value: T): T {
  return value;
}

const name = identity("TypeScript");
const count = identity(3);
console.log(name.toUpperCase(), count + 1);
`,
        },
      },
      {
        type: "markdown",
        markdown: `## Real-world example

\`Promise<User>\`, \`Array<Id>\`, and \`Record<string, boolean>\` are generic types you already use.

## Common mistakes

- Replacing \`T\` with \`any\` "to make it work."
- Adding type parameters that are only used once and never constrain anything.
`,
      },
    ],
    exercises: [
      {
        id: "wrap-generic",
        type: "write-code",
        title: "Write a generic wrap function",
        prompt:
          "Write `wrap<T>(value: T): { value: T }` that returns an object with a `value` property.",
        starterCode: `function wrap(value) {
  return { value };
}
`,
        solution: `function wrap<T>(value: T): { value: T } {
  return { value };
}
`,
        hints: ["Add a type parameter T.", "The return type should mention T."],
        tests: [
          {
            id: "string",
            description: "wraps a string",
            expression: 'wrap("ts").value === "ts"',
          },
          {
            id: "number",
            description: "wraps a number",
            expression: "wrap(9).value === 9",
          },
        ],
      },
    ],
    takeaways: [
      "Generics keep types while sharing implementation.",
      "identity<T> is the smallest useful example.",
      "Inference usually supplies T for you.",
    ],
  },
  {
    id: "generic-constraints",
    slug: "generic-constraints",
    title: "Generic Constraints",
    description: "Limit T with extends so you can use properties safely.",
    level: "intermediate",
    sectionId: "generics",
    order: 12,
    estimatedMinutes: 16,
    objectives: [
      "Write T extends SomeShape",
      "Use keyof with constraints",
      "Avoid over-constraining",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## The problem

This fails, because \`T\` might not have \`length\`:

\`\`\`ts
function longest<T>(a: T, b: T) {
  return a.length >= b.length ? a : b;
}
\`\`\`

## The constraint

\`\`\`ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
\`\`\`

Now \`T\` can be a string, an array, or any object with \`length\`.

## keyof

\`keyof T\` is the union of property names. Combined with constraints it unlocks typed property access:

\`\`\`ts
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
\`\`\`

## Common mistakes

- Constraining to a concrete class when an interface would do.
- Using constraints to re-implement what a specific type already said.
`,
      },
      {
        type: "playground",
        playground: {
          id: "pluck",
          title: "Typed pluck",
          code: `function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Ada" };
console.log(pluck(user, "name"));
`,
        },
      },
    ],
    exercises: [
      {
        id: "has-id",
        type: "write-code",
        title: "Read an id from any object that has one",
        prompt:
          "Write `getId<T extends { id: string }>(item: T): string` that returns `item.id`.",
        starterCode: `function getId(item) {
  return "";
}
`,
        solution: `function getId<T extends { id: string }>(item: T): string {
  return item.id;
}
`,
        hints: ["Constrain T to an object with id: string.", "Return item.id."],
        tests: [
          {
            id: "user",
            description: "reads id",
            expression: 'getId({ id: "u1", name: "Ada" }) === "u1"',
          },
        ],
      },
    ],
    takeaways: [
      "extends limits what T can be.",
      "keyof T models property names.",
      "Constraints should match the operations you perform.",
    ],
  },
  {
    id: "discriminated-unions",
    slug: "discriminated-unions",
    title: "Discriminated Unions",
    description: "Model state machines and API results with a shared tag field.",
    level: "advanced",
    sectionId: "advanced-types",
    order: 13,
    estimatedMinutes: 18,
    objectives: [
      "Design a union with a discriminant",
      "Switch exhaustively on the tag",
      "Replace boolean flags with explicit states",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## The pattern

Give every variant the same literal field:

\`\`\`ts
type State =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: string };
\`\`\`

\`status\` is the discriminant. After \`if (state.status === "success")\`, TypeScript knows \`data\` exists.

## Why this exists

\`{ data?: string; error?: string; loading: boolean }\` allows impossible states: loading and error at once, success without data. A discriminated union makes those unrepresentable.

## Exhaustiveness

In a \`switch\`, assign the leftover value to \`never\` to get a compile error when a case is missing.

## Real-world example

Network requests, payment states, and modal flows are state machines. Type them as unions, not as a pile of booleans.
`,
      },
      {
        type: "playground",
        playground: {
          id: "state-machine",
          title: "Render a request state",
          code: `type State =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: string };

function label(state: State): string {
  switch (state.status) {
    case "loading":
      return "Loading";
    case "success":
      return state.data;
    case "error":
      return state.error;
  }
}

console.log(label({ status: "success", data: "Ada" }));
`,
        },
      },
    ],
    exercises: [
      {
        id: "result-label",
        type: "write-code",
        title: "Label a Result",
        prompt:
          "Given `type Result<T> = { ok: true; value: T } | { ok: false; error: string }`, write `label(result: Result<string>): string` that returns the value or `Error: ` plus the error.",
        starterCode: `type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function label(result: Result<string>): string {
  return "";
}
`,
        solution: `type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function label(result: Result<string>): string {
  if (result.ok) return result.value;
  return "Error: " + result.error;
}
`,
        hints: ["Check result.ok.", "The false branch has error, not value."],
        tests: [
          {
            id: "ok",
            description: "success branch",
            expression: 'label({ ok: true, value: "Ada" }) === "Ada"',
          },
          {
            id: "err",
            description: "error branch",
            expression: 'label({ ok: false, error: "nope" }) === "Error: nope"',
          },
        ],
      },
    ],
    takeaways: [
      "A shared literal tag makes unions easy to narrow.",
      "Impossible states should be unrepresentable.",
      "Switching on the tag is the usual control flow.",
    ],
  },
  {
    id: "utility-types",
    slug: "utility-types",
    title: "Built-in Utility Types",
    description: "Partial, Required, Pick, Omit, Record, and how they are built.",
    level: "intermediate",
    sectionId: "utility-types",
    order: 14,
    estimatedMinutes: 18,
    objectives: [
      "Use Partial, Pick, and Omit on a model",
      "Explain why utility types exist",
      "Avoid reaching for them when a named type would be clearer",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## What they are

Utility types transform existing types.

| Utility | Meaning |
| --- | --- |
| \`Partial<T>\` | every property optional |
| \`Required<T>\` | every property required |
| \`Readonly<T>\` | every property readonly |
| \`Pick<T, K>\` | keep keys K |
| \`Omit<T, K>\` | drop keys K |
| \`Record<K, V>\` | object with keys K and values V |

## Why they exist

You already have a \`User\`. A patch endpoint needs \`Partial<User>\`. A public DTO might be \`Omit<User, "passwordHash">\`. Copying the type by hand drifts.

## How Partial works

\`\`\`ts
type Partial<T> = {
  [K in keyof T]?: T[K];
};
\`\`\`

That is a mapped type. The others are the same idea with different modifiers.

## Real-world example

Form drafts, query filters, and update payloads are almost always \`Partial\` or \`Pick\` of a domain type.

## Common mistakes

- \`Partial<User>\` for a create payload that still needs \`email\`. Use \`Pick\` or a dedicated type.
- Nesting utilities until nobody can read the type.
`,
      },
      {
        type: "playground",
        playground: {
          id: "partial-user",
          title: "Patch a user",
          code: `type User = {
  id: string;
  name: string;
  email: string;
};

function applyPatch(user: User, patch: Partial<User>): User {
  return { ...user, ...patch };
}

const user = { id: "1", name: "Ada", email: "ada@example.com" };
console.log(applyPatch(user, { name: "Ada Lovelace" }).name);
`,
        },
      },
    ],
    exercises: [
      {
        id: "pick-user",
        type: "write-code",
        title: "Return a public user",
        prompt:
          "Given User with id, name, and password, write `toPublic(user)` that returns only `{ id, name }`.",
        starterCode: `type User = {
  id: string;
  name: string;
  password: string;
};

function toPublic(user: User) {
  return { id: user.id, name: user.name };
}
`,
        solution: `type User = {
  id: string;
  name: string;
  password: string;
};

function toPublic(user: User): Pick<User, "id" | "name"> {
  return { id: user.id, name: user.name };
}
`,
        hints: ["Pick the id and name keys.", "Do not return password."],
        tests: [
          {
            id: "shape",
            description: "keeps id and name",
            expression:
              'JSON.stringify(toPublic({ id: "1", name: "Ada", password: "x" })) === JSON.stringify({ id: "1", name: "Ada" })',
          },
        ],
      },
    ],
    takeaways: [
      "Utility types derive new types from old ones.",
      "Partial and Pick cover most everyday transforms.",
      "A named type is better than an unreadable nest of utilities.",
    ],
  },
];
