import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import Completed from "./Completed";
import Pending from "./Pending";
import Upcoming from "./Upcoming";

function TodoItem() {
  const [isActive, setIsActive] = useState("pending");
  const { todoList } = useContext(TaskContext);

  const renderContent = () => {
    switch (isActive) {
      case "completed":
        return (
          <Completed
            task={
              todoList.length > 0
                ? todoList.filter((task) => task.status === "completed")
                : []
            }
          />
        );
      case "pending":
        return (
          <Pending
            task={
              todoList.length > 0
                ? todoList.filter((task) => task.status === "pending")
                : []
            }
          />
        );
      case "upcoming":
        return (
          <Upcoming
            task={
              todoList.length > 0
                ? todoList.filter((task) => task.status === "upcoming")
                : []
            }
          />
        );
      default:
        break;
    }
  };

  return (
    <div className="col-md-7 mt-3 section bg-white col-lg-7 col-sm-7 text-start">
      <input
        type="button"
        value="Completed"
        className={isActive === "completed" ? "active" : ""}
        onClick={() => setIsActive("completed")}
      />
      <input
        type="button"
        value={`Todo ${todoList.length > 0 ? todoList.length : ""}`}
        className={isActive === "pending" ? "active" : ""}
        onClick={() => setIsActive("pending")}
      />
      <input
        type="button"
        value="UpComing"
        className={isActive === "upcoming" ? "active" : ""}
        onClick={() => setIsActive("upcoming")}
      />
      <hr />
      {renderContent()}
    </div>
  );
}

export default TodoItem;
