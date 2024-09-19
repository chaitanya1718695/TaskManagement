import React from 'react';
import { useSelector } from 'react-redux';

function EmpData() {
  const { usersList } = useSelector((state) => state.users);

  return (
    <div className="container mt-5">
      <h3>Employee Data</h3>
      {usersList.map((user) => (
        <div key={user.id} className="mb-4">
          <h4>{user.name}</h4>
          <h5>Assigned Tasks:</h5>
          {user.tasks && user.tasks.length > 0 ? (
            <ul className="list-group">
              {user.tasks.map((task) => (
                <li key={task.id} className="list-group-item">
                  {task.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks assigned.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default EmpData;
