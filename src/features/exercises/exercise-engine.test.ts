import { describe, expect, it } from "vitest";
import type { Exercise } from "@/types/course";

function evaluateExpression(source: string, expression: string): boolean {
  const fn = new Function(`${source}\nreturn Boolean((${expression}));`);
  return fn() as boolean;
}

const addExercise: Exercise = {
  id: "add",
  type: "write-code",
  title: "Create a typed function",
  prompt: "Write add(a, b)",
  starterCode: "function add(a, b) { return 0; }",
  solution: "function add(a, b) { return a + b; }",
  hints: ["Return a + b"],
  tests: [
    { id: "t1", description: "add(2, 3) === 5", expression: "add(2, 3) === 5" },
    { id: "t2", description: "add(10, 5) === 15", expression: "add(10, 5) === 15" },
  ],
};

describe("exercise engine", () => {
  it("fails starter code and passes the solution", () => {
    for (const test of addExercise.tests ?? []) {
      expect(evaluateExpression(addExercise.starterCode ?? "", test.expression)).toBe(false);
      expect(evaluateExpression(addExercise.solution, test.expression)).toBe(true);
    }
  });

  it("records a failed expression as not truthy", () => {
    expect(evaluateExpression("const add = (a, b) => a - b;", "add(2, 3) === 5")).toBe(
      false,
    );
  });
});
