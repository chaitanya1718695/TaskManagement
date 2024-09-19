import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Components/Css/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="bg-dark text-white vh-100 d-flex flex-column p-3 fixed-start box-sizing-border-box"
      style={{ width: "250px" }}
    >
      <div className="mb-4">
        <h2 className="fw-bold">Staff List</h2>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link text-white hover-link">
            Admin
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/create" className="nav-link text-white hover-link">
            Create
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/ocrcomponent" className="nav-link text-white hover-link">
           Ocr
          </Link>
        </li>
    
    
        {/* <li className="nav-item mb-2">
          <Link to="/employetasks" className="nav-link text-white hover-link">
          Admin Login
          </Link>
        </li> */}
        {/* Uncomment and use these if needed */}
        {/* <li className="nav-item mb-2">
          <Link to="/setting" className="nav-link text-white hover-link">
            Setting
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/department" className="nav-link text-white hover-link">
            Department
          </Link>
        </li> */}
        {/* <li className="nav-item mb-2">
          <Link to="/employework" className="nav-link text-white hover-link">
           Employe Work
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/taskmanager" className="nav-link text-white hover-link">
         Task
          </Link>
          </li> */}
        <li className="nav-item mb-2">
          <Link to="/contact" className="nav-link text-white hover-link">
            Contact
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/deals" className="nav-link text-white hover-link">
            Deals
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
