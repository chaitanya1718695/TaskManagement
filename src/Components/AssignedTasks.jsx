// src/AssignedTasks/AssignedTasks.js
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../Components/UserReducer'; // Correct import path
import "../Components/Css/AssignedTasks.css";

function AssignedTasks() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const user = useSelector((state) => state.users.usersList.find(user => user.id === parseInt(userId)));

  const [tasks, setTasks] = useState(user?.tasks || []);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (user) {
      setTasks(user.tasks || []);
    }
  }, [user]);

  const handleAddTask = (event) => {
    event.preventDefault(); // Prevent form submission
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { id: tasks.length + 1, description: newTask.trim() }];
      setTasks(updatedTasks);
      dispatch(updateUser({ ...user, tasks: updatedTasks })); // Update Redux store with new tasks
      setNewTask("");
    } else {
      alert("Task cannot be empty!"); // Provide feedback to user
    }
  };

  return (
    <div className="container mt-5">
      <h3>Tasks for {user?.name}</h3>
      <div className="mb-4">
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="form-control"
            placeholder="Add a new task"
          />
          <button type="submit" className="btn btn-success mt-2">Add Task</button>
        </form>
        <Link to={`/view/${user.id}`} className="btn btn-info mt-2">View Employee Details</Link>
      </div>
      <ul className="list-group">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id} className="list-group-item">{task.description}</li>
          ))
        ) : (
          <p>No tasks assigned.</p>
        )}
      </ul>
    </div>
  );
}

export default AssignedTasks;
