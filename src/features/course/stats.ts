import type { Course, Lesson } from "@/types/course";
import type { ProgressSnapshot } from "@/types/progress";
import { getOrderedLessons, getSectionLessons } from "@/content/typescript/registry";

export function percent(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function lessonCompleted(progress: ProgressSnapshot, lessonId: string): boolean {
  return Boolean(progress.lessons[lessonId]?.completedAt);
}

export function courseStats(course: Course, progress: ProgressSnapshot) {
  const lessons = getOrderedLessons(course);
  const exercises = lessons.flatMap((lesson) =>
    lesson.exercises.map((exercise) => ({ lesson, exercise })),
  );
  const completedLessons = lessons.filter((lesson) => lessonCompleted(progress, lesson.id));
  const completedExercises = exercises.filter(
    ({ exercise }) => progress.exercises[exercise.id]?.completed,
  );
  const nextLesson =
    lessons.find((lesson) => !lessonCompleted(progress, lesson.id)) ??
    lessons.find((lesson) => lesson.slug === progress.lastLessonSlug) ??
    lessons[0];

  return {
    lessons,
    exercises,
    completedLessons: completedLessons.length,
    completedExercises: completedExercises.length,
    lessonPercent: percent(completedLessons.length, lessons.length),
    exercisePercent: percent(completedExercises.length, exercises.length),
    nextLesson,
  };
}

export function sectionStats(course: Course, progress: ProgressSnapshot) {
  return course.sections.map((section) => {
    const lessons = getSectionLessons(section);
    const completed = lessons.filter((lesson) => lessonCompleted(progress, lesson.id)).length;
    return {
      section,
      lessons,
      completed,
      percent: percent(completed, lessons.length),
    };
  });
}

export function recentLessons(
  course: Course,
  progress: ProgressSnapshot,
  limit = 5,
): Lesson[] {
  const lessons = getOrderedLessons(course);
  return Object.values(progress.lessons)
    .filter((item) => item.completedAt)
    .sort((a, b) => (b.completedAt ?? "").localeCompare(a.completedAt ?? ""))
    .map((item) => lessons.find((lesson) => lesson.id === item.lessonId))
    .filter((lesson): lesson is Lesson => Boolean(lesson))
    .slice(0, limit);
}
