import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/student">
                Student Page
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/student/enrollment">
                Student Enrollment
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/streams">
                Stream Page
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/subjects">
                Subject Page
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/marks">
                Marks Page
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/login">
                Admin Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Student Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Student Signup
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
