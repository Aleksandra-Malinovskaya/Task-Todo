import './App.css';
import { message } from 'antd';
import { useState, useEffect } from 'react';
import { AddInput } from './AddInput';
import { TasksList } from './TasksList';
import { useNavigate } from 'react-router-dom';

function Todo() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [updatedTask, setUpdatedTask] = useState('');
  const [updatedIndex, setUpdatedIndex] = useState(-1);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    getAllTasks();
  }, []);

  const getNewTask = (e) => {
    setNewTask(e.target.value);
  };

  async function getAllTasks() {
    try {
      const response = await fetch(
        'https://todo-redev.herokuapp.com/api/todos',
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed');
      }
      setTasks(result);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function addNewTask() {
    try {
      const response = await fetch(
        'https://todo-redev.herokuapp.com/api/todos',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newTask,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed');
      }
      message.success('Успешно добавлено');
      setNewTask('');
      await getAllTasks();
    } catch (error) {
      console.log(error.message);
    }
  }

  const getUpdateTask = (e) => {
    setUpdatedTask(e.target.value);
  };

  async function updateTask(id) {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: 'PATCH',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: updatedTask,
          }),
        }
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed');
      }
      message.success('Успешно изменено');
      setUpdatedTask('');
      setUpdatedIndex(-1);
      await getAllTasks();
    } catch (error) {
      console.log(error.message);
    }
  }

  const editTask = (id) => {
    setUpdatedTask(tasks.find((item) => item.id == id).title);
    setUpdatedIndex(id);
  };

  async function deleteTask(id) {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}`,
        {
          method: 'DELETE',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed');
      }
      message.success('Успешно удалено');
      await getAllTasks();
    } catch (error) {
      console.log(message.error);
    }
  }

  async function taskDone(id) {
    try {
      const response = await fetch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        {
          method: 'PATCH',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed');
      }
      message.success('Статус изменён');
      await getAllTasks();
    } catch (error) {
      console.log(message.error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/authorization');
  };

  return (
    <>
      <div className="main">
        <h1>Get things done!</h1>
        <div className="div_input">
          <AddInput
            newTask={newTask}
            getNewTask={getNewTask}
            addNewTask={addNewTask}
          />
          <TasksList
            value={tasks}
            taskDone={taskDone}
            editTask={editTask}
            deleteTask={deleteTask}
            updatedIndex={updatedIndex}
            updatedTask={updatedTask}
            getUpdateTask={getUpdateTask}
            updateTask={updateTask}
          />
        </div>
      </div>
      <button className="logOut" onClick={handleLogout}>
        Log out
      </button>
    </>
  );
}

export { Todo };
