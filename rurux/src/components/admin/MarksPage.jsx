// src/components/admin/MarksPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const MarksPage = () => {
  const [marks, setMarks] = useState([]);
  const [newMark, setNewMark] = useState({
    studentName: "",
    stream: "",
    subject: "",
    marks: "",
  });
  const [error, setError] = useState("");

  // Fetch marks on component mount
  useEffect(() => {
    fetchMarks();
  }, []);

  // Function to fetch marks from the server
  const fetchMarks = async () => {
    try {
      const response = await axios.get(
        "https://rurux-backend.onrender.com/admin/marks"
      );
       console.log(response.data);
      setMarks(response.data);
      console.log(response.data)
    } catch (err) {
      console.error("Error fetching marks:", err);
    }
  };

  // Function to handle adding a new mark
  const handleAddMark = async () => {
    try {
      const response = await axios.post(
        "https://rurux-backend.onrender.com/admin/marks",
        newMark
      );
      setMarks([...marks, response.data]);
      setNewMark({ studentName: "", stream: "", subject: "", marks: "" });
      setError("");
    } catch (err) {
      console.error("Error adding mark:", err);
      setError(err.response.data.error);
    }
  };

  // Function to handle deleting a mark
  const handleDeleteMark = async (markId) => {
    try {
      await axios.delete(
        `https://rurux-backend.onrender.com/admin/marks/${markId}`
      );
      setMarks(marks.filter((mark) => mark._id !== markId));
      setError("");
    } catch (err) {
      console.error("Error deleting mark:", err);
      setError(err.response.data.error);
    }
  };


  return (
    <div className="container">
      <h2 className="mb-4">Marks Page</h2>
      {/* Display existing marks */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Stream</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark,i) => (
            <tr key={i}>
              <td>{mark.studentName}</td>
              <td>{mark.stream}</td>
              <td>{mark.subject}</td>
              <td>{mark.marks}</td>
              <td>
                <button
                  onClick={() => handleDeleteMark(mark._id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add new mark form */}
      <div className="mb-3">
        <label htmlFor="studentName" className="form-label">
          Student Name
        </label>
        <input
          type="text"
          className="form-control"
          id="studentName"
          value={newMark.studentName}
          onChange={(e) =>
            setNewMark({ ...newMark, studentName: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="stream" className="form-label">
          Stream
        </label>
        <input
          type="text"
          className="form-control"
          id="stream"
          value={newMark.stream}
          onChange={(e) => setNewMark({ ...newMark, stream: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="subject" className="form-label">
          Subject
        </label>
        <input
          type="text"
          className="form-control"
          id="subject"
          value={newMark.subject}
          onChange={(e) => setNewMark({ ...newMark, subject: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="marks" className="form-label">
          Marks
        </label>
        <input
          type="number"
          className="form-control"
          id="marks"
          value={newMark.marks}
          onChange={(e) => setNewMark({ ...newMark, marks: e.target.value })}
        />
      </div>
      <button onClick={handleAddMark} className="btn btn-primary">
        Add Mark
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default MarksPage;
