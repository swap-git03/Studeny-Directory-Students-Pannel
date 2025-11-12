import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaGraduationCap } from "react-icons/fa";
import "../styles/Navbar.css";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <FaGraduationCap className="logo-icon" />
        <h1 className="navbar-title">Student Panel</h1>
      </div>

      <div className="navbar-right">
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
}
