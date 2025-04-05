"use client";

import { useEffect, useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = "tsx",
  className = "",
}: CodeBlockProps) {
  const [highlightedCode, setHighlightedCode] = useState<string>(code);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function highlight() {
      try {
        setIsLoading(true);
        const shiki = await import("shiki");

        const highlighter = await shiki.createHighlighter({
          themes: ["github-dark"],
          langs: ["tsx", "typescript", "javascript", "bash"],
        });

        const highlighted = await highlighter.codeToHtml(code, {
          lang: language,
          theme: "github-dark",
        });

        if (isMounted) {
          setHighlightedCode(highlighted);
        }
      } catch (error) {
        console.error("Failed to highlight code:", error);
        if (isMounted) {
          setHighlightedCode(`<pre><code>${code}</code></pre>`);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    highlight();

    return () => {
      isMounted = false;
    };
  }, [code, language]);

  if (isLoading) {
    return (
      <div
        className={`bg-[#0d1117] rounded-xl p-2 overflow-x-auto ${className}`}
      >
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#0d1117] rounded-xl p-2 overflow-x-auto ${className} [&_pre]:!bg-transparent`}
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
}
