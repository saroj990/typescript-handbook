import type { Lesson } from "@/types/course";

export const functionsClassesLessons: Lesson[] = [
  {
    id: "function-types",
    slug: "function-types",
    title: "Function Types",
    description:
      "Type parameters, return values, optional arguments, and callbacks.",
    level: "beginner",
    sectionId: "functions",
    order: 9,
    estimatedMinutes: 18,
    objectives: [
      "Annotate parameters and return types",
      "Type a callback",
      "Use optional and rest parameters safely",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## Why function types matter

Functions are the seams of a program. If a callback is typed, every caller and every implementation is checked.

\`\`\`ts
type Mapper = (value: number) => string;
\`\`\`

## Parameters and returns

Write types on the public surface:

\`\`\`ts
function loadUser(id: string): Promise<User> {
  return fetch("/users/" + id).then((r) => r.json());
}
\`\`\`

Inference can fill in the return type, but exported functions are easier to read with an explicit return.

## Optional, default, and rest

- \`limit?: number\` may be omitted
- \`limit = 10\` is optional and has a value
- \`...ids: string[]\` collects remaining arguments

## Real-world example

Event handlers, \`array.map\`, and Express-style middleware are all function types.
`,
      },
      {
        type: "playground",
        playground: {
          id: "function-types",
          title: "A typed mapper",
          code: `type Mapper = (value: number) => string;

const label: Mapper = (value) => "#" + value;

const ids = [1, 2, 3].map(label);
console.log(ids.join(", "));
`,
        },
      },
      {
        type: "markdown",
        markdown: `## Common mistakes

- Typing the callback parameter as \`any\`.
- Forgetting that optional parameters must come after required ones.
- Using \`Function\` as a type. It accepts any function and is almost as unsafe as \`any\`.
`,
      },
    ],
    exercises: [
      {
        id: "apply-fn",
        type: "write-code",
        title: "Apply a callback",
        prompt:
          "Write `apply(value: number, fn: (n: number) => number): number` that returns `fn(value)`.",
        starterCode: `function apply(value, fn) {
  return 0;
}
`,
        solution: `function apply(value: number, fn: (n: number) => number): number {
  return fn(value);
}
`,
        hints: ["The second parameter is a function type.", "Call fn with value."],
        tests: [
          {
            id: "double",
            description: "applies a doubling function",
            expression: "apply(4, (n) => n * 2) === 8",
          },
        ],
      },
    ],
    takeaways: [
      "Type the public surface of functions.",
      "Callback types keep map/filter/event code honest.",
      "Avoid the Function type.",
    ],
  },
  {
    id: "classes-and-access",
    slug: "classes-and-access",
    title: "Classes and Access Modifiers",
    description: "Constructors, methods, public/private/protected, and when a class is the wrong tool.",
    level: "intermediate",
    sectionId: "objects-classes",
    order: 10,
    estimatedMinutes: 16,
    objectives: [
      "Write a typed class",
      "Use access modifiers and parameter properties",
      "Prefer composition when inheritance gets awkward",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## A typed class

\`\`\`ts
class Account {
  constructor(
    public readonly id: string,
    private balance: number,
  ) {}

  deposit(amount: number) {
    this.balance += amount;
  }
}
\`\`\`

Parameter properties declare and assign fields in one place.

## Why modifiers exist

\`private\` and \`protected\` document the intended API. They are a compile-time check. The emitted JavaScript still has the fields; they are not a security boundary.

## Inheritance vs composition

Use \`extends\` when you have a true is-a relationship. For "an object that needs a logger," pass the logger in. That is composition, and it stays easier to test.

## Common mistakes

- Treating \`private\` as runtime encapsulation.
- Deep class hierarchies for data that should be interfaces.
`,
      },
      {
        type: "playground",
        playground: {
          id: "counter-class",
          title: "A small counter class",
          code: `class Counter {
  constructor(private value: number = 0) {}

  inc(): number {
    this.value += 1;
    return this.value;
  }
}

const counter = new Counter();
console.log(counter.inc());
console.log(counter.inc());
`,
        },
      },
    ],
    exercises: [
      {
        id: "bank-account",
        type: "write-code",
        title: "Create a Balance class",
        prompt:
          "Write a `Balance` class with a constructor `constructor(private amount: number)` and a method `add(n: number): number` that adds n and returns the new amount.",
        starterCode: `class Balance {
}
`,
        solution: `class Balance {
  constructor(private amount: number) {}

  add(n: number): number {
    this.amount += n;
    return this.amount;
  }
}
`,
        hints: ["Use a parameter property for amount.", "add should mutate and return."],
        tests: [
          {
            id: "add",
            description: "adds to the balance",
            expression: "new Balance(10).add(5) === 15",
          },
        ],
      },
    ],
    takeaways: [
      "Classes are typed like the rest of TypeScript.",
      "Access modifiers are compile-time only.",
      "Prefer composition over deep inheritance.",
    ],
  },
];
