// src/reducers/UserReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersList: [],
  departments: ["HR", "Engineering", "Marketing", "Sales"], // Example departments
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.usersList.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, name, email, role, registrationDate, status, department, tasks, attendance } = action.payload;
      const user = state.usersList.find((user) => user.id === id);
      if (user) {
        user.name = name;
        user.email = email;
        user.role = role;
        user.registrationDate = registrationDate;
        user.status = status;
        user.department = department;
        user.tasks = tasks; // Update tasks
        user.attendance = attendance; // Update attendance
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      state.usersList = state.usersList.filter((user) => user.id !== id);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
