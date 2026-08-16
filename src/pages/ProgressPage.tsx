import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { course } from "@/content/typescript/course";
import { courseStats, recentLessons, sectionStats } from "@/features/course/stats";
import { useProgressStore } from "@/store/progress";

export function ProgressPage() {
  const progress = useProgressStore();
  const stats = courseStats(course, progress);
  const sections = sectionStats(course, progress);
  const recent = recentLessons(course, progress);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Progress</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          Everything is stored on this device. No account required.
        </p>
      </div>
      <Card className="p-5">
        <Progress value={stats.lessonPercent} label="Overall progress" />
        <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm">
          <p>Lessons: {stats.completedLessons}/{stats.lessons.length}</p>
          <p>Exercises: {stats.completedExercises}/{stats.exercises.length}</p>
          <p>Streak: {progress.streak} day{progress.streak === 1 ? "" : "s"}</p>
        </div>
        {stats.nextLesson ? (
          <Link to={`/lesson/${stats.nextLesson.slug}`} className="mt-4 inline-block">
            <Button variant="primary">Continue → {stats.nextLesson.title}</Button>
          </Link>
        ) : null}
      </Card>
      <div className="space-y-3">
        {sections.map(({ section, percent, completed, lessons }) => (
          <Card key={section.id} className="p-4">
            <Progress value={percent} label={`${section.title} · ${completed}/${lessons.length}`} />
          </Card>
        ))}
      </div>
      {recent.length > 0 ? (
        <section>
          <h2 className="mb-3 text-lg font-semibold">Recently completed</h2>
          <ul className="space-y-2">
            {recent.map((lesson) => (
              <li key={lesson.id}>
                <Link to={`/lesson/${lesson.slug}`} className="text-[var(--accent)] hover:underline">
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
