import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { course } from "@/content/typescript/course";
import { buildSearchDocuments } from "@/content/typescript/registry";
import { highlightMatch, searchCourse } from "@/lib/search";
import { useUiStore } from "@/store/ui";

export function SearchDialog() {
  const open = useUiStore((state) => state.searchOpen);
  const setSearchOpen = useUiStore((state) => state.setSearchOpen);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const documents = useMemo(() => buildSearchDocuments(course), []);
  const results = useMemo(() => searchCourse(documents, query), [documents, query]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/50 p-0 sm:items-start sm:p-4 sm:pt-[12vh]">
      <button className="absolute inset-0" aria-label="Close search" onClick={() => setSearchOpen(false)} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the course"
        className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow)] sm:h-auto sm:rounded-2xl sm:border"
      >
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search TypeScript…"
          className="w-full border-b border-[var(--border)] bg-transparent px-4 py-3 text-base outline-none"
        />
        <ul className="max-h-none flex-1 overflow-y-auto p-2 sm:max-h-[50vh]">
          {query && results.length === 0 ? (
            <li className="px-3 py-6 text-sm text-[var(--text-muted)]">No matching lessons or exercises.</li>
          ) : null}
          {results.slice(0, 12).map((result) => {
            const item = result.item;
            const href = item.exerciseId
              ? `/exercise/${item.slug}/${item.exerciseId}`
              : `/lesson/${item.slug}`;
            return (
              <li key={item.id}>
                <button
                  className="w-full rounded-xl px-3 py-2 text-left hover:bg-[var(--bg-muted)]"
                  onClick={() => {
                    setSearchOpen(false);
                    navigate(href);
                  }}
                >
                  <p className="text-xs uppercase tracking-wide text-[var(--text-muted)]">
                    {item.kind} · {item.sectionTitle}
                  </p>
                  <p className="font-medium">{highlightMatch(item.title, query).replaceAll("«", "").replaceAll("»", "")}</p>
                  <p className="line-clamp-2 text-sm text-[var(--text-muted)]">{item.description}</p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
