import { create } from "zustand";
import { clearProgress, loadProgress, saveProgress } from "@/lib/idb";
import { nextStreak } from "@/lib/dates";
import type {
  Bookmark,
  ExerciseProgress,
  LessonProgress,
  ProgressSnapshot,
} from "@/types/progress";

const emptySnapshot = (): ProgressSnapshot => ({
  lessons: {},
  exercises: {},
  bookmarks: [],
  lastLessonSlug: null,
  streak: 0,
  lastActiveDate: null,
});

interface ProgressState extends ProgressSnapshot {
  hydrated: boolean;
  hydrate: () => Promise<void>;
  startLesson: (lessonId: string, slug: string) => void;
  completeLesson: (lessonId: string, slug: string) => void;
  recordAttempt: (exerciseId: string, lessonId: string) => void;
  completeExercise: (exerciseId: string, lessonId: string, answer?: string) => void;
  toggleBookmark: (lessonId: string) => void;
  setLastLesson: (slug: string) => void;
  resetProgress: () => Promise<void>;
}

function persist(snapshot: ProgressSnapshot): void {
  void saveProgress(snapshot);
}

function withActivity(state: ProgressState): Pick<ProgressState, "streak" | "lastActiveDate"> {
  return nextStreak(state.lastActiveDate, state.streak);
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  ...emptySnapshot(),
  hydrated: false,
  hydrate: async () => {
    const stored = await loadProgress();
    set({
      ...(stored ?? emptySnapshot()),
      hydrated: true,
    });
  },
  startLesson: (lessonId, slug) => {
    const now = new Date().toISOString();
    const current = get().lessons[lessonId];
    const lesson: LessonProgress = current
      ? { ...current, lastVisitedAt: now }
      : { lessonId, startedAt: now, completedAt: null, lastVisitedAt: now };
    const next = {
      ...get(),
      ...withActivity(get()),
      lastLessonSlug: slug,
      lessons: { ...get().lessons, [lessonId]: lesson },
    };
    set(next);
    persist(next);
  },
  completeLesson: (lessonId, slug) => {
    const now = new Date().toISOString();
    const current = get().lessons[lessonId];
    const lesson: LessonProgress = {
      lessonId,
      startedAt: current?.startedAt ?? now,
      completedAt: current?.completedAt ?? now,
      lastVisitedAt: now,
    };
    const next = {
      ...get(),
      ...withActivity(get()),
      lastLessonSlug: slug,
      lessons: { ...get().lessons, [lessonId]: lesson },
    };
    set(next);
    persist(next);
  },
  recordAttempt: (exerciseId, lessonId) => {
    const current = get().exercises[exerciseId];
    const exercise: ExerciseProgress = {
      exerciseId,
      lessonId,
      attempts: (current?.attempts ?? 0) + 1,
      completed: current?.completed ?? false,
      completedAt: current?.completedAt ?? null,
      lastAnswer: current?.lastAnswer,
    };
    const next = {
      ...get(),
      exercises: { ...get().exercises, [exerciseId]: exercise },
    };
    set(next);
    persist(next);
  },
  completeExercise: (exerciseId, lessonId, answer) => {
    const now = new Date().toISOString();
    const current = get().exercises[exerciseId];
    const exercise: ExerciseProgress = {
      exerciseId,
      lessonId,
      attempts: current?.attempts ?? 1,
      completed: true,
      completedAt: current?.completedAt ?? now,
      lastAnswer: answer ?? current?.lastAnswer,
    };
    const next = {
      ...get(),
      ...withActivity(get()),
      exercises: { ...get().exercises, [exerciseId]: exercise },
    };
    set(next);
    persist(next);
  },
  toggleBookmark: (lessonId) => {
    const exists = get().bookmarks.some((item) => item.lessonId === lessonId);
    const bookmarks: Bookmark[] = exists
      ? get().bookmarks.filter((item) => item.lessonId !== lessonId)
      : [...get().bookmarks, { lessonId, createdAt: new Date().toISOString() }];
    const next = { ...get(), bookmarks };
    set(next);
    persist(next);
  },
  setLastLesson: (slug) => {
    const next = { ...get(), lastLessonSlug: slug };
    set(next);
    persist(next);
  },
  resetProgress: async () => {
    await clearProgress();
    set({ ...emptySnapshot(), hydrated: true });
  },
}));
