import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { FaBuilding, FaUsers, FaCode } from 'react-icons/fa'; // Example icons
import { updateUser } from './UserReducer'; 

function Update() {
  const { id } = useParams();
  const { usersList, departments } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const existingUser = usersList.find(user => user.id === Number(id));

  const [uname, setName] = useState(existingUser ? existingUser.name : '');
  const [uemail, setEmail] = useState(existingUser ? existingUser.email : '');
  const [urole, setRole] = useState(existingUser ? existingUser.role : '');
  const [uregistrationDate, setRegistrationDate] = useState(existingUser ? existingUser.registrationDate : '');
  const [ustatus, setStatus] = useState(existingUser ? existingUser.status : 'Active');
  const [udepartment, setDepartment] = useState(existingUser ? existingUser.department : ''); // New state for department

  const [errors, setErrors] = useState({});

  if (!existingUser) return <div>User not found</div>;

  const validate = () => {
    const newErrors = {};
    if (!uname) newErrors.name = "Name is required";
    if (!uemail || !/\S+@\S+\.\S+/.test(uemail)) newErrors.email = "Valid email is required";
    if (!urole) newErrors.role = "Role is required";
    if (!uregistrationDate) newErrors.registrationDate = "Registration date is required";
    if (!udepartment) newErrors.department = "Department is required"; // Validate department
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (validate()) {
      dispatch(updateUser({
        id: Number(id),
        name: uname,
        email: uemail,
        role: urole,
        registrationDate: uregistrationDate,
        status: ustatus,
        department: udepartment // Include department
      }));
      navigate('/');
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
        <h3 className="text-center mb-4">Update User</h3>
        <form onSubmit={handleUpdate}>
          {/* Existing form fields */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              value={uname}
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
              value={uemail}
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
              value={urole}
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
              value={uregistrationDate}
            />
            {errors.registrationDate && <div className="invalid-feedback">{errors.registrationDate}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status:</label>
            <select
              name="status"
              className="form-control"
              onChange={(e) => setStatus(e.target.value)}
              value={ustatus}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {/* New Department dropdown with icons */}
          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department:</label>
            <Select
              name="department"
              options={departmentOptions}
              onChange={(selectedOption) => setDepartment(selectedOption.value)}
              value={departmentOptions.find(option => option.value === udepartment)}
              className={`react-select ${errors.department ? "is-invalid" : ""}`}
            />
            {errors.department && <div className="invalid-feedback">{errors.department}</div>}
          </div>
          <button type="submit" className="btn btn-warning w-100 mt-3">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
