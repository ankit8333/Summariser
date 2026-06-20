// src/components/SummaryOutput.jsx
// Displays the AI-generated summary after a successful API call.
// Props:
//   summary - the summary object returned from the API
//             shape: { summary, wordCount, summaryLength, createdAt }
// Features: copy to clipboard, animated entrance.

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
    <div className="animate-slide-up bg-gradient-to-br from-indigo-950/60 to-slate-900 
                    border border-indigo-800/50 rounded-2xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">✨</span>
          <h2 className="text-xl font-semibold text-white">AI Summary</h2>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 
                     border border-slate-600 text-slate-300 text-xs font-medium rounded-lg 
                     transition-all"
        >
          {copied ? "✅ Copied!" : "📋 Copy"}
        </button>
      </div>

      {/* Summary Text */}
      <p className="text-slate-200 leading-relaxed text-base">{summary.summary}</p>

      {/* Metadata */}
      <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-700">
        <span className="text-xs text-slate-500">
          📝 Original: <span className="text-slate-400">{summary.wordCount} words</span>
        </span>
        <span className="text-xs text-slate-500">
          📏 Length: <span className="text-slate-400 capitalize">{summary.summaryLength}</span>
        </span>
        <span className="text-xs text-slate-500">
          🕒 <span className="text-slate-400">
            {new Date(summary.createdAt).toLocaleTimeString()}
          </span>
        </span>
      </div>
    </div>
  );
}

export default SummaryOutput;
