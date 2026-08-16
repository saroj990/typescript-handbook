import { Link, Navigate, useParams } from "react-router-dom";
import { ExercisePanel } from "@/features/exercises/ExercisePanel";
import { getLessonBySlug } from "@/content/typescript/registry";

export function ExercisePage() {
  const { slug, exerciseId } = useParams();
  const lesson = slug ? getLessonBySlug(slug) : undefined;
  const exercise = lesson?.exercises.find((item) => item.id === exerciseId);

  if (!lesson || !exercise) return <Navigate to="/course" replace />;

  return (
    <div className="mx-auto max-w-3xl">
      <p className="mb-3 text-sm text-[var(--text-muted)]">
        <Link to={`/lesson/${lesson.slug}`} className="hover:text-[var(--text)]">
          Back to {lesson.title}
        </Link>
      </p>
      <h1 className="mb-6 text-3xl font-semibold tracking-tight">Exercise mode</h1>
      <ExercisePanel lessonId={lesson.id} exercise={exercise} />
    </div>
  );
}
