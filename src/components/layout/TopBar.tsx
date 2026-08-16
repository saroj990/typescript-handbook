import { Bookmark, Menu, Search, Settings, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui";

export function TopBar() {
  const sidebarOpen = useUiStore((state) => state.sidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const setSearchOpen = useUiStore((state) => state.setSearchOpen);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--bg)]/95 px-3 pt-[env(safe-area-inset-top)] backdrop-blur md:px-5">
      <div className="flex min-w-0 items-center gap-1.5">
        <Button
          size="sm"
          variant="ghost"
          className="size-10 shrink-0 lg:hidden"
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Close course navigation" : "Open course navigation"}
          aria-expanded={sidebarOpen}
          aria-controls="course-sidebar"
        >
          {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
        <Link to="/" className="flex min-w-0 items-center gap-2 font-semibold">
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-[#3178C6] text-xs text-white">
            TS
          </span>
          <span className="truncate text-sm sm:text-base">
            <span className="sm:hidden">TS Handbook</span>
            <span className="hidden sm:inline">TypeScript Handbook</span>
          </span>
        </Link>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button
          size="sm"
          variant="secondary"
          className="size-10 px-0 sm:h-8 sm:w-auto sm:px-2.5"
          onClick={() => {
            setSearchOpen(true);
            navigate("/search");
          }}
          aria-label="Search the course"
        >
          <Search className="size-4" />
          <span className="hidden sm:inline">Search</span>
          <span className="kbd hidden md:inline">⌘K</span>
        </Button>
        <Link to="/bookmarks" aria-label="Bookmarks">
          <Button size="sm" variant="ghost" className="size-10 px-0 sm:w-auto sm:px-2.5">
            <Bookmark className="size-4" />
          </Button>
        </Link>
        <Link to="/settings" aria-label="Settings">
          <Button size="sm" variant="ghost" className="size-10 px-0 sm:w-auto sm:px-2.5">
            <Settings className="size-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
