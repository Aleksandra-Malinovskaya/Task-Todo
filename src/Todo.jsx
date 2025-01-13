import { useState } from 'react'
import './App.css'

function Todo({logs}) {
  const [value, setValue] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [update, setUpdate] = useState(false);
  const [updatedIndex, setUpdatedIndex] = useState(-1);
  const [updatedTask, setUpdatedTask] = useState('');
  const [completedTask, setCompletedTask] = useState([]);

  const getNewTask = (e) =>{
    setNewTask(e.target.value);
  }

  const addNewTask = () =>{
    setValue((prevValue) =>
      [...prevValue, newTask]
    );
    setCompletedTask((prevValue) =>
      [...prevValue, false]
    );

    logs('Add task:' + newTask);

    setNewTask('');
  }

  const deleteTask = (key) =>{
    setValue((prevValue) =>
      prevValue.filter((item, index) => index !== key)
    );
    setCompletedTask((prevValue) =>
      prevValue.filter((item, index) => index !== key)
    );
    logs('Delete task with index:' + key);
  }

   const getUpdateTask = (e) =>{
    setUpdatedTask(e.target.value)
   }

  const editTask = (key) =>{
    setUpdate(update => !update);
    setUpdatedTask(
      value.filter((item, index) => index == key)
    );
    setUpdatedIndex(key);
  }

  const updateTask = () => {
    setValue((prevValue) =>
      prevValue.map((item, index) =>{
        if(updatedIndex == index){
          return updatedTask;
        }
        else 
         return item;
      })
    );
    logs('Update task to:' + updatedTask);
    setUpdate(false);
    setUpdatedTask('');
    setUpdatedIndex(-1);
  }

  const TaskDone = (key) =>{
    setCompletedTask((prevValue)=>
      prevValue.map((item, index) => (key === index? !item : item ))
    );
  }


  return (
    <>
    <div className='main'>
      <h1>Get things done!</h1>
    <div className='div_input'>
      <div className='input_group'>
      <input type='text'value={newTask} placeholder='What is the task today?'onChange={getNewTask}/>
      <button onClick={addNewTask}>Add task</button>
      </div>
      {update && (
      <div className='input_group'><input type='text'value={updatedTask} onChange={getUpdateTask}/>
      <button onClick={updateTask}>Update task</button>
      </div>
      )}
      </div>
      <ul>
      {value.map((item, index) => 
          <li key={index}><p style={{ textDecoration: completedTask[index] ? 'line-through' : 'none'}} onClick={() => TaskDone(index)}>{item}</p>
          <button onClick={() => editTask(index)}><img src='./img/edit.png' alt='Edit' /></button>
          <button onClick={() => deleteTask(index)}><img src='./img/delete.png' alt='Delete' /></button></li>
        )}
      </ul>
    </div>
    <a>Log out</a>
    </>
  )
}

export default Todo;
