import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { HomePage } from "@/pages/HomePage";

const CoursePage = lazy(() =>
  import("@/pages/CoursePage").then((module) => ({ default: module.CoursePage })),
);
const LessonPage = lazy(() =>
  import("@/pages/LessonPage").then((module) => ({ default: module.LessonPage })),
);
const ExercisePage = lazy(() =>
  import("@/pages/ExercisePage").then((module) => ({ default: module.ExercisePage })),
);
const ProgressPage = lazy(() =>
  import("@/pages/ProgressPage").then((module) => ({ default: module.ProgressPage })),
);
const SearchPage = lazy(() =>
  import("@/pages/SearchPage").then((module) => ({ default: module.SearchPage })),
);
const BookmarksPage = lazy(() =>
  import("@/pages/BookmarksPage").then((module) => ({ default: module.BookmarksPage })),
);
const SettingsPage = lazy(() =>
  import("@/pages/SettingsPage").then((module) => ({ default: module.SettingsPage })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })),
);

function PageFallback() {
  return <div className="py-16 text-sm text-[var(--text-muted)]">Loading…</div>;
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/lesson/:slug" element={<LessonPage />} />
          <Route path="/exercise/:slug/:exerciseId" element={<ExercisePage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
