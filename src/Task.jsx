import { EditInput } from './EditInput';

const Task = ({
  taskDone,
  item,
  editTask,
  deleteTask,
  updatedIndex,
  updatedTask,
  getUpdateTask,
  updateTask,
}) => {
  return (
    <>
      {updatedIndex == item.id ? (
        <EditInput
          updatedTask={updatedTask}
          getUpdateTask={getUpdateTask}
          updateTask={updateTask}
        />
      ) : (
        <>
          <p
            style={{
              textDecoration: item.isActive ? 'none' : 'line-through',
            }}
            onClick={() => taskDone(item.id)}
          >
            {item.title}
          </p>
          <button onClick={() => editTask(item.id)}>
            <img src="./img/edit.png" alt="Edit" />
          </button>
          <button onClick={() => deleteTask(item.id)}>
            <img src="./img/delete.png" alt="Delete" />
          </button>
        </>
      )}
    </>
  );
};

export { Task };
