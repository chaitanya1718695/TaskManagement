import React from 'react';
import { useSelector } from 'react-redux';

function Task() {
  const usersList = useSelector((state) => state.users.usersList); // Access users from Redux

  // Extract all tasks from all users
  const allTasks = usersList.flatMap((user) => user.tasks || []);

  // Extract all questions from users
  const allQuestions = usersList.flatMap((user) => user.questions || []);

  return (
    <div>
      <h3>Assigned Tasks</h3>
      {allTasks.length > 0 ? (
        <ul>
          {allTasks.map((task) => (
            <li key={task.id}>{task.description}</li>
          ))}
        </ul>
      ) : (
        <p>No tasks available.</p>
      )}

      <h3>User Questions</h3>
      {allQuestions.length > 0 ? (
        <ul>
          {allQuestions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
}

export default Task;
