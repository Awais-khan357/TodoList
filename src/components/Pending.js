import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

function Pending({ task }) {
  const { setTodoList } = useContext(TaskContext);

  const handleStatus = (id) => {
    setTodoList((prevList) =>
      prevList.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
              time: task.time,
            }
          : task
      )
    );
  };

  if (!task || task.length === 0) {
    return (
      <p className="text-muted fs-5 text-center mt-5">
        No Pending tasks available.
      </p>
    );
  }

  console.log(task);

  return (
    <>
      {task.map((task) => (
        <div key={task.id}>
          <div className="todolist d-flex">
            <input
              className="form-check-input"
              onClick={() => handleStatus(task.id)}
              type="radio"
              value=""
            />
            <h6 className="mx-3">{task.title}</h6>
          </div>
          <div className="tododesc mb-4">
            <span className="text">{task.description}....</span>
            <div className="dates d-flex">
              <span className="icon">
                <i className="bi bi-calendar"></i> &nbsp;{task.date}
              </span>{" "}
              .{" "}
              <span className="icon">
                <i className="bi bi-clock"></i> &nbsp;
                {`${task.time.hours}:${task.time.minutes} ${task.time.period}`}
              </span>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </>
  );
}

export default Pending;
