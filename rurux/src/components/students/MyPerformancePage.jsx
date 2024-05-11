// src/components/student/MyPerformancePage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const MyPerformancePage = () => {
  const [performance, setPerformance] = useState(null);
  const [error, setError] = useState("");
  const { id } = useParams();
  console.log(id)

 
  useEffect(() => {
    fetchPerformance();
  }, []);

  // Function to fetch user performance data from the server
  const fetchPerformance = async () => {
    try {
      const response = await axios.get(
        `https://rurux-backend.onrender.com/student/performance/${id}`
      );
      console.log(response.data)
      setPerformance(response.data);
    } catch (err) {
      console.error("Error fetching performance:", err);
      setError("Failed to fetch performance");
    }
  };

 
  const calculateTotalMarks = () => {
    if (!performance || !performance.subjects) return 0;
    let total = 0;
    performance.subjects.forEach((subject) => {
      total += subject.marks;
    });
    return total;
  };

  // Function to render pie chart
  const renderPieChart = () => {
    if (!performance || !performance.subjects) return null;
    const labels = performance.subjects.map((subject) => subject.name);
    const data = performance.subjects.map((subject) => subject.marks);
    const backgroundColors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#36C9A7",
      "#FF9F40",
    ];

    const chartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgroundColors,
        },
      ],
    };

    return <Pie data={chartData} />;
  };

  return (
    <div className="container">
      <h2 className="mb-4">My Performance Page</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {performance && (
        <div>
          <h4>Total Marks: {calculateTotalMarks()}</h4>
          <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            {renderPieChart()}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPerformancePage;
