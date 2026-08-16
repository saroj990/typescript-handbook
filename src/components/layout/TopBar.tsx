import { Bookmark, Menu, Search, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui";

export function TopBar() {
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const setSearchOpen = useUiStore((state) => state.setSearchOpen);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--bg)]/90 px-3 backdrop-blur md:px-5">
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          className="lg:hidden"
          onClick={toggleSidebar}
          aria-label="Open course navigation"
        >
          <Menu className="size-4" />
        </Button>
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid size-7 place-items-center rounded-md bg-[#3178C6] text-xs text-white">
            TS
          </span>
          <span className="hidden sm:inline">TypeScript Handbook</span>
        </Link>
      </div>
      <div className="flex items-center gap-1.5">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            setSearchOpen(true);
            navigate("/search");
          }}
          aria-label="Search the course"
        >
          <Search className="size-3.5" />
          <span className="hidden sm:inline">Search</span>
          <span className="kbd hidden md:inline">⌘K</span>
        </Button>
        <Link to="/bookmarks" aria-label="Bookmarks">
          <Button size="sm" variant="ghost">
            <Bookmark className="size-4" />
          </Button>
        </Link>
        <Link to="/settings" aria-label="Settings">
          <Button size="sm" variant="ghost">
            <Settings className="size-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
