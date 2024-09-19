// src/Components/UserReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usersList: [],
  departments: ['HR', 'Engineering', 'Marketing', 'Sales'], // Example departments
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.usersList.push({ ...action.payload, tasks: [], questions: [], attendance: [] });
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const userIndex = state.usersList.findIndex((user) => user.id === updatedUser.id);
      if (userIndex !== -1) {
        state.usersList[userIndex] = updatedUser;  // Directly replace the user object
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      state.usersList = state.usersList.filter((user) => user.id !== id);
    },
    addQuestionToUser: (state, action) => {
      const { id, question } = action.payload;
      const user = state.usersList.find((user) => user.id === id);
      if (user) {
        user.questions.push(question);
      }
    },
    setUsers(state, action) {
      state.usersList = action.payload;
    },
  },
});

export const { addUser, updateUser, deleteUser, addQuestionToUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
