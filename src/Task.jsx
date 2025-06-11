import { EditInput } from './EditInput';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from './slices/TaskSlice';
import { setUpdatedId, setUpdatedTask } from './slices/FormSlice';

const Task = ({ item, isActivate }) => {
  const dispatch = useDispatch();
  const handleTaskDone = () => dispatch(editTask(item.id));
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
              textDecoration: item.isActive ? 'none' : 'line-through',
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
