import { useState } from 'react'
import './App.css'

function Todo({logs}) {
  const [value, setValue] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [update, setUpdate] = useState(false);
  const [updatedIndex, setUpdatedIndex] = useState(-1);
  const [updatedTask, setUpdatedTask] = useState('');

  const getNewTask = (e) =>{
    setNewTask(e.target.value);
  }

  const addNewTask = () =>{
    setValue((prevValue) =>[
      ...prevValue,
      {
        id: newTask + "id",
        title: newTask,
        isActive: true,
      },
    ]);
    logs('Add task:' + newTask);

    setNewTask('');
  }

  const deleteTask = (key) =>{
    setValue((prevValue) =>
      prevValue.filter((item) => item.id !== key)
    );
    logs('Delete task with index:' + key);
  }

   const getUpdateTask = (e) =>{
    setUpdatedTask(e.target.value)
   }

  const editTask = (key) =>{
    setUpdate(update => !update);
    setUpdatedTask(
      value.find((item) => item.id == key).title
    );
    setUpdatedIndex(key);
  }

  const updateTask = () => {
    setValue((prevValue) =>
      prevValue.map((item) =>{
        if(updatedIndex == item.id){
          return {...item,
            title: updatedTask,}
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
    setValue((prevValue)=>
      prevValue.map((item) => (key === item.id? {...item,
        isActive: !item.isActive,} : item ))
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
      {value.map((item) => 
          <li key={item.id}><p style={{ textDecoration: item.isActive ?'none': 'line-through'}} onClick={() => TaskDone(item.id)}>{item.title}</p>
          <button onClick={() => editTask(item.id)}><img src='./img/edit.png' alt='Edit' /></button>
          <button onClick={() => deleteTask(item.id)}><img src='./img/delete.png' alt='Delete' /></button></li>
        )}
      </ul>
    </div>
    <a>Log out</a>
    </>
  )
}

export default Todo;
