import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { course } from "@/content/typescript/course";
import { buildSearchDocuments } from "@/content/typescript/registry";
import { searchCourse } from "@/lib/search";

export function SearchPage() {
  const [query, setQuery] = useState("");
  const documents = useMemo(() => buildSearchDocuments(course), []);
  const results = useMemo(() => searchCourse(documents, query), [documents, query]);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">Search</h1>
      <label className="sr-only" htmlFor="course-search">
        Search TypeScript
      </label>
      <input
        id="course-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search TypeScript…"
        className="mt-4 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3"
      />
      <div className="mt-6 space-y-3">
        {results.map((result) => {
          const item = result.item;
          const href = item.exerciseId
            ? `/exercise/${item.slug}/${item.exerciseId}`
            : `/lesson/${item.slug}`;
          return (
            <Link
              key={item.id}
              to={href}
              className="block rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 hover:border-[var(--accent)]"
            >
              <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">
                {item.kind} · {item.sectionTitle}
              </p>
              <h2 className="mt-1 font-semibold">{item.title}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-[var(--text-muted)]">{item.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
