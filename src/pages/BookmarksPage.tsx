import { Link } from "react-router-dom";
import { getLessonById } from "@/content/typescript/registry";
import { useProgressStore } from "@/store/progress";

export function BookmarksPage() {
  const bookmarks = useProgressStore((state) => state.bookmarks);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Bookmarks</h1>
      <p className="mt-2 text-[var(--text-muted)]">Save lessons to revisit later. Stored locally.</p>
      <ul className="mt-6 space-y-3">
        {bookmarks.length === 0 ? (
          <li className="text-[var(--text-muted)]">No bookmarks yet.</li>
        ) : null}
        {bookmarks.map((bookmark) => {
          const lesson = getLessonById(bookmark.lessonId);
          if (!lesson) return null;
          return (
            <li key={bookmark.lessonId}>
              <Link
                to={`/lesson/${lesson.slug}`}
                className="block rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 hover:border-[var(--accent)]"
              >
                <h2 className="font-semibold">{lesson.title}</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{lesson.description}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
