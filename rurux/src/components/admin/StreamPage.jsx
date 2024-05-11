// src/components/admin/StreamsPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const StreamsPage = () => {
  const [streams, setStreams] = useState([]);
  const [newStreamName, setNewStreamName] = useState("");
  const [error, setError] = useState("");

  // Fetch streams on component mount
  useEffect(() => {
    fetchStreams();
  }, []);

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

  // Function to handle adding a new stream
  const handleAddStream = async () => {
    try {
      const response = await axios.post(
        "https://rurux-backend.onrender.com/admin/streams",
        {
          name: newStreamName,
        }
      );
      setStreams([...streams, response.data]);
      setNewStreamName("");
      setError("");
    } catch (err) {
      console.error("Error adding stream:", err);
      setError(err.response.data.error);
    }
  };

  // Function to handle deleting a stream
  const handleDeleteStream = async (streamId) => {
    try {
      await axios.delete(
        `https://rurux-backend.onrender.com/admin/streams/${streamId}`
      );
      setStreams(streams.filter((stream) => stream._id !== streamId));
      setError("");
    } catch (err) {
      console.error("Error deleting stream:", err);
      setError(err.response.data.error);
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Streams Page</h2>
      {/* Display existing streams */}
      <ul className="list-group mb-4">
        {streams.map((stream) => (
          <li
            key={stream._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {stream.name}
            <button
              onClick={() => handleDeleteStream(stream._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* Add new stream form */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter stream name"
          value={newStreamName}
          onChange={(e) => setNewStreamName(e.target.value)}
        />
        <button onClick={handleAddStream} className="btn btn-primary">
          Add Stream
        </button>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default StreamsPage;
