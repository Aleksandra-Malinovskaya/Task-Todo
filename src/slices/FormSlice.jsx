import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newTask: '',
  updatedId: -1,
  updatedTask: '',
};

export const FormSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setNewTask: (state, action) => {
      state.newTask = action.payload;
    },
    setUpdatedId: (state, action) => {
      state.updatedId = action.payload;
    },
    setUpdatedTask: (state, action) => {
      state.updatedTask = action.payload;
    },
    resetForm: (state) => {
      state.newTask = '';
      state.updatedId = -1;
      state.updatedTask = '';
    },
  },
  selectors: {
    getFormSelector: (state) => state,
  },
});

export const { setNewTask, setUpdatedId, setUpdatedTask, resetForm } =
  FormSlice.actions;
export const { getFormSelector } = FormSlice.selectors;
