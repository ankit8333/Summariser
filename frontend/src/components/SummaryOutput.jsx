import React, { useState } from "react";

function SummaryOutput({ summary }) {
  const [copied, setCopied] = useState(false);

  if (!summary) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(summary.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-slide-up bg-gradient-to-br from-indigo-50 to-white
                    border border-indigo-200 rounded-2xl p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">✨</span>
          <h2 className="text-xl font-semibold text-slate-800">AI Summary</h2>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50
                     border border-slate-200 text-slate-600 text-xs font-medium rounded-lg transition-all"
        >
          {copied ? "✅ Copied!" : "📋 Copy"}
        </button>
      </div>

      <p className="text-slate-700 leading-relaxed text-base">{summary.summary}</p>

      <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100">
        <span className="text-xs text-slate-400">
          📝 Original: <span className="text-slate-500">{summary.wordCount} words</span>
        </span>
        <span className="text-xs text-slate-400">
          📏 Length: <span className="text-slate-500 capitalize">{summary.summaryLength}</span>
        </span>
        <span className="text-xs text-slate-400">
          🕒 <span className="text-slate-500">{new Date(summary.createdAt).toLocaleTimeString()}</span>
        </span>
      </div>
    </div>
  );
}

export default SummaryOutput;