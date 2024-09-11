// src/Components/AssignedTasks.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, updateUser } from './UserReducer';
import "../Components/Css/AssignedTasks.css"

function AssignedTasks() {
  const { userId } = useParams();
  const { usersList } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const user = usersList.find(user => user.id === parseInt(userId));
  
  const [tasks, setTasks] = useState(user?.tasks || []);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (user) {
      setTasks(user.tasks || []);
    }
  }, [user]);

  const handleAddTask = () => {
    if (newTask) {
      const updatedTasks = [...tasks, { id: tasks.length + 1, description: newTask }];
      setTasks(updatedTasks);
      dispatch(updateUser({ ...user, tasks: updatedTasks }));
      setNewTask("");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Tasks for {user?.name}</h3>
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="form-control"
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask} className="btn btn-success mt-2">Add Task</button>
        <Link to={`/view/${user.id}`} className="btn btn-info mt-2">
                   View Employee Details
                  </Link>
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
