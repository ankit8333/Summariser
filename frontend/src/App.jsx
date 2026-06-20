// src/App.jsx
// Root component. Sets up React Router with two pages:
//   /         → Home (Summariser page)
//   /history  → History (Saved summaries page)
// Navbar is shown on every page.

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-white font-sans">
        <Navbar />
        <main className="pt-6 pb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
