import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "../styles/StudentPanel.css";

export default function StudentPanel() {
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:7002/student/getAllStudents");
      setStudents(res.data.students || []);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return fetchStudents();
    try {
      const res = await axios.get(`http://localhost:7002/student/search?name=${query}`);
      setStudents(res.data.students || []);
    } catch {
      console.error("Search failed");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="student-panel-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <div className="student-panel">
        {students.length > 0 ? (
          students.map((s) => (
            <div key={s._id} className="student-card">
              <img
                src={
                  s.image
                    ? `http://localhost:7002/uploads/${s.image}`
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt={s.studentName}
              />
              <h5>{s.studentName}</h5>
              <p>{s.studentEmail}</p>
              <p>{s.isActive ? "🟢 Active" : "🔴 Inactive"}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "gray" }}>No students found</p>
        )}
      </div>
    </div>
  );
}
