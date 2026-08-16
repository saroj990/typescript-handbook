import { describe, expect, it } from "vitest";
import { course } from "@/content/typescript/course";
import {
  buildSearchDocuments,
  getAdjacentLessons,
  getAllLessons,
  getLessonBySlug,
  getOrderedLessons,
} from "@/content/typescript/registry";

describe("course content", () => {
  const lessons = getAllLessons();

  it("registers unique slugs and ids", () => {
    const slugs = lessons.map((lesson) => lesson.slug);
    const ids = lessons.map((lesson) => lesson.id);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every lesson objectives, takeaways, and an exercise", () => {
    for (const lesson of lessons) {
      expect(lesson.objectives.length).toBeGreaterThan(0);
      expect(lesson.takeaways.length).toBeGreaterThan(0);
      expect(lesson.exercises.length).toBeGreaterThan(0);
      expect(lesson.blocks.length).toBeGreaterThan(0);
    }
  });

  it("navigates previous and next along the course path", () => {
    const ordered = getOrderedLessons(course);
    const first = ordered[0];
    const second = ordered[1];
    expect(first).toBeDefined();
    expect(second).toBeDefined();
    expect(getAdjacentLessons(course, first!.slug).next?.id).toBe(second!.id);
    expect(getAdjacentLessons(course, second!.slug).prev?.id).toBe(first!.id);
  });

  it("resolves lessons by slug", () => {
    expect(getLessonBySlug("union-types")?.title).toBe("Union Types");
  });

  it("indexes lessons and exercises for search", () => {
    const documents = buildSearchDocuments(course);
    expect(documents.some((doc) => doc.kind === "lesson")).toBe(true);
    expect(documents.some((doc) => doc.kind === "exercise")).toBe(true);
  });
});
