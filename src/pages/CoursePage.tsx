import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { course } from "@/content/typescript/course";
import { sectionStats } from "@/features/course/stats";
import { useProgressStore } from "@/store/progress";

export function CoursePage() {
  const progress = useProgressStore();
  const sections = sectionStats(course, progress);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Course</h1>
        <p className="mt-2 text-[var(--text-muted)]">
          A single path from JavaScript prerequisites to real-world TypeScript.
        </p>
      </div>
      <div className="space-y-4">
        {sections.map(({ section, lessons, completed, percent }) => (
          <Card key={section.id} className="p-4 sm:p-5">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{section.description}</p>
              </div>
              <Badge tone={percent === 100 ? "success" : "default"}>
                {section.level} · {completed}/{lessons.length}
              </Badge>
            </div>
            <Progress value={percent} className="mb-4" />
            <ul className="space-y-2">
              {lessons.map((lesson) => (
                <li key={lesson.id}>
                  <Link
                    to={`/lesson/${lesson.slug}`}
                    className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm hover:bg-[var(--bg-muted)]"
                  >
                    <span className="min-w-0">{lesson.title}</span>
                    <span className="shrink-0 text-[var(--text-muted)]">
                      {lesson.estimatedMinutes} min
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
