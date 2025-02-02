import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import List_Todo from './List';
import Edit_Input from './editInput';
import Add_Input from './addInput';

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
        id: uuidv4(),
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
      <Add_Input newTask={newTask} getNewTask={getNewTask} addNewTask={addNewTask}/>
      {update && (<Edit_Input updatedTask={updatedTask} getUpdateTask={getUpdateTask} updateTask={updateTask}/>)}
      </div>
      <List_Todo value={value} TaskDone={TaskDone} editTask={editTask} deleteTask={deleteTask}/>
    </div>
    <a>Log out</a>
    </>
  )
}

export default Todo;
