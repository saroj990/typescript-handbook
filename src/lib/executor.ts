import type { ExerciseTest } from "@/types/course";
import type { LogLine, RunResponse, TestResult } from "@/workers/executor.worker";

const TIMEOUT_MS = 4000;

type Pending = {
  resolve: (value: RunResponse) => void;
  reject: (error: Error) => void;
  timer: number;
};

let worker: Worker | null = null;
let requestId = 0;
const pending = new Map<string, Pending>();

function createWorker(): Worker {
  const next = new Worker(new URL("../workers/executor.worker.ts", import.meta.url), {
    type: "module",
  });
  next.onmessage = (event: MessageEvent<RunResponse>) => {
    const job = pending.get(event.data.id);
    if (!job) return;
    window.clearTimeout(job.timer);
    pending.delete(event.data.id);
    job.resolve(event.data);
  };
  next.onerror = (event) => {
    for (const [id, job] of pending) {
      window.clearTimeout(job.timer);
      pending.delete(id);
      job.reject(new Error(event.message || "Worker failed"));
    }
    recreateWorker();
  };
  return next;
}

function recreateWorker(): void {
  worker?.terminate();
  worker = createWorker();
}

function getWorker(): Worker {
  if (!worker) worker = createWorker();
  return worker;
}

function send(kind: "run" | "test", source: string, tests?: ExerciseTest[]): Promise<RunResponse> {
  const id = String(++requestId);
  return new Promise<RunResponse>((resolve, reject) => {
    const timer = window.setTimeout(() => {
      pending.delete(id);
      recreateWorker();
      reject(new Error("Execution timed out. The worker was restarted."));
    }, TIMEOUT_MS);
    pending.set(id, { resolve, reject, timer });
    getWorker().postMessage({ id, kind, source, tests });
  });
}

export async function runTypeScript(source: string): Promise<RunResponse> {
  return send("run", source);
}

export async function testTypeScript(
  source: string,
  tests: ExerciseTest[],
): Promise<RunResponse> {
  return send("test", source, tests);
}

export type { LogLine, RunResponse, TestResult };
