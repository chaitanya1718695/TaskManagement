import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    setTasks(state, action) {
      return action.payload;
    },
    addTask(state, action) {
      state.push(action.payload);
    },
    // Add more reducers as needed
  },
});

export const { setTasks, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;