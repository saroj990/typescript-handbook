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
    ],
    takeaways: [
      "Narrowing makes unions usable.",
      "typeof is the first tool for primitives.",
      "Prefer checks over assertions.",
    ],
  },
];
