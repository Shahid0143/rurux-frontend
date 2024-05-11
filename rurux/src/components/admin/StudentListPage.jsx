// src/components/admin/StudentListPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  // Fetch student list on component mount
  useEffect(() => {
    fetchStudentList();
  }, []);

  // Function to fetch student list from the server
  const fetchStudentList = async () => {
    try {
      const response = await axios.get(
        "https://rurux-backend.onrender.com/admin/studentList"
      );
      console.log(response.data);
      setStudents(response.data);
    } catch (err) {
      console.error("Error fetching student list:", err);
      setError("Failed to fetch student list");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Student List Page</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Stream</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(students) &&
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                {/* <td>{student.stream}</td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentListPage;
