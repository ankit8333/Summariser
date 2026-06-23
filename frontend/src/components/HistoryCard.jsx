import React, { useState } from "react";

function HistoryCard({ item, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const preview = item.originalText.length > 120
    ? item.originalText.slice(0, 120) + "..."
    : item.originalText;

  return (
    <div className="bg-white border border-slate-200 hover:border-slate-300
                    rounded-2xl p-5 transition-all duration-200 space-y-3 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize
              ${item.summaryLength === "short"  ? "bg-green-100 text-green-600" :
                item.summaryLength === "long"   ? "bg-purple-100 text-purple-600" :
                                                  "bg-blue-100 text-blue-600"}`}>
              {item.summaryLength}
            </span>
            <span className="text-xs text-slate-400">
              {new Date(item.createdAt).toLocaleDateString()} · {item.wordCount} words
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed">{preview}</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <p className="text-slate-700 text-sm leading-relaxed">
          {expanded ? item.summary : item.summary.slice(0, 200) + (item.summary.length > 200 ? "..." : "")}
        </p>
        {item.summary.length > 200 && (
          <button onClick={() => setExpanded(!expanded)}
            className="text-indigo-500 text-xs mt-2 hover:text-indigo-400 transition-colors">
            {expanded ? "Show less ↑" : "Show more ↓"}
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 pt-1">
        <button onClick={handleCopy}
          className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 hover:bg-slate-100
                     border border-slate-200 text-slate-600 text-xs rounded-lg transition-all">
          {copied ? "✅ Copied" : "📋 Copy"}
        </button>
        <button onClick={() => onDelete(item._id)}
          className="flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100
                     border border-red-200 text-red-500 text-xs rounded-lg transition-all ml-auto">
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default HistoryCard;