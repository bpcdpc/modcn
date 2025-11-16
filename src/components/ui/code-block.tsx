"use client";

import React from "react";
import { Highlight, themes } from "prism-react-renderer";
import type { Language } from "prism-react-renderer";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: Language | string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "css",
  className,
}) => {
  return (
    <div
      className={cn(
        "relative w-full rounded-md border border-border bg-muted/40",
        "max-h-[460px] overflow-auto",
        className
      )}
    >
      <Highlight
        code={code}
        language={language as Language}
        theme={themes.github}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="m-0 p-4 text-xs leading-relaxed font-mono"
            style={style as React.CSSProperties}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
