// src/App.js
import React from "react";
import {  Route,Routes } from "react-router-dom";
import LoginPage from "./components/common/LoginPage";
import SignupPage from "./components/common/SignupPage";
import StreamsPage from "./components/admin/StreamPage";
import SubjectsPage from "./components/admin/SubjectsPage";
import MarksPage from "./components/admin/MarksPage";
import StudentListPage from "./components/admin/StudentListPage";
import MyProfilePage from "./components/students/MyProfilePage";
import MyPerformancePage from "./components/students/MyPerformancePage";
import Navbar from "./components/Navbar";
import AdminLoginPage from "./components/admin/AdminLoginPage";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
      
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/streams" element={<StreamsPage />} />
        <Route path="/admin/subjects" element={<SubjectsPage />} />
        <Route path="/admin/marks" element={<MarksPage />} />
        <Route path="/admin/studentlist" element={<StudentListPage />} />
        <Route path="/student/profile/:id" element={<MyProfilePage />} />
        <Route
          path="/student/performance/:id"
          element={<MyPerformancePage />}
        />
      </Routes>
    </>
  );
};

export default App;
