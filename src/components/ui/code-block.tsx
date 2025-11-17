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
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line });
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, k) => {
                    const tokenProps = getTokenProps({ token });
                    return <span key={k} {...tokenProps} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
