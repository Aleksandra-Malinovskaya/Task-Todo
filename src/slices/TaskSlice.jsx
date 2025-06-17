import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'https://todo-redev.herokuapp.com/api/todos',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        return rejectWithValue(result.message || 'Ошибка получения задач');
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (title, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'https://todo-redev.herokuapp.com/api/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        return rejectWithValue(result.message || 'Ошибка добавления задачи');
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        return rejectWithValue(result.message || 'Ошибка удаления задачи');
      }
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, title }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        return rejectWithValue(result.message || 'Ошибка обновления задачи');
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleTaskStatus = createAsyncThunk(
  'tasks/toggleStatus',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (!response.ok) {
        return rejectWithValue(
          result.message || 'Ошибка изменения статуса задачи'
        );
      }

      const updatedTask = Array.isArray(result) ? result[0] : result;
      return { id, updatedTask };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  tasks: [],
  status: null,
  error: null,
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
        state.error = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(toggleTaskStatus.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, updatedTask } = action.payload;
        const index = state.tasks.findIndex((task) => task.id === id);
        if (index !== -1) {
          state.tasks[index] = {
            ...state.tasks[index],
            ...updatedTask,
            isCompleted:
              updatedTask.isCompleted !== undefined
                ? updatedTask.isCompleted
                : !state.tasks[index].isCompleted,
          };
        }
      })
      .addCase(toggleTaskStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
  selectors: {
    getTasksSelector: (state) => state.tasks,
  },
});

export const { getTasksSelector } = taskSlice.selectors;
