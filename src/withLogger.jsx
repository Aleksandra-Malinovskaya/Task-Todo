import { Todo } from './Todo';

const WithLogger = (ComponentWithLogs) => {
  return (props) => {
    const logs = (action) => {
      console.log(action);
    };

    return <ComponentWithLogs {...props} logs={logs} />;
  };
};

const LoggedTodoList = WithLogger(Todo);

export { LoggedTodoList };
