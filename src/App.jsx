import './App.css';
import { Todo } from './Todo';
import { Routes, Route } from 'react-router-dom';
import { RegistrPage } from './RegistrPage';
import { AuthPage } from './AuthPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrPage />} />
      <Route path="/authorization" element={<AuthPage />} />
      <Route path="/todoList" element={<Todo />} />
    </Routes>
  );
}

export default App;
