import { EditInput } from './EditInput';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskStatus } from './slices/TaskSlice';
import { setUpdatedId, setUpdatedTask } from './slices/FormSlice';

const Task = ({ item, isActivate }) => {
  const dispatch = useDispatch();
  const handleTaskDone = () => dispatch(toggleTaskStatus(item.id));
  const handleEdit = () => {
    dispatch(setUpdatedTask(item.title));
    dispatch(setUpdatedId(item.id));
  };
  const handleDelete = () => dispatch(deleteTask(item.id));
  return (
    <>
      {isActivate ? (
        <EditInput />
      ) : (
        <>
          <p
            style={{
              textDecoration: item.isCompleted ? 'line-through' : 'none',
            }}
            onClick={handleTaskDone}
          >
            {item.title}
          </p>
          <button onClick={handleEdit}>
            <img src="./img/edit.png" alt="Edit" />
          </button>
          <button onClick={handleDelete}>
            <img src="./img/delete.png" alt="Delete" />
          </button>
        </>
      )}
    </>
  );
};

export { Task };
