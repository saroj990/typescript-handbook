import type { Lesson } from "@/types/course";

export const gettingStartedLessons: Lesson[] = [
  {
    id: "what-is-typescript",
    slug: "what-is-typescript",
    title: "What is TypeScript?",
    description:
      "Understand what TypeScript is, why it exists, and how it relates to JavaScript.",
    level: "beginner",
    sectionId: "getting-started",
    order: 1,
    estimatedMinutes: 12,
    objectives: [
      "Explain TypeScript in one sentence",
      "Describe how TypeScript relates to JavaScript",
      "Recognize what happens at compile time vs runtime",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## Why does this exist?

JavaScript is flexible. That flexibility is useful, and it is also how many production bugs are born: a function expected a number and received \`undefined\`, a property was renamed in one file but not another, an API response shape changed.

TypeScript exists to catch those mistakes **before the code runs**.

## What is TypeScript?

TypeScript is JavaScript plus a type system. You write TypeScript, the compiler checks it, and the output is ordinary JavaScript.

> TypeScript types disappear at runtime. The browser and Node.js execute JavaScript, not TypeScript types.

That single fact explains a lot of later topics: why you still validate API data, why \`interface\` does not exist in the compiled file, and why TypeScript is a development tool rather than a new runtime.

## How it works

1. You write \`.ts\` or \`.tsx\` files.
2. The TypeScript compiler type-checks the program.
3. It emits JavaScript (and optionally declaration files).
4. Node, the browser, or a bundler runs that JavaScript.

## A first example
`,
      },
      {
        type: "playground",
        playground: {
          id: "first-ts",
          title: "A typed greeting",
          code: `function greet(name: string): string {
  return "Hello, " + name;
}

console.log(greet("Saroj"));
// Try changing the argument to 42 and run again.
`,
        },
      },
      {
        type: "markdown",
        markdown: `## Real-world use

Teams adopt TypeScript so editors can autocomplete safely, refactors do not silently break callers, and public functions document their contract in code instead of comments.

## Common mistakes

- Thinking TypeScript makes JavaScript "safe at runtime." It does not.
- Treating types as optional comments. If you use \`any\` everywhere, you opted out.
- Expecting \`interface User\` to exist after compilation. It will not.
`,
      },
    ],
    exercises: [
      {
        id: "ts-definition",
        type: "multiple-choice",
        title: "What does TypeScript compile to?",
        prompt: "When you compile a TypeScript file, what actually runs in the browser or Node.js?",
        solution: "Ordinary JavaScript. Types are erased.",
        hints: [
          "TypeScript is a compiler and a type checker, not a new VM.",
          "Think about type erasure.",
        ],
        choices: [
          { id: "a", label: "A TypeScript bytecode format", correct: false },
          { id: "b", label: "Ordinary JavaScript", correct: true },
          { id: "c", label: "WebAssembly with type metadata", correct: false },
          { id: "d", label: "The original .ts file", correct: false },
        ],
      },
      {
        id: "write-greet",
        type: "write-code",
        title: "Write a typed greeting",
        prompt:
          "Write `greet(name: string): string` that returns `Hello, ` plus the name. `greet(\"Ada\")` should be `Hello, Ada`.",
        starterCode: `function greet(name) {
  return "";
}
`,
        solution: `function greet(name: string): string {
  return "Hello, " + name;
}
`,
        hints: ["Add a string parameter type.", "Return Hello, plus the name."],
        tests: [
          {
            id: "ada",
            description: 'greet("Ada") === "Hello, Ada"',
            expression: 'greet("Ada") === "Hello, Ada"',
          },
          {
            id: "ts",
            description: 'greet("TypeScript") === "Hello, TypeScript"',
            expression: 'greet("TypeScript") === "Hello, TypeScript"',
          },
        ],
      },
      {
        id: "types-erased",
        type: "multiple-choice",
        title: "What happens to types at runtime?",
        prompt:
          "After TypeScript compiles your code, what happens to annotations like `: string`?",
        solution: "They are erased. The running program is JavaScript.",
        hints: ["Types are a compile-time tool.", "Node and the browser run JavaScript."],
        choices: [
          { id: "a", label: "They stay on values so you can read them with typeof", correct: false },
          { id: "b", label: "They are erased. The running program is JavaScript", correct: true },
          { id: "c", label: "They become runtime checks that throw on mismatch", correct: false },
          { id: "d", label: "The browser loads them from a hidden .d.ts file", correct: false },
        ],
      },
    ],
    takeaways: [
      "TypeScript is JavaScript with a static type system.",
      "The compiler checks types, then emits JavaScript.",
      "Types are erased at runtime.",
    ],
  },
  {
    id: "javascript-vs-typescript",
    slug: "javascript-vs-typescript",
    title: "JavaScript vs TypeScript",
    description: "See the same program in JavaScript and TypeScript, and learn what types add.",
    level: "beginner",
    sectionId: "getting-started",
    order: 2,
    estimatedMinutes: 14,
    prerequisites: ["what-is-typescript"],
    objectives: [
      "Compare an untyped and a typed function",
      "Spot a class of bugs types prevent",
      "Decide when a type annotation is worth writing",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## The same idea, two languages

JavaScript:

\`\`\`js
function add(a, b) {
  return a + b;
}

add(2, "3"); // "23" — legal, often accidental
\`\`\`

TypeScript can reject that call if you say both parameters are numbers.

## Why the difference matters

\`+\` in JavaScript concatenates strings and adds numbers. Without types, \`add(2, "3")\` is a silent logic bug. With types, it is a compile error.

## When TypeScript helps most

- Function boundaries (parameters and return values)
- Object shapes shared across files
- Refactors: rename a property and watch every caller light up
- JSON from APIs, once you model the response
`,
      },
      {
        type: "playground",
        playground: {
          id: "js-vs-ts-add",
          title: "Typed add",
          code: `function add(a: number, b: number): number {
  return a + b;
}

console.log(add(2, 3));
`,
        },
      },
      {
        type: "markdown",
        markdown: `## Common mistakes

- Annotating every local variable. Inference already covers \`const count = 0\`.
- Using TypeScript only as "JavaScript with extra syntax" and ignoring errors.
`,
      },
    ],
    exercises: [
      {
        id: "fix-add",
        type: "fix-bug",
        title: "Fix the untyped add function",
        prompt:
          "This function should only add numbers. Add parameter and return types so it is a number-only function. Do not use any.",
        starterCode: `function add(a, b) {
  return a + b;
}

console.log(add(10, 5));
`,
        solution: `function add(a: number, b: number): number {
  return a + b;
}

console.log(add(10, 5));
`,
        hints: [
          "Both parameters should be number.",
          "The return type can be written after the parameter list.",
        ],
        tests: [
          { id: "sum", description: "add(2, 3) === 5", expression: "add(2, 3) === 5" },
          { id: "sum2", description: "add(10, 5) === 15", expression: "add(10, 5) === 15" },
        ],
      },
      {
        id: "typed-multiply",
        type: "write-code",
        title: "Write a number-only multiply",
        prompt: "Write `multiply(a: number, b: number): number` that returns the product.",
        starterCode: `function multiply(a, b) {
  return 0;
}
`,
        solution: `function multiply(a: number, b: number): number {
  return a * b;
}
`,
        hints: ["Both parameters should be number.", "Return a * b."],
        tests: [
          { id: "basic", description: "multiply(3, 4) === 12", expression: "multiply(3, 4) === 12" },
          { id: "zero", description: "multiply(7, 0) === 0", expression: "multiply(7, 0) === 0" },
        ],
      },
      {
        id: "js-coercion",
        type: "predict-output",
        title: "Predict the untyped result",
        prompt:
          "In JavaScript, `+` concatenates if either side is a string. What does this program print?",
        starterCode: `function add(a, b) {
  return a + b;
}

console.log(add(2, "3"));
`,
        expectedOutput: "23",
        solution: '23 — JavaScript coerces 2 to "2" and concatenates.',
        hints: [
          "One argument is a string, so + does not add numbers.",
          "The printed value is the string 23, not the number 5.",
        ],
      },
    ],
    takeaways: [
      "JavaScript allows implicit coercions that TypeScript can reject.",
      "Types are most valuable at boundaries.",
      "You do not need to annotate everything inference already knows.",
    ],
  },
  {
    id: "type-inference",
    slug: "type-inference",
    title: "Type Inference",
    description: "Let the compiler figure out types, and learn when to write them yourself.",
    level: "beginner",
    sectionId: "getting-started",
    order: 3,
    estimatedMinutes: 12,
    prerequisites: ["javascript-vs-typescript"],
    objectives: [
      "Trust inference for initialized variables",
      "Write annotations on function boundaries",
      "Avoid redundant annotations",
    ],
    blocks: [
      {
        type: "markdown",
        markdown: `## What is inference?

If TypeScript can see the value, it can usually see the type.

\`\`\`ts
const name = "Saroj"; // inferred as string
const score = 10;     // inferred as number
\`\`\`

Writing \`const name: string = "Saroj"\` is legal and usually noise.

## Why inference exists

Annotations have a cost. They make code longer and can go stale. Inference keeps everyday code close to JavaScript while still checking it.

## Where you should still annotate

- Exported functions
- Public class methods
- Empty arrays you will fill later: \`const ids: number[] = []\`
- Callback parameters when context is not enough

## How it works

The compiler starts from literals and return statements and flows types outward. Hover a variable in the editor: that tooltip is the inferred type.
`,
      },
      {
        type: "playground",
        playground: {
          id: "inference-demo",
          title: "Inference in action",
          code: `const title = "TypeScript Handbook";
const pages = 24;
const published = true;

function summarize() {
  return title + " has " + pages + " lessons";
}

console.log(summarize());
console.log(typeof pages, published);
`,
        },
      },
      {
        type: "markdown",
        markdown: `## Common mistakes

- Annotating every \`const\`.
- Leaving \`let value;\` uninitialized, which becomes \`any\` unless you annotate.
- Using \`any\` to "fix" an inference you do not understand.
`,
      },
    ],
    exercises: [
      {
        id: "inference-choice",
        type: "multiple-choice",
        title: "What is the inferred type?",
        prompt: "Given `const ids = [1, 2, 3]`, what does TypeScript infer?",
        solution: "number[]",
        hints: ["Look at the element literals.", "Arrays are inferred from their contents."],
        choices: [
          { id: "a", label: "any[]", correct: false },
          { id: "b", label: "number[]", correct: true },
          { id: "c", label: "tuple [1, 2, 3]", correct: false },
          { id: "d", label: "unknown[]", correct: false },
        ],
      },
      {
        id: "label-score",
        type: "write-code",
        title: "Annotate the function boundary",
        prompt:
          "Write `labelScore(score: number): string` that returns `Score: ` plus the number. Let local values stay inferred.",
        starterCode: `function labelScore(score) {
  return "";
}
`,
        solution: `function labelScore(score: number): string {
  return "Score: " + score;
}
`,
        hints: ["Annotate the parameter and return type.", "Concatenate Score: with the number."],
        tests: [
          {
            id: "ten",
            description: 'labelScore(10) === "Score: 10"',
            expression: 'labelScore(10) === "Score: 10"',
          },
          {
            id: "zero",
            description: 'labelScore(0) === "Score: 0"',
            expression: 'labelScore(0) === "Score: 0"',
          },
        ],
      },
      {
        id: "uninitialized-let",
        type: "multiple-choice",
        title: "What is an uninitialized let?",
        prompt: "What does TypeScript infer for `let value;` with no annotation and no initializer?",
        solution: "any, unless you annotate it.",
        hints: [
          "There is no value to infer from.",
          "The lesson warns that this becomes any.",
        ],
        choices: [
          { id: "a", label: "undefined", correct: false },
          { id: "b", label: "any, unless you annotate it", correct: true },
          { id: "c", label: "unknown", correct: false },
          { id: "d", label: "never", correct: false },
        ],
      },
    ],
    takeaways: [
      "Initialized values are usually inferred.",
      "Annotate function boundaries and empty collections.",
      "Hover in the editor to see what TypeScript thinks.",
    ],
  },
];
