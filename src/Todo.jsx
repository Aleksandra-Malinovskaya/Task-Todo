import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import { TasksList } from './TasksList';
import { AddInput } from './AddInput';
import { logout } from './slices/AuthSlice';
import { fetchTasks } from './slices/TaskSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from './routes';

function Todo() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(fetchTasks());
    }
  }, [dispatch, token]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate(ROUTES.AUTH);
  };

  return (
    <>
      <div className="main">
        <h1>Get things done!</h1>
        <div className="div_input">
          <AddInput />
        </div>
        <TasksList />
      </div>
      <button onClick={handleLogout}>Log out</button>
    </>
  );
}

export { Todo };
