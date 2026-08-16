import hljs from "highlight.js/lib/core";
import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("css", css);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);

const aliases: Record<string, string> = {
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  mjs: "javascript",
  json: "json",
  css: "css",
  html: "xml",
  xml: "xml",
};

export function highlightCode(code: string, language = "ts"): string {
  const registered = aliases[language.toLowerCase()] ?? language.toLowerCase();
  if (hljs.getLanguage(registered)) {
    return hljs.highlight(code, { language: registered, ignoreIllegals: true }).value;
  }
  return hljs.highlight(code, { language: "typescript", ignoreIllegals: true }).value;
}
