export function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function yesterdayKey(date = new Date()): string {
  const copy = new Date(date);
  copy.setDate(copy.getDate() - 1);
  return todayKey(copy);
}

export function nextStreak(
  lastActiveDate: string | null,
  currentStreak: number,
  now = new Date(),
): { streak: number; lastActiveDate: string } {
  const today = todayKey(now);
  if (lastActiveDate === today) {
    return { streak: Math.max(currentStreak, 1), lastActiveDate: today };
  }
  if (lastActiveDate === yesterdayKey(now)) {
    return { streak: currentStreak + 1, lastActiveDate: today };
  }
  return { streak: 1, lastActiveDate: today };
}
