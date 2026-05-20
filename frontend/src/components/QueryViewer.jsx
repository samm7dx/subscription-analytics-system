import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const QueryViewer = ({ query, id }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!query) return;

    try {
      await navigator.clipboard.writeText(query.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div id={id} className="min-w-0 scroll-mt-32 rounded-2xl transition-[box-shadow] duration-300">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-gray-300">SQL Query</h3>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-white"
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy query
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
        <SyntaxHighlighter
          language="sql"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: "12px",
            padding: "20px",
            background: "#08080c",
            fontSize: "13px",
            lineHeight: 1.6,
          }}
          wrapLongLines
        >
          {query?.trim() || "-- No query available"}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default QueryViewer;
