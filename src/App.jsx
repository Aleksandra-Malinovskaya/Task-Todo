import './App.css';
import { Todo } from './Todo';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RegistrPage } from './RegistrPage';
import { AuthPage } from './AuthPage';
import { useSelector } from 'react-redux';

function App() {
  const { token } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/todoList" /> : <RegistrPage />}
      />
      <Route
        path="/authorization"
        element={token ? <Navigate to="/todoList" /> : <AuthPage />}
      />
      <Route
        path="/todoList"
        element={token ? <Todo /> : <Navigate to="/authorization" />}
      />
    </Routes>
  );
}

export default App;
