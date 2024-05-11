// src/components/admin/SubjectsPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [streams, setStreams] = useState([]);
  const [error, setError] = useState("");

  // Fetch subjects and streams on component mount
  useEffect(() => {
    fetchSubjects();
    fetchStreams();
  }, []);

  // Function to fetch subjects from the server
  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        "https://rurux-backend.onrender.com/admin/subjects"
      );
      setSubjects(response.data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  };

  // Function to fetch streams from the server
  const fetchStreams = async () => {
    try {
      const response = await axios.get(
        "https://rurux-backend.onrender.com/admin/streams"
      );
      setStreams(response.data);
    } catch (err) {
      console.error("Error fetching streams:", err);
    }
  };

  // Function to handle adding a new subject
  const handleAddSubject = async () => {
    try {
      const response = await axios.post(
        "https://rurux-backend.onrender.com/admin/subjects",
        {
          name: newSubjectName,
          stream: selectedStream,
        }
      );
      setSubjects([...subjects, response.data]);
      setNewSubjectName("");
      setError("");
    } catch (err) {
      console.error("Error adding subject:", err);
      setError(err.response.data.error);
    }
  };

  // Function to handle deleting a subject
  const handleDeleteSubject = async (subjectId) => {
    try {
      await axios.delete(
        `https://rurux-backend.onrender.com/admin/subjects/${subjectId}`
      );
      setSubjects(subjects.filter((subject) => subject._id !== subjectId));
      setError("");
    } catch (err) {
      console.error("Error deleting subject:", err);
      setError(err.response.data.error);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Subjects Page</h2>
      {/* Display existing subjects */}
      <ul className="list-group mb-4">
        {subjects.map((subject) => (
          <li
            key={subject._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {subject.name}
            <button
              onClick={() => handleDeleteSubject(subject._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* Add new subject form */}
      <div className="mb-3">
        <label htmlFor="newSubjectName" className="form-label">
          Subject Name
        </label>
        <input
          type="text"
          className="form-control"
          id="newSubjectName"
          value={newSubjectName}
          onChange={(e) => setNewSubjectName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="selectStream" className="form-label">
          Select Stream
        </label>
        <select
          className="form-select"
          id="selectStream"
          value={selectedStream}
          onChange={(e) => setSelectedStream(e.target.value)}
        >
          <option value="">Select...</option>
          {streams.map((stream) => (
            <option key={stream._id} value={stream._id}>
              {stream.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAddSubject} className="btn btn-primary">
        Add Subject
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default SubjectsPage;
