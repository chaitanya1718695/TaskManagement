import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser } from './UserReducer';
import '../Components/Css/Home.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin() {
  const { usersList } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser({ id }));
      toast.success('User deleted successfully!');
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <Link to="/create" className="btn btn-primary">Add Employee</Link>
      </div>
      <table className="table table-striped table-bordered table-responsive">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Registration Date</th>
            <th>Status</th>
            <th>Department</th>
            <th>Assigned Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.registrationDate}</td>
              <td>{user.status}</td>
              <td>{user.department}</td>
              <td>
                <Link to={`/assigned-tasks/${user.id}`} className="btn btn-info btn-sm">
                  Assigned Tasks
                </Link>
              </td>
              <td>
                <div className="btn-group">
                  <Link to={`/edit/${user.id}`} className="btn btn-warning btn-sm">
                    Edit
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
}

export default Admin;
