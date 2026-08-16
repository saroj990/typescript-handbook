import type { Lesson } from "@/types/course";

export const fundamentalsLessons: Lesson[] = [
  {
    id: "primitive-types",
    slug: "primitive-types",
    title: "Primitive Types",
    description: "string, number, boolean, bigint, symbol, and how they differ from wrappers.",
    level: "beginner",
    sectionId: "fundamentals",
    order: 4,
    estimatedMinutes: 16,
    objectives: [
      "Name the primitive types",
      "Write correct annotations for everyday values",
      "Avoid Number / String wrapper types",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## What you will use every day

TypeScript's everyday primitives match JavaScript's:

| Type | Example |
| --- | --- |
| \`string\` | \`"hello"\` |
| \`number\` | \`42\`, \`3.14\` |
| \`boolean\` | \`true\` |
| \`bigint\` | \`100n\` |
| \`symbol\` | \`Symbol("id")\` |

There is one number type for integers and floats. \`int\` does not exist.

## Why this exists

JavaScript already has these values. TypeScript names them so the compiler can reject \`const age: number = "32"\`.

## Real-world example

User input from a form is always a string until you parse it. Types make that conversion visible:

\`\`\`ts
function parseAge(raw: string): number {
  return Number(raw);
}
\`\`\`
`,
      },
      {
        type: "playground",
        playground: {
          id: "primitives",
          title: "Primitives",
          code: `const name: string = "Ada";
const year: number = 1815;
const active: boolean = true;

console.log(name, year, active);
`,
        },
      },
      {
        type: "markdown",
        markdown: `## Common mistakes

- Using \`String\`, \`Number\`, or \`Boolean\` as types. Prefer the lowercase primitives.
- Assuming \`number\` cannot be \`NaN\`. It can. Types do not exclude invalid numbers.
`,
      },
    ],
    exercises: [
      {
        id: "annotate-user",
        type: "write-code",
        title: "Annotate a user record",
        prompt:
          "Create a function `describeUser` that accepts `name` (string), `age` (number), and `admin` (boolean), and returns a string: `Ada (37) admin=true`.",
        starterCode: `function describeUser(name, age, admin) {
  return "";
}
`,
        solution: `function describeUser(name: string, age: number, admin: boolean): string {
  return name + " (" + age + ") admin=" + admin;
}
`,
        hints: [
          "Add a type to each parameter.",
          "Concatenate the values in the required format.",
        ],
        tests: [
          {
            id: "ada",
            description: 'describeUser("Ada", 37, true)',
            expression: 'describeUser("Ada", 37, true) === "Ada (37) admin=true"',
          },
          {
            id: "linus",
            description: 'describeUser("Linus", 21, false)',
            expression: 'describeUser("Linus", 21, false) === "Linus (21) admin=false"',
          },
        ],
      },
      {
        id: "parse-age",
        type: "write-code",
        title: "Parse a string into a number",
        prompt:
          "Write `parseAge(raw: string): number` that converts the string with `Number(raw)`. `parseAge(\"37\")` should be `37`.",
        starterCode: `function parseAge(raw) {
  return 0;
}
`,
        solution: `function parseAge(raw: string): number {
  return Number(raw);
}
`,
        hints: ["The parameter is a string from a form.", "Number(raw) converts it."],
        tests: [
          { id: "ada", description: 'parseAge("37") === 37', expression: 'parseAge("37") === 37' },
          { id: "zero", description: 'parseAge("0") === 0', expression: 'parseAge("0") === 0' },
        ],
      },
      {
        id: "wrapper-types",
        type: "multiple-choice",
        title: "Which type should you write?",
        prompt: "You want a variable to hold the text `\"Ada\"`. Which annotation is the everyday TypeScript choice?",
        solution: "string — the lowercase primitive, not the String wrapper.",
        hints: ["Avoid Number, String, and Boolean wrappers.", "Everyday types match JavaScript primitives."],
        choices: [
          { id: "a", label: "String", correct: false },
          { id: "b", label: "string", correct: true },
          { id: "c", label: "text", correct: false },
          { id: "d", label: "Object", correct: false },
        ],
      },
    ],
    takeaways: [
      "Use lowercase primitive types.",
      "number covers integers and floats.",
      "Types do not remove NaN or empty strings.",
    ],
  },
  {
    id: "arrays-and-tuples",
    slug: "arrays-and-tuples",
    title: "Arrays and Tuples",
    description: "Type lists of values and fixed-length pairs such as [string, number].",
    level: "beginner",
    sectionId: "fundamentals",
    order: 5,
    estimatedMinutes: 14,
    objectives: [
      "Write array types with T[] and Array<T>",
      "Use tuples for fixed positions",
      "Avoid mixing tuple and array when the length matters",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## Arrays

An array is a list of one element type:

\`\`\`ts
const names: string[] = ["Ada", "Linus"];
const scores: Array<number> = [10, 20];
\`\`\`

Both spellings mean the same thing. \`T[]\` is more common.

## Tuples

A tuple is an array whose **positions** have meaning:

\`\`\`ts
type Point = [number, number];
const origin: Point = [0, 0];
\`\`\`

\`[string, number]\` is not the same as \`(string | number)[]\`. The first says "name then age". The second says "any mix of strings and numbers".

## Real-world example

\`Object.entries\` is close to \`[string, T][]\`. CSV rows, coordinates, and \`useState\`-style pairs are tuples.
`,
      },
      {
        type: "playground",
        playground: {
          id: "arrays-tuples",
          title: "Names and a point",
          code: `const names: string[] = ["Ada", "Grace"];
const point: [number, number] = [3, 4];

console.log(names.join(", "));
console.log("distance hint", point[0] * point[0] + point[1] * point[1]);
`,
        },
      },
      {
        type: "markdown",
        markdown: `## Common mistakes

- Typing a pair as \`number[]\` and then forgetting which index is x.
- Using tuples for long records. Prefer an object with named fields.
`,
      },
    ],
    exercises: [
      {
        id: "first-last",
        type: "write-code",
        title: "Return the first and last name",
        prompt:
          "Write `splitName(full: string): [string, string]` that splits on the first space. `splitName(\"Ada Lovelace\")` should return `[\"Ada\", \"Lovelace\"]`.",
        starterCode: `function splitName(full: string) {
  return ["", ""];
}
`,
        solution: `function splitName(full: string): [string, string] {
  const index = full.indexOf(" ");
  return [full.slice(0, index), full.slice(index + 1)];
}
`,
        hints: [
          "Find the first space with indexOf.",
          "Return a two-element array.",
        ],
        tests: [
          {
            id: "ada",
            description: "Ada Lovelace",
            expression:
              'JSON.stringify(splitName("Ada Lovelace")) === JSON.stringify(["Ada", "Lovelace"])',
          },
        ],
      },
      {
        id: "sum-scores",
        type: "write-code",
        title: "Sum a number array",
        prompt: "Write `sumScores(scores: number[]): number` that returns the total of every score.",
        starterCode: `function sumScores(scores: number[]): number {
  return 0;
}
`,
        solution: `function sumScores(scores: number[]): number {
  return scores.reduce((total, score) => total + score, 0);
}
`,
        hints: ["Loop or use reduce.", "Start from 0 so an empty list is 0."],
        tests: [
          { id: "basic", description: "sumScores([10, 20, 5]) === 35", expression: "sumScores([10, 20, 5]) === 35" },
          { id: "empty", description: "sumScores([]) === 0", expression: "sumScores([]) === 0" },
        ],
      },
      {
        id: "tuple-vs-array",
        type: "multiple-choice",
        title: "Tuple or array?",
        prompt: "You need a pair where index 0 is always x and index 1 is always y. Which type is the better fit?",
        solution: "[number, number] — a tuple fixes length and position.",
        hints: ["Arrays are lists of one element type.", "Tuples give positions meaning."],
        choices: [
          { id: "a", label: "number[]", correct: false },
          { id: "b", label: "[number, number]", correct: true },
          { id: "c", label: "(string | number)[]", correct: false },
          { id: "d", label: "Array<unknown>", correct: false },
        ],
      },
    ],
    takeaways: [
      "string[] is a list of strings.",
      "Tuples fix length and position.",
      "Prefer objects when fields have names.",
    ],
  },
  {
    id: "objects-and-interfaces",
    slug: "objects-and-interfaces",
    title: "Objects, Type Aliases, and Interfaces",
    description: "Model object shapes with type aliases and interfaces.",
    level: "beginner",
    sectionId: "fundamentals",
    order: 6,
    estimatedMinutes: 16,
    objectives: [
      "Describe an object with a type alias or interface",
      "Mark optional and readonly properties",
      "Pass typed objects into functions",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## Object types

Most TypeScript programs are about object shapes.

\`\`\`ts
type User = {
  id: number;
  name: string;
  email?: string;
  readonly createdAt: string;
};
\`\`\`

\`interface\` can say the same thing:

\`\`\`ts
interface User {
  id: number;
  name: string;
}
\`\`\`

For object shapes, either works. Later you will learn the differences (unions, primitives, declaration merging).

## Why this exists

Without a named shape, every function repeats the same fields. A named type is a contract: "a User has an id and a name."

## Real-world example

API responses, database rows, React props, and form values are all object types.
`,
      },
      {
        type: "playground",
        playground: {
          id: "user-object",
          title: "A typed user",
          code: `type User = {
  id: number;
  name: string;
  email?: string;
};

function label(user: User): string {
  return user.name + " #" + user.id;
}

console.log(label({ id: 1, name: "Ada" }));
`,
        },
      },
      {
        type: "markdown",
        markdown: `## Common mistakes

- Optional \`email?: string\` is \`string | undefined\`, not "string or missing at runtime from JSON" unless you validate.
- Adding extra required fields and then wondering why object literals fail (excess property checks).
`,
      },
    ],
    exercises: [
      {
        id: "full-name",
        type: "write-code",
        title: "Format a person",
        prompt:
          "Define a `Person` type with `first` and `last` strings. Write `fullName(person)` that returns `first + \" \" + last`.",
        starterCode: `// define Person and fullName

`,
        solution: `type Person = {
  first: string;
  last: string;
};

function fullName(person: Person): string {
  return person.first + " " + person.last;
}
`,
        hints: ["Create a type with two string fields.", "Read person.first and person.last."],
        tests: [
          {
            id: "ada",
            description: "Ada Lovelace",
            expression: 'fullName({ first: "Ada", last: "Lovelace" }) === "Ada Lovelace"',
          },
        ],
      },
      {
        id: "optional-email",
        type: "write-code",
        title: "Handle an optional email",
        prompt:
          "Write `contactLine(user: { name: string; email?: string }): string`. If email exists, return `name <email>`. Otherwise return just the name.",
        starterCode: `function contactLine(user) {
  return "";
}
`,
        solution: `function contactLine(user: { name: string; email?: string }): string {
  if (user.email) return user.name + " <" + user.email + ">";
  return user.name;
}
`,
        hints: ["email is optional, so check it first.", "The format is name <email>."],
        tests: [
          {
            id: "with-email",
            description: "includes email when present",
            expression:
              'contactLine({ name: "Ada", email: "ada@example.com" }) === "Ada <ada@example.com>"',
          },
          {
            id: "no-email",
            description: "falls back to the name",
            expression: 'contactLine({ name: "Ada" }) === "Ada"',
          },
        ],
      },
      {
        id: "interface-or-type",
        type: "multiple-choice",
        title: "What is an object type for?",
        prompt: "Why do we name a shape with `type User` or `interface User` instead of repeating fields?",
        solution: "It is a reusable contract: every function can depend on the same shape.",
        hints: ["Think about shared API responses and props.", "A name is a contract."],
        choices: [
          { id: "a", label: "It makes the fields exist at runtime after compile", correct: false },
          { id: "b", label: "It is a reusable contract for the same object shape", correct: true },
          { id: "c", label: "It is required before you can use an object literal", correct: false },
          { id: "d", label: "It encrypts the property names", correct: false },
        ],
      },
    ],
    takeaways: [
      "Name object shapes with type or interface.",
      "Optional properties are string | undefined.",
      "Object types are the backbone of real apps.",
    ],
  },
  {
    id: "union-types",
    slug: "union-types",
    title: "Union Types",
    description: "Model values that can be one of several types, such as string | number.",
    level: "beginner",
    sectionId: "fundamentals",
    order: 7,
    estimatedMinutes: 16,
    objectives: [
      "Write a union type",
      "Explain why unions exist",
      "Handle each member before using it",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## What is a union?

A union means "one of these":

\`\`\`ts
type Id = string | number;
\`\`\`

An \`Id\` is a string **or** a number, not both at once.

## Why does this exist?

Real data is messy. IDs arrive as numbers from one API and strings from another. Status can be \`"loading" | "success" | "error"\`. Optional values are \`T | undefined\`.

Without unions you would overuse \`any\` or invent fake wrapper objects.

## How it works

TypeScript will not let you treat \`Id\` as a string until you narrow it. That is the point: you must handle both cases.
`,
      },
      {
        type: "playground",
        playground: {
          id: "union-id",
          title: "Normalize an ID",
          code: `type Id = string | number;

function asKey(id: Id): string {
  return "id:" + id;
}

console.log(asKey(42));
console.log(asKey("42"));
`,
        },
      },
      {
        type: "markdown",
        markdown: `## Real-world example

\`\`\`ts
type Status = "idle" | "loading" | "success" | "error";
\`\`\`

This is a union of string literals. It is one of the most useful patterns in UI code.

## Common mistakes

- Using unions as a dumping ground: \`string | number | boolean | object\`.
- Forgetting to narrow before calling string-only methods such as \`.toUpperCase()\`.
`,
      },
    ],
    exercises: [
      {
        id: "widen-id",
        type: "write-code",
        title: "Accept string or number IDs",
        prompt:
          "Write `toIdString(id: string | number): string` that always returns a string. Numbers should be converted with String(id).",
        starterCode: `function toIdString(id) {
  return id;
}
`,
        solution: `function toIdString(id: string | number): string {
  return String(id);
}
`,
        hints: ["Annotate the parameter as a union.", "String(id) works for both members."],
        tests: [
          {
            id: "num",
            description: "number input",
            expression: 'toIdString(7) === "7"',
          },
          {
            id: "str",
            description: "string input",
            expression: 'toIdString("7") === "7"',
          },
        ],
      },
      {
        id: "status-label",
        type: "write-code",
        title: "Label a status union",
        prompt:
          "Write `statusLabel(status: \"idle\" | \"loading\" | \"error\"): string` that returns `Idle`, `Loading…`, or `Failed`.",
        starterCode: `function statusLabel(status) {
  return "";
}
`,
        solution: `function statusLabel(status: "idle" | "loading" | "error"): string {
  if (status === "idle") return "Idle";
  if (status === "loading") return "Loading…";
  return "Failed";
}
`,
        hints: ["Compare against each literal.", "A small if/else or switch is enough."],
        tests: [
          { id: "idle", description: "idle", expression: 'statusLabel("idle") === "Idle"' },
          {
            id: "loading",
            description: "loading",
            expression: 'statusLabel("loading") === "Loading…"',
          },
          { id: "error", description: "error", expression: 'statusLabel("error") === "Failed"' },
        ],
      },
      {
        id: "union-meaning",
        type: "multiple-choice",
        title: "What does a union mean?",
        prompt: "What does `type Id = string | number` allow?",
        solution: "A value that is a string or a number, not both at once.",
        hints: ["A union is one of the members.", "It is not a pair of both types."],
        choices: [
          { id: "a", label: "A value that is a string and a number at the same time", correct: false },
          { id: "b", label: "A value that is a string or a number, not both at once", correct: true },
          { id: "c", label: "An array of strings and numbers", correct: false },
          { id: "d", label: "A type that TypeScript will treat as any", correct: false },
        ],
      },
    ],
    takeaways: [
      "A union is one type or another.",
      "Literal unions are excellent for statuses.",
      "You must narrow before using member-specific APIs.",
    ],
  },
  {
    id: "type-narrowing",
    slug: "type-narrowing",
    title: "Type Narrowing",
    description: "Use typeof, equality, and control flow to turn unions into specific types.",
    level: "beginner",
    sectionId: "fundamentals",
    order: 8,
    estimatedMinutes: 18,
    objectives: [
      "Narrow with typeof and equality checks",
      "Understand control-flow analysis",
      "Avoid unsafe assertions when narrowing works",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## What is narrowing?

Narrowing is how a union becomes a single type inside an \`if\`.

\`\`\`ts
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(0));
  }
}
\`\`\`

Inside the first branch, \`id\` is \`string\`. Inside the else, it is \`number\`.

## Why this exists

Unions would be unusable if every method of every member were allowed everywhere. Narrowing is the safe way to say "I have checked."

## Common narrowing tools

- \`typeof\` for primitives
- \`===\` / \`in\` for objects and literals
- \`instanceof\` for classes
- Truthiness for \`T | null | undefined\`
- Custom type predicates (later)

## Common mistakes

- Using \`as string\` instead of checking.
- Forgetting that \`typeof null === "object"\` in JavaScript.
`,
      },
      {
        type: "playground",
        playground: {
          id: "narrowing",
          title: "Narrow a union",
          code: `function padLeft(value: string | number): string {
  if (typeof value === "number") {
    return " ".repeat(value);
  }
  return value;
}

console.log(JSON.stringify(padLeft(3) + "TS"));
console.log(padLeft("-->"));
`,
        },
      },
    ],
    exercises: [
      {
        id: "narrow-format",
        type: "write-code",
        title: "Format a string or number",
        prompt:
          "Write `format(value: string | number): string`. If it is a number, return `n=` plus the number. If it is a string, return it in uppercase.",
        starterCode: `function format(value: string | number): string {
  return "";
}
`,
        solution: `function format(value: string | number): string {
  if (typeof value === "number") {
    return "n=" + value;
  }
  return value.toUpperCase();
}
`,
        hints: ["Use typeof value === \"number\".", "Strings have toUpperCase()."],
        tests: [
          {
            id: "num",
            description: "number branch",
            expression: 'format(3) === "n=3"',
          },
          {
            id: "str",
            description: "string branch",
            expression: 'format("ts") === "TS"',
          },
        ],
      },
      {
        id: "value-length",
        type: "write-code",
        title: "Length of a string or array",
        prompt:
          "Write `valueLength(value: string | string[]): number`. Return `value.length` after narrowing if you want, or just read `.length` which both have.",
        starterCode: `function valueLength(value: string | string[]): number {
  return 0;
}
`,
        solution: `function valueLength(value: string | string[]): number {
  return value.length;
}
`,
        hints: ["Both strings and arrays have length.", "You can return value.length directly."],
        tests: [
          { id: "str", description: 'valueLength("Ada") === 3', expression: 'valueLength("Ada") === 3' },
          {
            id: "arr",
            description: 'valueLength(["a", "b"]) === 2',
            expression: 'valueLength(["a", "b"]) === 2',
          },
        ],
      },
      {
        id: "narrow-fix",
        type: "fix-bug",
        title: "Fix the missing narrow",
        prompt:
          "`printId` should return the id in uppercase when it is a string, or `n=` plus the number otherwise. Use `typeof` instead of assuming it is always a string.",
        starterCode: `function printId(id: string | number): string {
  return id.toUpperCase();
}
`,
        solution: `function printId(id: string | number): string {
  if (typeof id === "string") return id.toUpperCase();
  return "n=" + id;
}
`,
        hints: ["toUpperCase exists only on strings.", "Use typeof id === \"string\"."],
        tests: [
          { id: "str", description: "string branch", expression: 'printId("ada") === "ADA"' },
          { id: "num", description: "number branch", expression: 'printId(7) === "n=7"' },
        ],
      },
    ],
    takeaways: [
      "Narrowing makes unions usable.",
      "typeof is the first tool for primitives.",
      "Prefer checks over assertions.",
    ],
  },
];
