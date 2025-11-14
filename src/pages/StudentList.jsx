import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaUserAlt } from "react-icons/fa";
import "./StudentList.css"; // import custom CSS

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Fetch all active students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:7002/student/getAllStudents");
      setStudents(res.data.students || []);
    } catch (err) {
      console.error("Failed to fetch students", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students by name
  const filteredStudents = students.filter((s) =>
    s.studentName.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="center-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="student-list-container">
      <h2 className="title">🎓 Students Directory</h2>

      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredStudents.length === 0 ? (
        <p className="no-students">No students found.</p>
      ) : (
        <div className="cards-grid">
          {filteredStudents.map((student) => (
            <div key={student._id} className="student-card">
              <div className="student-image">
                {student.image ? (
                  <img
                    src={`http://localhost:7002/uploads/${student.image}`}
                    alt={student.studentName}
                  />
                ) : (
                  <FaUserAlt className="placeholder-icon" />
                )}
              </div>
              <h3>{student.studentName}</h3>
              <p>{student.studentEmail}</p>
              <Link to={`/student/${student._id}`} className="btn-view">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentList;
