// src/components/Loader.jsx
// A full-width animated loading indicator shown while the AI is processing.
// Usage: <Loader message="Generating summary..." />

import React from "react";

function Loader({ message = "Processing..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      {/* Pulsing brain emoji */}
      <div className="text-5xl animate-bounce">🧠</div>

      {/* Spinner */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      <p className="text-slate-400 text-sm">{message}</p>
    </div>
  );
}

export default Loader;
