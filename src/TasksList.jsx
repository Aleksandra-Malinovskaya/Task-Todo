import { Task } from './Task';
import { useSelector } from 'react-redux';
import { getTasksSelector } from './slices/TaskSlice';
import { getFormSelector } from './slices/FormSlice';

const TasksList = () => {
  const tasks = useSelector(getTasksSelector);
  const { updatedId } = useSelector(getFormSelector);
  return (
    <ul>
      {tasks.map((item) => (
        <li key={item.id}>
          <Task item={item} isActivate={updatedId === item.id} />
        </li>
      ))}
    </ul>
  );
};

export { TasksList };
