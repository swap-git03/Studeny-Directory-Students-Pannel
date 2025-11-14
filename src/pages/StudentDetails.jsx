import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { FaArrowLeft, FaEnvelope, FaPhone, FaCalendarAlt, FaHome } from "react-icons/fa";

function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        console.log("Fetching student with ID:", id);
        const res = await axios.get(`http://localhost:7002/student/getStudentByID/${id}`);
        console.log("API response:", res.data);
        setStudent(res.data.student);
      } catch (err) {
        console.error("Failed to fetch student details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="text-center mt-5">
        <h4>⚠️ Student not found</h4>
        <Link to="/" className="btn btn-secondary mt-3">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-primary mb-4">
        <FaArrowLeft className="me-2" /> Back to List
      </Link>

      <div className="card shadow-lg p-4 border-0 rounded-4">
        <div className="row align-items-center">
          {/* Profile Image */}
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <img
              src={
                student.image
                  ? `http://localhost:7002/uploads/${student.image}`
                  : "https://via.placeholder.com/200x200.png?text=No+Image"
              }
              alt="student"
              className="rounded-circle border border-3 border-primary"
              width="200"
              height="200"
            />
          </div>

          {/* Details Section */}
          <div className="col-md-8">
            <h2 className="fw-bold mb-3 text-primary">{student.studentName}</h2>
            <p className="mb-2"><FaEnvelope className="me-2 text-muted" /> {student.studentEmail}</p>
            <p className="mb-2"><FaPhone className="me-2 text-muted" /> {student.studentPhone || "N/A"}</p>
            <p className="mb-2"><FaCalendarAlt className="me-2 text-muted" /> {student.studentDOB ? student.studentDOB.slice(0, 10) : "N/A"}</p>
            <p className="mb-2"><FaHome className="me-2 text-muted" /> {student.studentAddress || "Not provided"}</p>

            <span className={`badge px-3 py-2 mt-3 ${student.isActive ? "bg-success" : "bg-secondary"}`}>
              {student.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
