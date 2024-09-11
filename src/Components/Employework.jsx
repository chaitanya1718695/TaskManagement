import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Css/Employework.css';

// TaskForm Component
function TaskForm({ onAddTask }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        onAddTask(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="task-form">
            <label>
                Task Name:
                <input
                    {...register('taskName', { 
                        required: 'Task Name is required',
                        minLength: { value: 3, message: 'Task Name must be at least 3 characters long' } 
                    })}
                />
                {errors.taskName && <span className="error">{errors.taskName.message}</span>}
            </label>
            <label>
                Due Date:
                <input
                    type="date"
                    {...register('dueDate', { required: 'Due Date is required' })}
                />
                {errors.dueDate && <span className="error">{errors.dueDate.message}</span>}
            </label>
            <label>
                Priority:
                <select {...register('priority', { required: 'Priority is required' })}>
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                {errors.priority && <span className="error">{errors.priority.message}</span>}
            </label>
            <label>
                Status:
                <select {...register('status', { required: 'Status is required' })}>
                    <option value="">Select Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </select>
                {errors.status && <span className="error">{errors.status.message}</span>}
            </label>
            <button type="submit" className="submit-button">Add Task</button>
        </form>
    );
}

// Task Details Modal Component
function TaskDetailsModal({ task, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Task Details</h2>
                <p><strong>Task Name:</strong> {task.taskName}</p>
                <p><strong>Due Date:</strong> {task.dueDate}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>
    );
}

// Main Component
function EmployeeWork() {
    const [tasks, setTasks] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dateError, setDateError] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);

    const handleAddTask = (task) => {
        setTasks([...tasks, task]);
    };

    const handleDateChange = (date, type) => {
        if (type === 'start') {
            setStartDate(date);
            if (endDate && date > endDate) {
                setDateError('Start date cannot be after end date');
            } else {
                setDateError('');
            }
        } else {
            setEndDate(date);
            if (startDate && date < startDate) {
                setDateError('End date cannot be before start date');
            } else {
                setDateError('');
            }
        }
    };

    const filteredTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return (!startDate || taskDate >= startDate) && (!endDate || taskDate <= endDate);
    });

    // Data for the pie chart
    const priorityData = [
        { name: 'High Priority', value: filteredTasks.filter(task => task.priority === 'High').length },
        { name: 'Medium Priority', value: filteredTasks.filter(task => task.priority === 'Medium').length },
        { name: 'Low Priority', value: filteredTasks.filter(task => task.priority === 'Low').length },
    ];

    const COLORS = ['#ff5722', '#ffeb3b', '#4caf50'];

    // Data for the attendance graph
    const completedTasks = filteredTasks.filter(task => task.status === 'Completed').length;
    const totalTasks = filteredTasks.length;
    const attendancePercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    
    // Calculate percentages
    const pendingTasks = filteredTasks.filter(task => task.status === 'Pending').length;
    const completedPercentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    const pendingPercentage = totalTasks === 0 ? 0 : (pendingTasks / totalTasks) * 100;

    return (
        <div className="employee-work-container">
            <h1>Employee Task Overview</h1>
            
            <TaskForm onAddTask={handleAddTask} />
            
            <div className="filter-calendar">
                <DatePicker 
                    selected={startDate} 
                    onChange={(date) => handleDateChange(date, 'start')} 
                    selectsStart 
                    startDate={startDate} 
                    endDate={endDate} 
                    placeholderText="Start Date" 
                />
                <DatePicker 
                    selected={endDate} 
                    onChange={(date) => handleDateChange(date, 'end')} 
                    selectsEnd 
                    startDate={startDate} 
                    endDate={endDate} 
                    placeholderText="End Date" 
                />
                {dateError && <div className="date-error">{dateError}</div>}
            </div>

            <div className="task-summary">
                <div className="task-card">
                    <h2>Completed Tasks</h2>
                    <p>{filteredTasks.filter(task => task.status === 'Completed').length}</p>
                </div>
                <div className="task-card">
                    <h2>Pending Tasks</h2>
                    <p>{filteredTasks.filter(task => task.status === 'Pending').length}</p>
                </div>
                <div className="task-card">
                    <h2>Completed Task Percentage</h2>
                    <p>{completedPercentage.toFixed(2)}%</p>
                </div>
                <div className="task-card">
                    <h2>Pending Task Percentage</h2>
                    <p>{pendingPercentage.toFixed(2)}%</p>
                </div>
                <div className="task-card">
                    <h2>Attendance Percentage</h2>
                    <p>{attendancePercentage.toFixed(2)}%</p>
                </div>
            </div>

            <div className="graph-container">
                <div className="graph-item">
                    <h2>Task Priority Overview</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={priorityData}
                                cx="50%"  
                                cy="50%"
                                innerRadius={100}
                                outerRadius={150}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {priorityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="graph-item">
                    <h2>Attendance Overview</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={[{ name: 'Completed', value: completedTasks }, { name: 'Pending', value: totalTasks - completedTasks }]}
                                cx="50%"
                                cy="50%"
                                innerRadius={100}
                                outerRadius={150}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                <Cell key="completed" fill="#4caf50" />
                                <Cell key="pending" fill="#ff5722" />
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="task-list">
                <h2>Pending Tasks</h2>
                <ul>
                    {filteredTasks.filter(task => task.status === 'Pending').map((task, index) => (
                        <li key={index} className="task-item">
                            <div className="task-info" onClick={() => setSelectedTask(task)}>
                                <p>{task.taskName}</p>
                                <p>{task.dueDate}</p>
                                <p>{task.priority}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="task-list">
                <h2>Completed Tasks</h2>
                <ul>
                    {filteredTasks.filter(task => task.status === 'Completed').map((task, index) => (
                        <li key={index} className="task-item">
                            <div className="task-info" onClick={() => setSelectedTask(task)}>
                                <p>{task.taskName}</p>
                                <p>{task.dueDate}</p>
                                <p>{task.priority}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            
            {selectedTask && <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
        </div>
    );
}

export default EmployeeWork;
