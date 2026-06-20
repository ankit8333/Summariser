// src/components/TextInput.jsx
// The main text input area where users paste or type their text.
// Props:
//   text           - current textarea value (controlled)
//   setText        - state setter to update text
//   summaryLength  - selected length ("short" | "medium" | "long")
//   setSummaryLength - state setter for length
//   onSubmit       - function called when "Summarise" button is clicked
//   loading        - boolean, disables button while API call is in progress

import React from "react";

function TextInput({ text, setText, summaryLength, setSummaryLength, onSubmit, loading }) {
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const lengths = [
    { value: "short",  label: "Short",  desc: "2-3 sentences" },
    { value: "medium", label: "Medium", desc: "4-6 sentences" },
    { value: "long",   label: "Long",   desc: "8-10 sentences" },
  ];

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-5">
      {/* Heading */}
      <div>
        <h2 className="text-xl font-semibold text-white">Paste your text</h2>
        <p className="text-slate-400 text-sm mt-1">
          Paste an article, essay, or any large block of text below.
        </p>
      </div>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here... (minimum 20 characters)"
        rows={10}
        className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 
                   rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none 
                   focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
      />

      {/* Word / Character count */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{wordCount} words · {charCount} characters</span>
        {text.length > 0 && (
          <button
            onClick={() => setText("")}
            className="text-slate-500 hover:text-red-400 transition-colors"
          >
            Clear ✕
          </button>
        )}
      </div>

      {/* Summary Length Selector */}
      <div>
        <p className="text-sm font-medium text-slate-300 mb-2">Summary length</p>
        <div className="grid grid-cols-3 gap-3">
          {lengths.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSummaryLength(opt.value)}
              className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                summaryLength === opt.value
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-400"
              }`}
            >
              <div>{opt.label}</div>
              <div className="text-xs font-normal opacity-70">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={loading || text.trim().length < 20}
        className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 
                   disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold 
                   rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            Summarising...
          </>
        ) : (
          <>✨ Summarise Text</>
        )}
      </button>
    </div>
  );
}

export default TextInput;
