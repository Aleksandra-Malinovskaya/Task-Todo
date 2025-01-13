import './App.css'
import Todo from './Todo'
import withLogger from './withLogger'

function App() {
  
  const LoggedTodoList = withLogger(Todo);

  return (
    <>
      <LoggedTodoList/>
    </>
  )
}

export default App
