import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProgressStore } from "@/store/progress";
import { useSettingsStore } from "@/store/settings";

export function SettingsPage() {
  const settings = useSettingsStore();
  const resetProgress = useProgressStore((state) => state.resetProgress);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
      <Card className="space-y-4 p-5">
        <h2 className="font-semibold">Appearance</h2>
        <label className="block text-sm">
          Theme
          <select
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2"
            value={settings.theme}
            onChange={(event) =>
              settings.setTheme(event.target.value as typeof settings.theme)
            }
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System</option>
          </select>
        </label>
        <label className="block text-sm">
          Reading size
          <select
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2"
            value={settings.fontSize}
            onChange={(event) =>
              settings.setFontSize(event.target.value as typeof settings.fontSize)
            }
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
          </select>
        </label>
      </Card>
      <Card className="space-y-4 p-5">
        <h2 className="font-semibold">Editor</h2>
        <label className="block text-sm">
          Font size ({settings.editorFontSize}px)
          <input
            type="range"
            min={12}
            max={20}
            value={settings.editorFontSize}
            onChange={(event) => settings.setEditorFontSize(Number(event.target.value))}
            className="mt-2 w-full"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={settings.editorMinimap}
            onChange={(event) => settings.setEditorMinimap(event.target.checked)}
          />
          Show minimap
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={settings.editorWordWrap}
            onChange={(event) => settings.setEditorWordWrap(event.target.checked)}
          />
          Word wrap
        </label>
      </Card>
      <Card className="space-y-3 p-5">
        <h2 className="font-semibold">Progress</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Resetting clears lesson completion, exercise results, bookmarks, and streak data
          stored in IndexedDB.
        </p>
        <Button
          variant="danger"
          onClick={() => {
            if (window.confirm("Reset all local learning progress?")) {
              void resetProgress();
            }
          }}
        >
          Reset progress
        </Button>
      </Card>
      <Card className="space-y-2 p-5">
        <h2 className="font-semibold">PWA</h2>
        <p className="text-sm text-[var(--text-muted)]">
          This app can be installed and used offline. After the first visit, lessons, the
          editor, and your progress remain available without a network connection.
        </p>
        <p className="text-sm text-[var(--text-muted)]">
          Status: {navigator.onLine ? "online" : "offline"}
        </p>
      </Card>
    </div>
  );
}
