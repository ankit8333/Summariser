// src/components/Navbar.jsx
// Top navigation bar with app logo and links to Home and History pages.
// Uses NavLink from react-router-dom to highlight the active page.

import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-slate-400 hover:text-white hover:bg-slate-800"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧠</span>
          <span className="text-lg font-bold text-white tracking-tight">
            AI <span className="text-indigo-400">Summariser</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Summarise
          </NavLink>
          <NavLink to="/history" className={linkClass}>
            History
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
