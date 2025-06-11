import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

export const TaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addNewTask: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (newTask) => ({
        payload: {
          id: uuidv4(),
          title: newTask,
          isActive: true,
        },
      }),
    },
    deleteTask: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, title } = action.payload;
      const existTask = state.find((task) => task.id === id);
      if (existTask) {
        existTask.title = title;
      }
    },
    editTask: (state, action) => {
      const task = state.find((item) => item.id === action.payload);
      if (task) {
        task.isActive = !task.isActive;
      }
    },
  },
  selectors: {
    getTasksSelector: (state) => state,
  },
});

export const { addNewTask, deleteTask, updateTask, editTask } =
  TaskSlice.actions;
export const { getTasksSelector } = TaskSlice.selectors;
