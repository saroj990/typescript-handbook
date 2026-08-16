import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SearchDialog } from "@/features/search/SearchDialog";
import { InstallPrompt } from "@/features/pwa/InstallPrompt";
import { course } from "@/content/typescript/course";
import { getAdjacentLessons, getLessonBySlug } from "@/content/typescript/registry";
import { useProgressStore } from "@/store/progress";
import { useUiStore } from "@/store/ui";

export function AppLayout() {
  const hydrate = useProgressStore((state) => state.hydrate);
  const hydrated = useProgressStore((state) => state.hydrated);
  const location = useLocation();
  const navigate = useNavigate();
  const setSearchOpen = useUiStore((state) => state.setSearchOpen);

  useEffect(() => {
    if (!hydrated) void hydrate();
  }, [hydrate, hydrated]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable ||
        target?.closest(".monaco-editor");

      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        document
          .querySelector<HTMLButtonElement>("button[aria-label='Run code'], button")
          ?.dispatchEvent(new Event("click"));
      }

      if (typing) return;
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      const match = location.pathname.match(/^\/lesson\/([^/]+)/);
      if (!match?.[1]) return;
      const adjacent = getAdjacentLessons(course, match[1]);
      const lesson = event.key === "ArrowLeft" ? adjacent.prev : adjacent.next;
      if (lesson) navigate(`/lesson/${lesson.slug}`);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [location.pathname, navigate, setSearchOpen]);

  useEffect(() => {
    const slug = location.pathname.startsWith("/lesson/")
      ? location.pathname.slice("/lesson/".length)
      : null;
    if (slug) {
      const lesson = getLessonBySlug(slug);
      if (lesson) document.title = `${lesson.title} · TypeScript Handbook`;
    } else {
      document.title = "TypeScript Course & Handbook";
    }
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <div className="min-h-dvh bg-[var(--bg)] text-[var(--text)]">
        <TopBar />
        <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-[1400px]">
          <Sidebar />
          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
        <SearchDialog />
        <InstallPrompt />
      </div>
    </ThemeProvider>
  );
}
