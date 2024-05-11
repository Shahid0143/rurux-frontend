// src/components/student/MyProfilePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();


  useEffect(() => {
    fetchProfile();
  }, []);

  // Function to fetch user profile from the server
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `https://rurux-backend.onrender.com/student/profile/${id}`
      );
      setProfile(response.data);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to fetch profile");
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">My Profile Page</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {profile && (
        <div className="card">
          <div className="card-body">
            {Object.entries(profile).map(([key, value]) => (
              <div key={key}>
                <p className="card-text">name: {value.name}</p>
                <p className="card-text">email: {value.email}</p>
                <p className="card-text">stream: {value.stream}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfilePage;
