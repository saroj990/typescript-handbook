import { useEffect, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Bookmark, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { MarkdownContent } from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { course } from "@/content/typescript/course";
import {
  getAdjacentLessons,
  getLessonBySlug,
  getOrderedLessons,
  getSectionForLesson,
} from "@/content/typescript/registry";
import { CodePlayground } from "@/features/editor/CodePlayground";
import { ExercisePanel } from "@/features/exercises/ExercisePanel";
import { useProgressStore } from "@/store/progress";

export function LessonPage() {
  const { slug } = useParams();
  const lesson = slug ? getLessonBySlug(slug) : undefined;
  const startLesson = useProgressStore((state) => state.startLesson);
  const completeLesson = useProgressStore((state) => state.completeLesson);
  const toggleBookmark = useProgressStore((state) => state.toggleBookmark);
  const bookmarks = useProgressStore((state) => state.bookmarks);
  const lessonProgress = useProgressStore((state) =>
    lesson ? state.lessons[lesson.id] : undefined,
  );

  useEffect(() => {
    if (lesson) startLesson(lesson.id, lesson.slug);
  }, [lesson, startLesson]);

  const headings = useMemo(() => {
    if (!lesson) return [];
    return lesson.blocks
      .filter((block) => block.type === "markdown")
      .flatMap((block) =>
        [...block.markdown.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1] ?? ""),
      )
      .filter(Boolean);
  }, [lesson]);

  if (!slug || !lesson) return <Navigate to="/course" replace />;

  const section = getSectionForLesson(course, lesson);
  const adjacent = getAdjacentLessons(course, lesson.slug);
  const ordered = getOrderedLessons(course);
  const index = ordered.findIndex((item) => item.id === lesson.id);
  const bookmarked = bookmarks.some((item) => item.lessonId === lesson.id);
  const completed = Boolean(lessonProgress?.completedAt);

  return (
    <article className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <div className="min-w-0">
        <nav className="mb-4 text-sm text-[var(--text-muted)]" aria-label="Breadcrumb">
          <Link to="/course" className="hover:text-[var(--text)]">
            Course
          </Link>
          <span className="px-2">/</span>
          <span>{section?.title}</span>
          <span className="px-2">/</span>
          <span className="text-[var(--text)]">{lesson.title}</span>
        </nav>
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-[var(--text-muted)]">
              {lesson.level} · {lesson.estimatedMinutes} min
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">{lesson.title}</h1>
            <p className="mt-2 max-w-2xl text-[var(--text-muted)]">{lesson.description}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => toggleBookmark(lesson.id)} aria-pressed={bookmarked}>
              <Bookmark className={`size-4 ${bookmarked ? "fill-current" : ""}`} />
              {bookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
            <Button
              size="sm"
              variant={completed ? "secondary" : "primary"}
              onClick={() => completeLesson(lesson.id, lesson.slug)}
            >
              <Check className="size-4" />
              {completed ? "Completed" : "Mark complete"}
            </Button>
          </div>
        </div>
        <Progress value={((index + 1) / ordered.length) * 100} label="Course position" />

        <section className="mt-8">
          <h2 className="text-xl font-semibold">What you will learn</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {lesson.objectives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {lesson.blocks.map((block, index) =>
          block.type === "markdown" ? (
            <MarkdownContent key={`md-${index}`} markdown={block.markdown} />
          ) : (
            <CodePlayground
              key={block.playground.id}
              id={block.playground.id}
              title={block.playground.title}
              initialCode={block.playground.code}
            />
          ),
        )}

        {lesson.exercises.map((exercise) => (
          <ExercisePanel key={exercise.id} lessonId={lesson.id} exercise={exercise} />
        ))}

        <section className="mt-10">
          <h2 className="text-xl font-semibold">Key takeaways</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {lesson.takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-[var(--border)] pt-6">
          {adjacent.prev ? (
            <Link to={`/lesson/${adjacent.prev.slug}`}>
              <Button>
                <ChevronLeft className="size-4" />
                {adjacent.prev.title}
              </Button>
            </Link>
          ) : (
            <span />
          )}
          {adjacent.next ? (
            <Link to={`/lesson/${adjacent.next.slug}`}>
              <Button variant="primary">
                {adjacent.next.title}
                <ChevronRight className="size-4" />
              </Button>
            </Link>
          ) : null}
        </div>
      </div>
      <aside className="hidden lg:block">
        <div className="sticky top-20 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            On this page
          </p>
          <ul className="space-y-2 text-sm text-[var(--text-muted)]">
            <li>What you will learn</li>
            {headings.map((heading) => (
              <li key={heading}>{heading}</li>
            ))}
            <li>Exercises</li>
            <li>Key takeaways</li>
          </ul>
        </div>
      </aside>
    </article>
  );
}
