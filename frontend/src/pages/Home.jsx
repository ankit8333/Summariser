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
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-8">
      <div className="text-center space-y-3 pt-8">
        <div className="inline-flex items-center gap-2 bg-indigo-100 border border-indigo-200 
                        text-indigo-600 text-xs font-medium px-4 py-1.5 rounded-full">
          ✨ Powered by Groq AI
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
          Summarise any text{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            instantly
          </span>
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Paste an article, essay, or report. Our AI reads it and gives you the key points in seconds.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-5 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      <TextInput
        text={text}
        setText={setText}
        summaryLength={summaryLength}
        setSummaryLength={setSummaryLength}
        onSubmit={handleSummarise}
        loading={loading}
      />

      {loading && (
        <div className="bg-white border border-slate-200 rounded-2xl py-8 text-center shadow-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="text-4xl animate-bounce">🧠</div>
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
            <p className="text-slate-400 text-sm">AI is reading your text...</p>
          </div>
        </div>
      )}

      {summary && !loading && <SummaryOutput summary={summary} />}
    </div>
  );
}

export default Home;