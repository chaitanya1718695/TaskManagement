import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { updateUser } from './UserReducer'; // Import the updateUser action

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function View() {
  const { id } = useParams();
  const { usersList } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const user = usersList.find(user => user.id === parseInt(id));

  if (!user) return <div>User not found</div>;

  // Separate completed and pending tasks
  const completedTasks = user.tasks.filter(task => task.completed);
  const pendingTasks = user.tasks.filter(task => !task.completed);

  // Calculate attendance percentage based on completed tasks
  const attendancePercentage = ((completedTasks.length / user.tasks.length) * 100).toFixed(2);

  // Graph data for task statistics
  const data = {
    labels: ['Completed Tasks', 'Pending Tasks'],
    datasets: [
      {
        label: 'Tasks',
        data: [completedTasks.length, pendingTasks.length],
        backgroundColor: ['#28a745', '#ffc107'],
        borderColor: ['#19692c', '#b38400'],
        borderWidth: 1,
      },
    ],
  };

  // Function to toggle task status
  const toggleTaskStatus = (taskId) => {
    const updatedTasks = user.tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    dispatch(updateUser({ ...user, tasks: updatedTasks }));
  };

  return (
    <div className="view-container mt-5">
      <h2>Employee Record</h2>
      <div className="user-details card">
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text"><strong>Email:</strong> {user.email}</p>
          <p className="card-text"><strong>Role:</strong> {user.role}</p>
          <p className="card-text"><strong>Registration Date:</strong> {user.registrationDate}</p>
          <p className="card-text"><strong>Status:</strong> {user.status}</p>
          <p className="card-text"><strong>Department:</strong> {user.department}</p>

          {/* Attendance Section */}
          <h5 className="mt-4">Attendance</h5>
          <p className="card-text"><strong>Attendance Rate:</strong> {attendancePercentage}%</p>

          {/* Graph Section */}
          <div className="charts-container">
            <h5>Task Statistics</h5>
            <div className="chart">
              <Bar data={data} />
            </div>
          </div>

          {/* Completed Tasks Section */}
          <h5 className="mt-4">Completed Tasks</h5>
          <ul className="task-list">
            {completedTasks.length > 0 ? (
              completedTasks.map(task => (
                <li key={task.id} className="task-item completed">
                  {task.description}
                  <button 
                    className="btn btn-warning btn-sm ml-2" 
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    Mark as Pending
                  </button>
                </li>
              ))
            ) : (
              <p>No completed tasks.</p>
            )}
          </ul>

          {/* Pending Tasks Section */}
          <h5 className="mt-4">Pending Tasks</h5>
          <ul className="task-list">
            {pendingTasks.length > 0 ? (
              pendingTasks.map(task => (
                <li key={task.id} className="task-item pending">
                  {task.description}
                  <button 
                    className="btn btn-success btn-sm ml-2" 
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    Mark as Completed
                  </button>
                </li>
              ))
            ) : (
              <p>No pending tasks.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default View;
