// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import UserReducer from './Components/UserReducer';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import tasksReducer from './Login/Userslice';


// Configure the Redux store
const store = configureStore({ 
  reducer: {
    users: UserReducer,
    tasks: tasksReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> {/* Ensure Provider is here with store passed */}
      <App />
    </Provider>
  </React.StrictMode>
);
