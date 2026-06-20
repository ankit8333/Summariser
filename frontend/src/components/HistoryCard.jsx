// src/components/HistoryCard.jsx
// Renders a single saved summary in the History page.
// Props:
//   item     - the summary object from MongoDB
//   onDelete - function(id) called when user clicks Delete

import React, { useState } from "react";

function HistoryCard({ item, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Show only first 120 chars of original text as preview
  const preview = item.originalText.length > 120
    ? item.originalText.slice(0, 120) + "..."
    : item.originalText;

  return (
    <div className="bg-slate-900 border border-slate-700 hover:border-slate-600 
                    rounded-2xl p-5 transition-all duration-200 space-y-3">
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize
              ${item.summaryLength === "short"  ? "bg-green-900/50 text-green-400" :
                item.summaryLength === "long"   ? "bg-purple-900/50 text-purple-400" :
                                                  "bg-blue-900/50 text-blue-400"}`}>
              {item.summaryLength}
            </span>
            <span className="text-xs text-slate-500">
              {new Date(item.createdAt).toLocaleDateString()} · {item.wordCount} words
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{preview}</p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-slate-800/60 rounded-xl p-4">
        <p className="text-slate-200 text-sm leading-relaxed">
          {expanded ? item.summary : item.summary.slice(0, 200) + (item.summary.length > 200 ? "..." : "")}
        </p>
        {item.summary.length > 200 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-indigo-400 text-xs mt-2 hover:text-indigo-300 transition-colors"
          >
            {expanded ? "Show less ↑" : "Show more ↓"}
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 
                     border border-slate-600 text-slate-300 text-xs rounded-lg transition-all"
        >
          {copied ? "✅ Copied" : "📋 Copy"}
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="flex items-center gap-1 px-3 py-1.5 bg-red-950/40 hover:bg-red-900/50 
                     border border-red-800/50 text-red-400 text-xs rounded-lg transition-all ml-auto"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default HistoryCard;
