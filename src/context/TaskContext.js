import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  const addTask = (task) => {
    setTodoList((prevItems) => [...prevItems, task]);
  };

  return (
    <TaskContext.Provider value={{ todoList, addTask, setTodoList }}>
      {children}
    </TaskContext.Provider>
  );
};
