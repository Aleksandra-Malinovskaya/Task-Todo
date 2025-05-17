import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { TasksList } from './TasksList';
import { EditInput } from './EditInput';
import { AddInput } from './AddInput';
import { addNewTask, deleteTask, updateTask, editTask } from './actions/TasksActions';
import { setNewTask, setUpdatedId, setUpdatedTask } from './actions/FormActions';

function Todo({ logs }) {
  const tasks = useSelector(state => state.tasks);
  const {newTask, updatedId, updatedTask} = useSelector(state => state.form)
  const dispatch = useDispatch();
  

  const getNewTask = (e) => {
    dispatch(setNewTask(e.target.value));
  };

  const handleAddNewTask = () => {
    dispatch(addNewTask(newTask));
    dispatch(setNewTask(''));
    logs('Add task:' + newTask);
  };

  const handleDeleteTask = (todoId) => {
    dispatch(deleteTask(todoId))
    logs('Delete task with index:' + todoId);
  };

  const getUpdateTask = (e) => {
    dispatch(setUpdatedTask(e.target.value));
  };

  const handleEditTask = (todoId) => {
    const task = tasks.find(t => t.id === todoId);
    if (task) {
    dispatch(setUpdatedTask(task.title))
    dispatch(setUpdatedId(todoId));
    }
  };

  const handleUpdateTask = () => {
    if (updatedId !== -1) {
      dispatch(updateTask(updatedId, updatedTask));
      logs('Update task to:' + updatedTask);
      dispatch(setUpdatedId(-1));
      dispatch(setUpdatedTask(''));
  }
  };

  const taskDone = (todoId) => {
    dispatch(editTask(todoId));
  };

  return (
    <>
      <div className="main">
        <h1>Get things done!</h1>
        <div className="div_input">
          <AddInput
            newTask={newTask}
            getNewTask={getNewTask}
            addNewTask={handleAddNewTask}
          />
        </div>
        <TasksList
          value={tasks}
          taskDone={taskDone}
          editTask={handleEditTask}
          deleteTask={handleDeleteTask}
          updatedIndex={updatedId}
          updatedTask={updatedTask}
          getUpdateTask={getUpdateTask}
          updateTask={handleUpdateTask}
        />
      </div>
      <a>Log out</a>
    </>
  );
}

export { Todo };
