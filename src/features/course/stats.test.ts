import { describe, expect, it } from "vitest";
import { course } from "@/content/typescript/course";
import { getOrderedLessons } from "@/content/typescript/registry";
import { courseStats, percent } from "@/features/course/stats";
import type { ProgressSnapshot } from "@/types/progress";

const empty: ProgressSnapshot = {
  lessons: {},
  exercises: {},
  bookmarks: [],
  lastLessonSlug: null,
  streak: 0,
  lastActiveDate: null,
};

describe("courseStats", () => {
  it("starts at zero and points at the first lesson", () => {
    const stats = courseStats(course, empty);
    const first = getOrderedLessons(course)[0];
    expect(stats.lessonPercent).toBe(0);
    expect(stats.nextLesson?.id).toBe(first?.id);
  });

  it("computes completion after a lesson is marked done", () => {
    const first = getOrderedLessons(course)[0];
    expect(first).toBeDefined();
    const stats = courseStats(course, {
      ...empty,
      lessons: {
        [first!.id]: {
          lessonId: first!.id,
          startedAt: "2026-08-16",
          completedAt: "2026-08-16",
          lastVisitedAt: "2026-08-16",
        },
      },
    });
    expect(stats.completedLessons).toBe(1);
    expect(stats.lessonPercent).toBeGreaterThan(0);
  });
});

describe("percent", () => {
  it("avoids dividing by zero", () => {
    expect(percent(0, 0)).toBe(0);
    expect(percent(1, 2)).toBe(50);
  });
});
