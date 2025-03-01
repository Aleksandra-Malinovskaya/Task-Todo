import { Task } from './Task';

const TasksList = ({ value, taskDone, editTask, deleteTask }) => {
  return (
    <>
      <ul>
        {value.map((item) => (
          <li key={item.id}>
            <Task
              taskDone={taskDone}
              item={item}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export { TasksList };
