const List_Todo = ({value, TaskDone, editTask, deleteTask}) =>{
    return<>
    <ul>
      {value.map((item) => 
          <li key={item.id}><p style={{ textDecoration: item.isActive ?'none': 'line-through'}} onClick={() => TaskDone(item.id)}>{item.title}</p>
          <button onClick={() => editTask(item.id)}><img src='./img/edit.png' alt='Edit' /></button>
          <button onClick={() => deleteTask(item.id)}><img src='./img/delete.png' alt='Delete' /></button></li>
        )}
      </ul>
    </>
}

export default List_Todo;