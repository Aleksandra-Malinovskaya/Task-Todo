import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { routerConfig } from './routerConfig';

function App() {
  const { token } = useSelector((state) => state.auth);
  const routes = routerConfig(token);

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {routes.map((route, index)=>(
        <Route
        key={index}
        path={route.path}
        element={route.element}
      />
      ))}
    </Routes>
    </Suspense>
  );
}

export default App;
