import ts from "typescript";

export interface RunRequest {
  id: string;
  kind: "run" | "test";
  source: string;
  tests?: Array<{ id: string; description: string; expression: string }>;
}

export interface LogLine {
  level: "log" | "info" | "warn" | "error";
  message: string;
}

export interface TestResult {
  id: string;
  description: string;
  passed: boolean;
  error?: string;
}

export interface RunResponse {
  id: string;
  ok: boolean;
  js?: string;
  logs: LogLine[];
  diagnostics: string[];
  error?: string;
  results?: TestResult[];
}

function stringify(value: unknown): string {
  if (typeof value === "string") return value;
  if (value instanceof Error) return value.stack ?? value.message;
  try {
    return JSON.stringify(value, null, 2) ?? String(value);
  } catch {
    return String(value);
  }
}

function compile(source: string): { js: string; diagnostics: string[] } {
  const transpiled = ts.transpileModule(source, {
    fileName: "module.ts",
    reportDiagnostics: true,
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.None,
      strict: true,
      jsx: ts.JsxEmit.React,
      esModuleInterop: true,
      skipLibCheck: true,
    },
  });

  const diagnostics = (transpiled.diagnostics ?? []).map((diagnostic) => {
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
    if (diagnostic.file && diagnostic.start !== undefined) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start,
      );
      return `Line ${line + 1}, col ${character + 1}: ${message}`;
    }
    return message;
  });

  return { js: transpiled.outputText, diagnostics };
}

function createConsole(logs: LogLine[]) {
  const push = (level: LogLine["level"]) => (...args: unknown[]) => {
    logs.push({ level, message: args.map(stringify).join(" ") });
  };
  return {
    log: push("log"),
    info: push("info"),
    warn: push("warn"),
    error: push("error"),
  };
}

function runSource(js: string, logs: LogLine[]): void {
  const runtimeConsole = createConsole(logs);
  const fn = new Function(
    "console",
    "exports",
    "module",
    `"use strict";\n${js}`,
  );
  const module = { exports: {} };
  fn(runtimeConsole, module.exports, module);
}

function runTests(
  js: string,
  tests: Array<{ id: string; description: string; expression: string }>,
  logs: LogLine[],
): TestResult[] {
  const runtimeConsole = createConsole(logs);
  const body = `
    "use strict";
    ${js}
    const __results = [];
    ${tests
      .map(
        (test) => `
      try {
        const __passed = Boolean((${test.expression}));
        __results.push({
          id: ${JSON.stringify(test.id)},
          description: ${JSON.stringify(test.description)},
          passed: __passed,
          error: __passed ? undefined : "Expression was not truthy: ${test.expression.replace(/"/g, '\\"')}"
        });
      } catch (error) {
        __results.push({
          id: ${JSON.stringify(test.id)},
          description: ${JSON.stringify(test.description)},
          passed: false,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    `,
      )
      .join("\n")}
    return __results;
  `;
  const fn = new Function("console", "exports", "module", body);
  const module = { exports: {} };
  return fn(runtimeConsole, module.exports, module) as TestResult[];
}

self.onmessage = (event: MessageEvent<RunRequest>) => {
  const request = event.data;
  const logs: LogLine[] = [];

  try {
    const { js, diagnostics } = compile(request.source);

    if (diagnostics.length > 0 && js.trim().length === 0) {
      const response: RunResponse = {
        id: request.id,
        ok: false,
        logs,
        diagnostics,
        error: "TypeScript compilation failed.",
      };
      self.postMessage(response);
      return;
    }

    if (request.kind === "test" && request.tests) {
      const results = runTests(js, request.tests, logs);
      const response: RunResponse = {
        id: request.id,
        ok: results.every((result) => result.passed),
        js,
        logs,
        diagnostics,
        results,
      };
      self.postMessage(response);
      return;
    }

    runSource(js, logs);
    const response: RunResponse = {
      id: request.id,
      ok: true,
      js,
      logs,
      diagnostics,
    };
    self.postMessage(response);
  } catch (error) {
    const response: RunResponse = {
      id: request.id,
      ok: false,
      logs,
      diagnostics: [],
      error: error instanceof Error ? error.message : String(error),
    };
    self.postMessage(response);
  }
};
