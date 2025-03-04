import { Task } from './Task';

const TasksList = ({
  value,
  taskDone,
  editTask,
  deleteTask,
  updatedIndex,
  updatedTask,
  getUpdateTask,
  updateTask,
}) => {
  return (
    <ul>
      {value.map((item) => (
        <li key={item.id}>
          <Task
            taskDone={taskDone}
            item={item}
            editTask={editTask}
            deleteTask={deleteTask}
            updatedIndex={updatedIndex}
            updatedTask={updatedTask}
            getUpdateTask={getUpdateTask}
            updateTask={updateTask}
          />
        </li>
      ))}
    </ul>
  );
};

export { TasksList };
