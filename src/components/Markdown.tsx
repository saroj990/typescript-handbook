import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/CodeBlock";

interface MarkdownContentProps {
  markdown: string;
}

export function MarkdownContent({ markdown }: MarkdownContentProps) {
  return (
    <div className="prose-lesson">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre({ children }) {
            return <>{children}</>;
          },
          code({ className, children }) {
            const text = String(children).replace(/\n$/, "");
            const language = /language-(\w+)/.exec(className ?? "")?.[1];
            if (!language) {
              return <code>{text}</code>;
            }
            return <CodeBlock code={text} language={language} />;
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}
