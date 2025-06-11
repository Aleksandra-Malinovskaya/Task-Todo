import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from './slices/TaskSlice';
import { setUpdatedTask, resetForm } from './slices/FormSlice';
import { getFormSelector } from './slices/FormSlice';

const EditInput = () => {
  const dispatch = useDispatch();
  const { updatedTask, updatedId } = useSelector(getFormSelector);
  const handleUpdate = () => {
    dispatch(updateTask({ id: updatedId, title: updatedTask }));
    dispatch(resetForm());
  };
  return (
    <div className="input_group">
      <input
        type="text"
        value={updatedTask}
        onChange={(e) => dispatch(setUpdatedTask(e.target.value))}
      />
      <button onClick={handleUpdate} value="Update task">
        Update task
      </button>
    </div>
  );
};

export { EditInput };
