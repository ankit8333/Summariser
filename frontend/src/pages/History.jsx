import React, { useState, useEffect } from "react";
import HistoryCard from "../components/HistoryCard";
import Loader from "../components/Loader";
import { getAllSummaries, deleteSummary } from "../utils/api";

function History() {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { fetchSummaries(); }, []);

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
      setSummaries((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert("Failed to delete summary.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-6">
      <div className="pt-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">History</h1>
          <p className="text-slate-400 text-sm mt-1">
            {summaries.length} saved {summaries.length === 1 ? "summary" : "summaries"}
          </p>
        </div>
        {summaries.length > 0 && (
          <button onClick={fetchSummaries}
            className="text-xs text-slate-500 hover:text-slate-800 border border-slate-200
                       hover:border-slate-400 px-3 py-1.5 rounded-lg transition-all">
            🔄 Refresh
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-500 rounded-xl px-5 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {loading && <Loader message="Loading your summaries..." />}

      {!loading && summaries.length === 0 && !error && (
        <div className="text-center py-20 space-y-3">
          <div className="text-6xl">📭</div>
          <p className="text-slate-500 text-lg">No summaries yet.</p>
          <p className="text-slate-400 text-sm">
            Go to the <span className="text-indigo-500">Summarise</span> page and create your first one!
          </p>
        </div>
      )}

      {!loading && summaries.map((item) => (
        <HistoryCard key={item._id} item={item} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default History;