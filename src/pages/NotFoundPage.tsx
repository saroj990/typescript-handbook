import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl py-16 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 text-[var(--text-muted)]">
        That route is not part of the handbook.
      </p>
      <Link to="/" className="mt-6 inline-block">
        <Button variant="primary">Back home</Button>
      </Link>
    </div>
  );
}
