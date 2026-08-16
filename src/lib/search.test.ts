import { describe, expect, it } from "vitest";
import { highlightMatch, searchCourse } from "@/lib/search";
import type { SearchDocument } from "@/types/course";

const documents: SearchDocument[] = [
  {
    id: "1",
    kind: "lesson",
    title: "Generic Functions",
    description: "Write functions that work for many types",
    sectionTitle: "Generics",
    slug: "why-generics",
    text: "identity generic function type parameter",
  },
  {
    id: "2",
    kind: "lesson",
    title: "Union Types",
    description: "string or number",
    sectionTitle: "Fundamentals",
    slug: "union-types",
    text: "narrowing unions",
  },
];

describe("searchCourse", () => {
  it("finds generic-related lessons from informal queries", () => {
    const queries = ["generic", "generics", "generic function", "Generic Functions"];
    for (const query of queries) {
      const results = searchCourse(documents, query);
      expect(results[0]?.item.title).toBe("Generic Functions");
    }
  });

  it("returns no results for an empty query", () => {
    expect(searchCourse(documents, "   ")).toEqual([]);
  });
});

describe("highlightMatch", () => {
  it("wraps the matching text", () => {
    expect(highlightMatch("Generic Functions", "generic")).toBe("«Generic» Functions");
  });
});
