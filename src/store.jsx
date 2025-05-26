import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import TaskSlice from './slices/TaskSlice';
import FormSlice from './slices/FormSlice';

const store = configureStore({
  reducer: {
    tasks: TaskSlice,
    forms: FormSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export { store };
