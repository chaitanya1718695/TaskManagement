import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./UserReducer";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { FaBuilding, FaUsers, FaCode } from 'react-icons/fa'; // Example icons
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(""); 
  const [registrationDate, setRegistrationDate] = useState(""); 

  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState(""); // Added password state
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const { usersList, departments } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Valid email is required";
    if (!role) newErrors.role = "Role is required";
    if (!registrationDate) newErrors.registrationDate = "Registration date is required";
    if (!department) newErrors.department = "Department is required";
    if (!password) newErrors.password = "Password is required"; // Validate password
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }; 

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      const existingUser = usersList.find(user => user.email === email || user.password === password);
      if (existingUser) {
        // Redirect to the employee's task page
        navigate(`/assigned-tasks/${existingUser.id}`);
      } else {
        // Add new user
        const nextId = usersList.length > 0 ? usersList[usersList.length - 1].id + 1 : 1;
        dispatch(
          addUser({ id: nextId, name, email, role, registrationDate, department, password }) // Include password in dispatch
        );
        // Redirect to the new employee's task page
        navigate(`/assigned-tasks/${nextId}`);
      }
    } else {
      // Show error toast
      toast.error("Please correct the errors in the form");
    }
  };

  const departmentOptions = departments.map(dept => ({
    value: dept,
    label: (
      <div className="d-flex align-items-center">
        <span className="me-2">
          {/* Example icon; customize as needed */}
          {dept === 'HR' ? <FaBuilding /> : dept === 'IT' ? <FaCode /> : <FaUsers />}
        </span>
        {dept}
      </div>
    )
  }));

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border rounded p-4 shadow-sm bg-white">
        <h3 className="text-center mb-4">Add New Employee</h3>
        <form onSubmit={handleSubmit}>
          {/* Existing form fields */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role:</label>
            <input
              type="text"
              name="role"
              className={`form-control ${errors.role ? "is-invalid" : ""}`}
              placeholder="Enter role"
              onChange={(e) => setRole(e.target.value)}
              value={role}
            />
            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="registrationDate" className="form-label">Registration Date:</label>
            <input
              type="date"
              name="registrationDate"
              className={`form-control ${errors.registrationDate ? "is-invalid" : ""}`}
              onChange={(e) => setRegistrationDate(e.target.value)}
              value={registrationDate}
            />
            {errors.registrationDate && <div className="invalid-feedback">{errors.registrationDate}</div>}
          </div>

          {/* <div className="mb-3">
            <label htmlFor="status" className="form-label">Status:</label>
            <select
              name="status"
              className="form-control"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div> */}

          {/* New Department dropdown with icons */}
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department:</label>
            <Select
              name="department"
              options={departmentOptions}
              onChange={(selectedOption) => setDepartment(selectedOption.value)}
              value={departmentOptions.find(option => option.value === department)}
              className={`react-select ${errors.department ? "is-invalid" : ""}`}
            />
            {errors.department && <div className="invalid-feedback">{errors.department}</div>}
          </div>
          {/* New Password field */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-info w-100 mt-3">Submit</button>
        </form>
        
      </div>
    </div>
  );
}

export default Create;
