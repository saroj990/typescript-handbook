import Fuse from "fuse.js";
import type { SearchDocument } from "@/types/course";

export function createSearchIndex(documents: SearchDocument[]) {
  return new Fuse(documents, {
    includeScore: true,
    includeMatches: true,
    threshold: 0.38,
    ignoreLocation: true,
    minMatchCharLength: 2,
    keys: [
      { name: "title", weight: 0.45 },
      { name: "description", weight: 0.2 },
      { name: "sectionTitle", weight: 0.1 },
      { name: "text", weight: 0.25 },
    ],
  });
}

export function searchCourse(documents: SearchDocument[], query: string) {
  const trimmed = query.trim();
  if (!trimmed) return [];
  return createSearchIndex(documents).search(trimmed);
}

export function highlightMatch(text: string, query: string): string {
  const trimmed = query.trim();
  if (!trimmed) return text;
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(escaped, "ig"), (match) => `«${match}»`);
}
