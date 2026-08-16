import { ArrowRight, BookOpen, Code2, Gauge } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { course } from "@/content/typescript/course";
import { getOrderedLessons } from "@/content/typescript/registry";
import { courseStats } from "@/features/course/stats";
import { useProgressStore } from "@/store/progress";

export function HomePage() {
  const progress = useProgressStore();
  const stats = courseStats(course, progress);
  const lessons = getOrderedLessons(course);
  const continueSlug = progress.lastLessonSlug ?? stats.nextLesson?.slug ?? lessons[0]?.slug;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="space-y-4">
        <p className="text-sm font-medium text-[var(--accent)]">Beginner → Advanced</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          TypeScript Course & Handbook
        </h1>
        <p className="max-w-2xl text-lg text-[var(--text-muted)]">
          {course.description}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to={continueSlug ? `/lesson/${continueSlug}` : "/course"}>
            <Button variant="primary">
              {progress.lastLessonSlug ? "Continue learning" : "Start learning"}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link to="/course">
            <Button>Browse the course</Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <BookOpen className="mb-3 size-5 text-[var(--accent)]" />
          <p className="text-2xl font-semibold">{lessons.length}</p>
          <p className="text-sm text-[var(--text-muted)]">Structured lessons</p>
        </Card>
        <Card className="p-4">
          <Code2 className="mb-3 size-5 text-[var(--accent)]" />
          <p className="text-2xl font-semibold">{stats.exercises.length}</p>
          <p className="text-sm text-[var(--text-muted)]">Interactive exercises</p>
        </Card>
        <Card className="p-4">
          <Gauge className="mb-3 size-5 text-[var(--accent)]" />
          <p className="text-2xl font-semibold">{stats.lessonPercent}%</p>
          <p className="text-sm text-[var(--text-muted)]">Course complete</p>
        </Card>
      </section>

      <Card className="p-5">
        <Progress value={stats.lessonPercent} label="Overall progress" />
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          {stats.completedLessons} of {lessons.length} lessons · {stats.completedExercises} of{" "}
          {stats.exercises.length} exercises · streak {progress.streak} day
          {progress.streak === 1 ? "" : "s"}
        </p>
      </Card>
    </div>
  );
}
