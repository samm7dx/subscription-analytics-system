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
    <section
      id={id}
      className="min-w-0 scroll-mt-32 rounded-xl border border-white/[0.06] bg-[#08080c]/80 p-4 sm:rounded-2xl sm:p-5"
    >
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="text-sm font-semibold text-gray-200">SQL Query</h4>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-gray-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-white"
        >
          {copied ? "Copied" : "Copy query"}
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-white/[0.05]">
        <SyntaxHighlighter
          language="sql"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "16px",
            background: "#060608",
            fontSize: "12px",
            lineHeight: 1.7,
          }}
          wrapLongLines
          codeTagProps={{ style: { whiteSpace: "pre-wrap", wordBreak: "break-word" } }}
        >
          {query?.trim() || "-- No query available"}
        </SyntaxHighlighter>
      </div>
    </section>
  );
};

export default QueryViewer;
