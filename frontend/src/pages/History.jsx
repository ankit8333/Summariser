// src/pages/History.jsx
// Shows all previously saved summaries from MongoDB.
// Features: fetch on mount, delete individual entries, empty state.

import React, { useState, useEffect } from "react";
import HistoryCard from "../components/HistoryCard";
import Loader from "../components/Loader";
import { getAllSummaries, deleteSummary } from "../utils/api";

function History() {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  // Fetch all summaries when the component mounts
  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = async () => {
    setLoading(true);
    try {
      const data = await getAllSummaries();
      setSummaries(data);
    } catch (err) {
      setError("Failed to load history. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSummary(id);
      // Remove from local state without re-fetching
      setSummaries((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert("Failed to delete summary.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-6">
      {/* Page Header */}
      <div className="pt-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">History</h1>
          <p className="text-slate-400 text-sm mt-1">
            {summaries.length} saved {summaries.length === 1 ? "summary" : "summaries"}
          </p>
        </div>
        {summaries.length > 0 && (
          <button
            onClick={fetchSummaries}
            className="text-xs text-slate-400 hover:text-white border border-slate-700 
                       hover:border-slate-500 px-3 py-1.5 rounded-lg transition-all"
          >
            🔄 Refresh
          </button>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-950/40 border border-red-700/50 text-red-400 rounded-xl px-5 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Loading State */}
      {loading && <Loader message="Loading your summaries..." />}

      {/* Empty State */}
      {!loading && summaries.length === 0 && !error && (
        <div className="text-center py-20 space-y-3">
          <div className="text-6xl">📭</div>
          <p className="text-slate-400 text-lg">No summaries yet.</p>
          <p className="text-slate-500 text-sm">
            Go to the <span className="text-indigo-400">Summarise</span> page and create your first one!
          </p>
        </div>
      )}

      {/* Summary Cards */}
      {!loading && summaries.map((item) => (
        <HistoryCard key={item._id} item={item} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default History;
