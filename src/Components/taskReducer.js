// src/Components/UserReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  taskList: [],
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.taskList.push({ ...action.payload, tasks: [], questions: [], attendance: [] });
    },
  },
});

export const { addUser, updateUser, deleteUser, addQuestionToUser, setUsers } = userSlice.actions;
export default userSlice.reducer;
