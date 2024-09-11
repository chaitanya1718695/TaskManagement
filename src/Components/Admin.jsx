import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUser, updateUser } from './UserReducer';
import '../Components/Css/Home.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Admin() {
  const { usersList } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [newTask, setNewTask] = useState("");

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser({ id }));
      toast.success('User deleted successfully!');
    }
  };

  

  const handleCloseTasksModal = () => {
    setShowTasksModal(false);
    setSelectedUser(null);
  };

  const handleAddTask = () => {
    if (newTask) {
      dispatch(updateUser({ 
        id: selectedUser.id, 
        tasks: [...(selectedUser.tasks || []), { id: Date.now(), description: newTask }] 
      }));
      setNewTask("");
      handleCloseTasksModal();
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

      {/* Modal for adding tasks */}
      {showTasksModal && selectedUser && (
        <div className="modal-overlay" onClick={handleCloseTasksModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h4 className="modal-header">Add Task for {selectedUser.name}</h4>
            <textarea 
              className="form-control mb-3" 
              placeholder="Enter new task" 
              value={newTask} 
              onChange={(e) => setNewTask(e.target.value)} 
            />
            <button className="btn btn-primary" onClick={handleAddTask}>Add Task</button>
            <button className="btn btn-secondary ms-2" onClick={handleCloseTasksModal}>Close</button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Admin;
