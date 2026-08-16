import { describe, expect, it } from "vitest";
import { nextStreak, todayKey, yesterdayKey } from "@/lib/dates";

describe("nextStreak", () => {
  const now = new Date("2026-08-16T10:00:00.000Z");

  it("starts a streak on the first active day", () => {
    expect(nextStreak(null, 0, now)).toEqual({
      streak: 1,
      lastActiveDate: "2026-08-16",
    });
  });

  it("keeps the streak when already active today", () => {
    expect(nextStreak(todayKey(now), 4, now)).toEqual({
      streak: 4,
      lastActiveDate: "2026-08-16",
    });
  });

  it("increments after yesterday", () => {
    expect(nextStreak(yesterdayKey(now), 4, now)).toEqual({
      streak: 5,
      lastActiveDate: "2026-08-16",
    });
  });

  it("resets after a gap", () => {
    expect(nextStreak("2026-08-10", 9, now)).toEqual({
      streak: 1,
      lastActiveDate: "2026-08-16",
    });
  });
});
