import React from "react";

function TextInput({ text, setText, summaryLength, setSummaryLength, onSubmit, loading }) {
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const lengths = [
    { value: "short",  label: "Short",  desc: "2-3 sentences" },
    { value: "medium", label: "Medium", desc: "4-6 sentences" },
    { value: "long",   label: "Long",   desc: "8-10 sentences" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Paste your text</h2>
        <p className="text-slate-400 text-sm mt-1">Paste an article, essay, or any large block of text below.</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here... (minimum 20 characters)"
        rows={10}
        className="w-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400
                   rounded-xl p-4 text-sm leading-relaxed resize-none focus:outline-none
                   focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
      />

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{wordCount} words · {text.length} characters</span>
        {text.length > 0 && (
          <button onClick={() => setText("")} className="hover:text-red-400 transition-colors">
            Clear ✕
          </button>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-slate-600 mb-2">Summary length</p>
        <div className="grid grid-cols-3 gap-3">
          {lengths.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSummaryLength(opt.value)}
              className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                summaryLength === opt.value
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-slate-50 border-slate-200 text-slate-500 hover:border-indigo-300"
              }`}
            >
              <div>{opt.label}</div>
              <div className="text-xs font-normal opacity-70">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={loading || text.trim().length < 20}
        className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200
                   disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold
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