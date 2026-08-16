import { Link, useLocation } from "react-router-dom";
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

  return (
    <>
      {sidebarOpen ? (
        <button
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-80 overflow-y-auto border-r border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-4 transition-transform lg:static lg:z-0 lg:translate-x-0 lg:bg-transparent",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <nav aria-label="Course" className="space-y-5">
          <div className="space-y-1">
            <NavLink to="/" current={location.pathname === "/"} onClick={() => setSidebarOpen(false)}>
              Home
            </NavLink>
            <NavLink
              to="/course"
              current={location.pathname === "/course"}
              onClick={() => setSidebarOpen(false)}
            >
              Course
            </NavLink>
            <NavLink
              to="/progress"
              current={location.pathname === "/progress"}
              onClick={() => setSidebarOpen(false)}
            >
              Progress
            </NavLink>
          </div>
          {course.sections.map((section) => (
            <div key={section.id}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                {section.title}
              </p>
              <ul className="space-y-1">
                {getSectionLessons(section).map((lesson) => {
                  const isCurrent = location.pathname === `/lesson/${lesson.slug}`;
                  const isDone = Boolean(completed[lesson.id]?.completedAt);
                  return (
                    <li key={lesson.id}>
                      <Link
                        to={`/lesson/${lesson.slug}`}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm",
                          isCurrent
                            ? "bg-[var(--bg-muted)] font-medium text-[var(--text)]"
                            : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text)]",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-1 size-1.5 shrink-0 rounded-full",
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
            </div>
          ))}
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
        "block rounded-lg px-2 py-1.5 text-sm",
        current
          ? "bg-[var(--bg-muted)] font-medium"
          : "text-[var(--text-muted)] hover:bg-[var(--bg-muted)] hover:text-[var(--text)]",
      )}
    >
      {children}
    </Link>
  );
}
