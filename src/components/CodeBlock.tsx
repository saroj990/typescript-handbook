import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { highlightCode } from "@/lib/highlight";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "ts" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const highlighted = highlightCode(code, language);

  async function copy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className="code-block group relative my-4 overflow-hidden rounded-xl border border-slate-800 bg-[#0f172a]">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2 text-xs text-slate-400">
        <span className="font-mono uppercase">{language}</span>
        <Button size="sm" variant="ghost" onClick={() => void copy()} aria-label="Copy code">
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="code-block-pre m-0 overflow-x-auto">
        <code
          className="code-block-code block font-mono text-[0.86rem] leading-6 text-slate-100"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </pre>
    </div>
  );
}
