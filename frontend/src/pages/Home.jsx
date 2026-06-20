// src/pages/Home.jsx
// The main page of the app. Contains:
//   1. Hero heading
//   2. TextInput component (user pastes text, selects length)
//   3. SummaryOutput component (shows result after API call)
// State: text, summaryLength, loading, error, summary

import React, { useState } from "react";
import TextInput from "../components/TextInput";
import SummaryOutput from "../components/SummaryOutput";
import { summariseText } from "../utils/api";

function Home() {
  const [text, setText] = useState("");
  const [summaryLength, setSummaryLength] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null);

  const handleSummarise = async () => {
    if (text.trim().length < 20) {
      setError("Please enter at least 20 characters.");
      return;
    }
    setError("");
    setLoading(true);
    setSummary(null);

    try {
      const result = await summariseText(text, summaryLength);
      setSummary(result);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-3 pt-8">
        <div className="inline-flex items-center gap-2 bg-indigo-900/30 border border-indigo-700/50 
                        text-indigo-300 text-xs font-medium px-4 py-1.5 rounded-full">
          ✨ Powered by OpenAI GPT
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Summarise any text{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            instantly
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Paste an article, essay, or report. Our AI reads it and gives you the key points in seconds.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-950/40 border border-red-700/50 text-red-400 rounded-xl px-5 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Text Input */}
      <TextInput
        text={text}
        setText={setText}
        summaryLength={summaryLength}
        setSummaryLength={setSummaryLength}
        onSubmit={handleSummarise}
        loading={loading}
      />

      {/* Loading State */}
      {loading && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl py-8 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="text-4xl animate-bounce">🧠</div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <p className="text-slate-400 text-sm">AI is reading your text...</p>
          </div>
        </div>
      )}

      {/* Summary Output */}
      {summary && !loading && <SummaryOutput summary={summary} />}

      {/* Feature cards at bottom */}
      {!summary && !loading && (
        <div className="grid grid-cols-3 gap-4 pt-4">
          {[
            { icon: "⚡", title: "Fast", desc: "Results in under 5 seconds" },
            { icon: "🎯", title: "Accurate", desc: "GPT-3.5 powered intelligence" },
            { icon: "💾", title: "Saved", desc: "All summaries stored for you" },
          ].map((f) => (
            <div key={f.title} className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="text-white text-sm font-semibold">{f.title}</div>
              <div className="text-slate-500 text-xs mt-1">{f.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
