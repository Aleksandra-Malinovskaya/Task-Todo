import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import { taskSlice } from './slices/TaskSlice';
import { FormSlice } from './slices/FormSlice';
import { authSlice } from './slices/AuthSlice';

const store = configureStore({
  reducer: {
    tasks: taskSlice.reducer,
    forms: FormSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export { store };
