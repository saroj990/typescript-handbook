import { useEffect, useMemo, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { course } from "@/content/typescript/course";
import { getSectionLessons } from "@/content/typescript/registry";
import { cn } from "@/lib/cn";
import { useProgressStore } from "@/store/progress";
import { useUiStore } from "@/store/ui";

export function Sidebar() {
  const location = useLocation();
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);
  const completed = useProgressStore((state) => state.lessons);
  const currentSectionId = useMemo(() => {
    const match = location.pathname.match(/^\/lesson\/([^/]+)/);
    if (!match?.[1]) return course.sections[0]?.id;
    return course.sections.find((section) =>
      getSectionLessons(section).some((lesson) => lesson.slug === match[1]),
    )?.id;
  }, [location.pathname]);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true,
  );

  useEffect(() => {
    if (currentSectionId) {
      setOpenSections((current) => ({ ...current, [currentSectionId]: true }));
    }
  }, [currentSectionId]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsDesktop(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSidebarOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [setSidebarOpen, sidebarOpen]);

  function close() {
    setSidebarOpen(false);
  }

  function toggleSection(id: string) {
    setOpenSections((current) => ({ ...current, [id]: !current[id] }));
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-[calc(3.5rem+env(safe-area-inset-top))] z-40 bg-black/45 transition-opacity lg:hidden",
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={close}
        aria-hidden={!sidebarOpen}
      />
      <aside
        id="course-sidebar"
        className={cn(
          "fixed top-[calc(3.5rem+env(safe-area-inset-top))] bottom-0 left-0 z-40 flex w-[min(20rem,88vw)] flex-col border-r border-[var(--border)] bg-[var(--bg-elevated)] shadow-[var(--shadow)] transition-transform duration-200 ease-out lg:static lg:top-auto lg:z-0 lg:w-72 lg:translate-x-0 lg:bg-transparent lg:shadow-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Course navigation"
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 lg:hidden">
          <p className="font-semibold">Course</p>
          <Button size="sm" variant="ghost" className="size-10 px-0" onClick={close} aria-label="Close menu">
            <X className="size-5" />
          </Button>
        </div>
        <nav className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-3 py-4">
          <div className="space-y-1">
            <NavLink to="/" current={location.pathname === "/"} onClick={close}>
              Home
            </NavLink>
            <NavLink to="/course" current={location.pathname === "/course"} onClick={close}>
              Course
            </NavLink>
            <NavLink to="/progress" current={location.pathname === "/progress"} onClick={close}>
              Progress
            </NavLink>
          </div>
          {course.sections.map((section) => {
            const lessons = getSectionLessons(section);
            const expanded =
              isDesktop || (openSections[section.id] ?? section.id === currentSectionId);
            return (
              <div key={section.id}>
                {isDesktop ? (
                  <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    {section.title}
                  </p>
                ) : (
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] hover:bg-[var(--bg-muted)]"
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={expanded}
                  >
                    <span>{section.title}</span>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 transition-transform",
                        expanded ? "rotate-0" : "-rotate-90",
                      )}
                    />
                  </button>
                )}
                {expanded ? (
                  <ul className="mt-1 space-y-1">
                    {lessons.map((lesson) => {
                      const isCurrent = location.pathname === `/lesson/${lesson.slug}`;
                      const isDone = Boolean(completed[lesson.id]?.completedAt);
                      return (
                        <li key={lesson.id}>
                          <Link
                            to={`/lesson/${lesson.slug}`}
                            onClick={close}
                            className={cn(
                              "flex items-start gap-2 rounded-lg px-2 py-2 text-sm",
                              isCurrent
                                ? "bg-[var(--bg-muted)] font-medium text-[var(--text)]"
                                : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text)]",
                            )}
                          >
                            <span
                              className={cn(
                                "mt-1.5 size-1.5 shrink-0 rounded-full",
                                isDone ? "bg-[var(--success)]" : "bg-[var(--border)]",
                              )}
                              aria-hidden
                            />
                            <span>{lesson.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

function NavLink({
  to,
  current,
  children,
  onClick,
}: {
  to: string;
  current: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "block rounded-lg px-2 py-2 text-sm",
        current
          ? "bg-[var(--bg-muted)] font-medium"
          : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text)]",
      )}
    >
      {children}
    </Link>
  );
}
