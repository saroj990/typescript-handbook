export interface LessonProgress {
  lessonId: string;
  startedAt: string;
  completedAt: string | null;
  lastVisitedAt: string;
}

export interface ExerciseProgress {
  exerciseId: string;
  lessonId: string;
  attempts: number;
  completed: boolean;
  completedAt: string | null;
  lastAnswer?: string;
}

export interface Bookmark {
  lessonId: string;
  createdAt: string;
}

export interface ProgressSnapshot {
  lessons: Record<string, LessonProgress>;
  exercises: Record<string, ExerciseProgress>;
  bookmarks: Bookmark[];
  lastLessonSlug: string | null;
  streak: number;
  lastActiveDate: string | null;
}
