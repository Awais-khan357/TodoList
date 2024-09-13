import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import TodoItem from "./components/TodoItem";
import AddTask from "./components/AddTask";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center">
          <TaskProvider>
            <TodoItem />
            <AddTask />
          </TaskProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
