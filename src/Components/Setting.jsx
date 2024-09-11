import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser } from './UserReducer';

function Setting() {
  const { usersList } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteUser({ id }));
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <Link to="/department" className="btn btn-primary">Add Department</Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>
                <Link to={`/updatedepartment/${user.id}`} className="btn btn-warning btn-sm me-2">
                  Edit
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
                <button className="btn btn-primary btn-sm mx-2">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Setting;
