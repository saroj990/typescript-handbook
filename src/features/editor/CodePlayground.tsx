import { lazy, Suspense, useMemo, useState } from "react";
import { Check, Copy, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { runTypeScript, type LogLine } from "@/lib/executor";
import { useSettingsStore } from "@/store/settings";

const MonacoEditor = lazy(async () => {
  await import("@/features/editor/monaco-setup");
  return import("@monaco-editor/react");
});

interface CodePlaygroundProps {
  id: string;
  title?: string;
  initialCode: string;
}

export function CodePlayground({ id, title, initialCode }: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [diagnostics, setDiagnostics] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const theme = useSettingsStore((state) => state.theme);
  const editorFontSize = useSettingsStore((state) => state.editorFontSize);
  const editorMinimap = useSettingsStore((state) => state.editorMinimap);
  const editorWordWrap = useSettingsStore((state) => state.editorWordWrap);
  const monacoTheme = useMemo(
    () => (theme === "light" ? "vs" : "vs-dark"),
    [theme],
  );

  async function run() {
    setRunning(true);
    setError(null);
    try {
      const result = await runTypeScript(code);
      setLogs(result.logs);
      setDiagnostics(result.diagnostics);
      setError(result.error ?? null);
    } catch (err) {
      setLogs([]);
      setDiagnostics([]);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setRunning(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <section
      className="my-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)]"
      aria-labelledby={`${id}-title`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] px-3 py-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
            TypeScript
          </p>
          <h3 id={`${id}-title`} className="text-sm font-semibold">
            {title ?? "Try it yourself"}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => void copy()} aria-label="Copy code">
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            Copy
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setCode(initialCode);
              setLogs([]);
              setDiagnostics([]);
              setError(null);
            }}
          >
            <RotateCcw className="size-3.5" />
            Reset
          </Button>
          <Button
            size="sm"
            variant="primary"
            aria-label="Run code"
            onClick={() => void run()}
            disabled={running}
          >
            <Play className="size-3.5" />
            {running ? "Running…" : "Run"}
          </Button>
        </div>
      </div>
      <div className="min-h-[220px] border-b border-[var(--border)]">
        <Suspense
          fallback={
            <div className="flex h-[220px] items-center justify-center text-sm text-[var(--text-muted)]">
              Loading editor…
            </div>
          }
        >
          <MonacoEditor
            height="220px"
            language="typescript"
            theme={monacoTheme}
            value={code}
            onChange={(value) => setCode(value ?? "")}
            options={{
              fontSize: editorFontSize,
              fontFamily: "IBM Plex Mono, ui-monospace, monospace",
              minimap: { enabled: editorMinimap },
              wordWrap: editorWordWrap ? "on" : "off",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              padding: { top: 12 },
            }}
            onMount={(_editor, monaco) => {
              monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.ES2020,
                strict: true,
                noEmit: true,
              });
            }}
          />
        </Suspense>
      </div>
      <OutputPanel logs={logs} diagnostics={diagnostics} error={error} />
    </section>
  );
}

export function OutputPanel({
  logs,
  diagnostics,
  error,
}: {
  logs: LogLine[];
  diagnostics: string[];
  error: string | null;
}) {
  const empty = logs.length === 0 && diagnostics.length === 0 && !error;
  return (
    <div className="bg-[var(--bg-muted)] px-4 py-3" aria-live="polite">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
        Output
      </p>
      {empty ? (
        <p className="text-sm text-[var(--text-muted)]">
          Run the example to see console output, compiler notes, and runtime errors.
        </p>
      ) : null}
      {diagnostics.map((item) => (
        <p key={item} className="font-mono text-sm text-[var(--warning)]">
          {item}
        </p>
      ))}
      {error ? <p className="font-mono text-sm text-[var(--danger)]">{error}</p> : null}
      {logs.map((line, index) => (
        <p
          key={`${line.level}-${index}`}
          className={`font-mono text-sm ${
            line.level === "error"
              ? "text-[var(--danger)]"
              : line.level === "warn"
                ? "text-[var(--warning)]"
                : "text-[var(--text)]"
          }`}
        >
          {line.message}
        </p>
      ))}
    </div>
  );
}
