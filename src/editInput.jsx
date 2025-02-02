const Edit_Input = ({updatedTask, getUpdateTask, updateTask}) =>{
    return<>
    <div className='input_group'><input type='text'value={updatedTask} onChange={getUpdateTask}/>
      <button onClick={updateTask}>Update task</button>
      </div>
    </>
}

export default Edit_Input;