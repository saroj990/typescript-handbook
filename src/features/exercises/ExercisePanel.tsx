import { lazy, Suspense, useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, Eye, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodePlayground, OutputPanel } from "@/features/editor/CodePlayground";
import { testTypeScript, type TestResult } from "@/lib/executor";
import { useProgressStore } from "@/store/progress";
import { useSettingsStore } from "@/store/settings";
import type { Exercise } from "@/types/course";

const MonacoEditor = lazy(async () => {
  await import("@/features/editor/monaco-setup");
  return import("@monaco-editor/react");
});

interface ExercisePanelProps {
  lessonId: string;
  exercise: Exercise;
}

export function ExercisePanel({ lessonId, exercise }: ExercisePanelProps) {
  const progress = useProgressStore((state) => state.exercises[exercise.id]);
  const recordAttempt = useProgressStore((state) => state.recordAttempt);
  const completeExercise = useProgressStore((state) => state.completeExercise);
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [choiceId, setChoiceId] = useState<string | null>(null);
  const [code, setCode] = useState(exercise.starterCode ?? "");
  const [results, setResults] = useState<TestResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const editorFontSize = useSettingsStore((state) => state.editorFontSize);
  const theme = useSettingsStore((state) => state.theme);
  const monacoTheme = theme === "light" ? "vs" : "vs-dark";

  const completed = Boolean(progress?.completed);
  const usesEditor = exercise.type !== "multiple-choice" && exercise.type !== "predict-output";

  const status = useMemo(() => {
    if (completed) return "Completed";
    if ((progress?.attempts ?? 0) > 0) return `${progress?.attempts} attempt(s)`;
    return "Not started";
  }, [completed, progress?.attempts]);

  async function runTests() {
    if (!exercise.tests?.length) return;
    setRunning(true);
    setError(null);
    recordAttempt(exercise.id, lessonId);
    try {
      const response = await testTypeScript(code, exercise.tests);
      setResults(response.results ?? []);
      setDiagnostics(response.diagnostics);
      setError(response.error ?? null);
      if (response.ok && (response.results ?? []).every((item) => item.passed)) {
        completeExercise(exercise.id, lessonId, code);
      }
    } catch (err) {
      setResults(null);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setRunning(false);
    }
  }

  function submitPrediction() {
    recordAttempt(exercise.id, lessonId);
    const expected = (exercise.expectedOutput ?? "").trim();
    const passed = prediction.trim() === expected;
    setResults([
      {
        id: "prediction",
        description: "Predicted output matches",
        passed,
        error: passed ? undefined : `Expected: ${expected}`,
      },
    ]);
    if (passed) completeExercise(exercise.id, lessonId, prediction);
  }

  function submitChoice() {
    recordAttempt(exercise.id, lessonId);
    const selected = exercise.choices?.find((choice) => choice.id === choiceId);
    const passed = Boolean(selected?.correct);
    setResults([
      {
        id: "choice",
        description: "Selected the correct answer",
        passed,
        error: passed ? undefined : "That option is not correct.",
      },
    ]);
    if (passed && choiceId) completeExercise(exercise.id, lessonId, choiceId);
  }

  return (
    <section className="my-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-4 sm:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
            Exercise · {exercise.type.replace("-", " ")}
          </p>
          <h3 className="mt-1 text-lg font-semibold">{exercise.title}</h3>
        </div>
        <span className="rounded-full bg-[var(--bg-muted)] px-2.5 py-1 text-xs text-[var(--text-muted)]">
          {status}
        </span>
      </div>
      <p className="whitespace-pre-wrap text-[var(--text)] leading-7">{exercise.prompt}</p>

      {exercise.type === "predict-output" ? (
        <div className="mt-4 space-y-3">
          {exercise.starterCode ? (
            <CodePlayground
              id={`${exercise.id}-preview`}
              title="Code to reason about"
              initialCode={exercise.starterCode}
            />
          ) : null}
          <label className="block text-sm font-medium" htmlFor={`${exercise.id}-prediction`}>
            Your predicted output
          </label>
          <input
            id={`${exercise.id}-prediction`}
            value={prediction}
            onChange={(event) => setPrediction(event.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-3 py-2 font-mono text-sm"
          />
          <Button variant="primary" onClick={submitPrediction}>
            Check answer
          </Button>
        </div>
      ) : null}

      {exercise.type === "multiple-choice" ? (
        <fieldset className="mt-4 space-y-2">
          <legend className="sr-only">Choose an answer</legend>
          {exercise.choices?.map((choice) => (
            <label
              key={choice.id}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--border)] px-3 py-2"
            >
              <input
                type="radio"
                name={exercise.id}
                checked={choiceId === choice.id}
                onChange={() => setChoiceId(choice.id)}
                className="mt-1"
              />
              <span>{choice.label}</span>
            </label>
          ))}
          <Button variant="primary" className="mt-3" onClick={submitChoice} disabled={!choiceId}>
            Submit
          </Button>
        </fieldset>
      ) : null}

      {usesEditor ? (
        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--border)]">
          <div className="min-h-[240px]">
            <Suspense
              fallback={
                <div className="flex h-[240px] items-center justify-center text-sm text-[var(--text-muted)]">
                  Loading editor…
                </div>
              }
            >
              <MonacoEditor
                height="240px"
                language="typescript"
                theme={monacoTheme}
                value={code}
                onChange={(value) => setCode(value ?? "")}
                options={{
                  fontSize: editorFontSize,
                  fontFamily: "IBM Plex Mono, ui-monospace, monospace",
                  minimap: { enabled: false },
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  padding: { top: 12 },
                }}
              />
            </Suspense>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-[var(--border)] p-3">
            <Button variant="primary" onClick={() => void runTests()} disabled={running}>
              <FlaskConical className="size-3.5" />
              {running ? "Running tests…" : "Run tests"}
            </Button>
            <Button
              onClick={() => {
                setCode(exercise.starterCode ?? "");
                setResults(null);
                setError(null);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      ) : null}

      {results || error || diagnostics.length ? (
        <div className="mt-4">
          {results ? (
            <ul className="mb-3 space-y-2">
              {results.map((result) => (
                <li
                  key={result.id}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    result.passed
                      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : "bg-rose-500/10 text-rose-700 dark:text-rose-300"
                  }`}
                >
                  {result.passed ? "✓" : "✗"} {result.description}
                  {result.error && !result.passed ? ` — ${result.error}` : ""}
                </li>
              ))}
            </ul>
          ) : null}
          <OutputPanel logs={[]} diagnostics={diagnostics} error={error} />
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => setHintIndex((value) => Math.min(exercise.hints.length, value + 1))}
          disabled={hintIndex >= exercise.hints.length}
        >
          <CircleHelp className="size-3.5" />
          {hintIndex === 0 ? "Show hint" : "Next hint"}
        </Button>
        <Button size="sm" onClick={() => setShowSolution((value) => !value)}>
          <Eye className="size-3.5" />
          {showSolution ? "Hide solution" : "Reveal solution"}
        </Button>
      </div>

      {hintIndex > 0 ? (
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-[var(--text-muted)]">
          {exercise.hints.slice(0, hintIndex).map((hint) => (
            <li key={hint}>{hint}</li>
          ))}
        </ol>
      ) : null}

      {showSolution ? (
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium">Solution</p>
          <pre className="overflow-x-auto rounded-xl bg-[#0f172a] p-4 font-mono text-sm text-slate-100">
            {exercise.solution}
          </pre>
        </div>
      ) : null}

      {completed ? (
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-300">
          <CheckCircle2 className="size-4" />
          Exercise complete
        </p>
      ) : null}
    </section>
  );
}
