import { useDispatch, useSelector } from 'react-redux';
import { setNewTask } from './slices/FormSlice';
import { addNewTask } from './slices/TaskSlice';
import { getFormSelector } from './slices/FormSlice';

const AddInput = () => {
  const dispatch = useDispatch();
  const { newTask } = useSelector(getFormSelector);
  const handleAddTask = () => {
    if (newTask.trim()) {
      dispatch(addNewTask(newTask));
      dispatch(setNewTask(''));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="input_group">
      <input
        type="text"
        value={newTask}
        placeholder="What is the task today?"
        onChange={(e) => dispatch(setNewTask(e.target.value))}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleAddTask}>Add task</button>
    </div>
  );
};

export { AddInput };
