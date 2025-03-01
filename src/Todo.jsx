import { useState } from 'react';
import './App.css';
import { TasksList } from './TasksList';
import { EditInput } from './EditInput';
import { AddInput } from './AddInput';

function Todo({ logs }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [update, setUpdate] = useState(false);
  const [updatedIndex, setUpdatedIndex] = useState(-1);
  const [updatedTask, setUpdatedTask] = useState('');

  const getNewTask = (e) => {
    setNewTask(e.target.value);
  };

  const addNewTask = () => {
    setTasks((prevValue) => [
      ...prevValue,
      {
        id: prevValue.length,
        title: newTask,
        isActive: true,
      },
    ]);
    logs('Add task:' + newTask);

    setNewTask('');
  };

  const deleteTask = (todoId) => {
    setTasks((prevValue) => prevValue.filter((item) => item.id !== todoId));
    logs('Delete task with index:' + todoId);
  };

  const getUpdateTask = (e) => {
    setUpdatedTask(e.target.value);
  };

  const editTask = (todoId) => {
    setUpdate((update) => !update);
    setUpdatedTask(tasks.find((item) => item.id == todoId).title);
    setUpdatedIndex(todoId);
  };

  const updateTask = () => {
    setTasks((prevValue) =>
      prevValue.map((item) => {
        if (updatedIndex == item.id) {
          return { ...item, title: updatedTask };
        } else return item;
      })
    );
    logs('Update task to:' + updatedTask);
    setUpdate(false);
    setUpdatedTask('');
    setUpdatedIndex(-1);
  };

  const taskDone = (todoId) => {
    setTasks((prevValue) =>
      prevValue.map((item) =>
        todoId === item.id ? { ...item, isActive: !item.isActive } : item
      )
    );
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
          {update && (
            <EditInput
              updatedTask={updatedTask}
              getUpdateTask={getUpdateTask}
              updateTask={updateTask}
            />
          )}
        </div>
        <TasksList
          value={tasks}
          taskDone={taskDone}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      </div>
      <a>Log out</a>
    </>
  );
}

export { Todo };
