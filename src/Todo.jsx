import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { TasksList } from './TasksList';
import { AddInput } from './AddInput';

function Todo() {
  return (
    <>
      <div className="main">
        <h1>Get things done!</h1>
        <div className="div_input">
          <AddInput />
        </div>
        <TasksList />
      </div>
      <a>Log out</a>
    </>
  );
}

export { Todo };
