import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-slate-500 hover:text-slate-800 hover:bg-slate-200"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <span className="text-lg font-bold text-slate-800 tracking-tight">
            AI <span className="text-indigo-500">Summariser</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>Summarise</NavLink>
          <NavLink to="/history" className={linkClass}>History</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;