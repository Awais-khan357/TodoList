import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";

function AddTask({ todoList }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("0:0");
  const [id, setId] = useState(0);

  const { addTask } = useContext(TaskContext);

  const handleCancel = (e) => {
    setTitle("");
    setDescription("");
    setDate("");
    setTime("0:0");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setId((prevId) => prevId + 1);
    const now = new Date();

    const userDate = new Date(date);

    let userTime;
    if (time === "0:0") {
      userTime = {
        hours: now.getHours(),
        minutes: now.getMinutes(),
        period: now.getHours() >= 12 ? "PM" : "AM",
      };
    } else {
      userTime = timeConvert(time);
    }

    userDate.setHours(
      userTime.period === "PM" && userTime.hours !== 12
        ? userTime.hours + 12
        : userTime.hours,
      userTime.minutes
    );

    const diffTime = userDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let taskStatus;
    if (diffDays < 0) {
      taskStatus = "overdue";
    } else if (diffDays === 0) {
      taskStatus = "pending";
    } else if (diffDays === 1) {
      taskStatus = "pending";
    } else if (diffDays <= 7) {
      taskStatus = "upcoming";
    } else {
      taskStatus = "pending";
    }

    const newItem = {
      id: id,
      title: title,
      description: description,
      date: date,
      time: userTime,
      status: taskStatus,
    };

    console.log(newItem);
    addTask(newItem);

    setTitle("");
    setDescription("");
    setDate("");
    setTime("0:0");
  };

  function timeConvert(time) {
    if (!time) return;
    let [hours, minutes] = time.split(":");

    let period = "AM";

    hours = parseInt(hours);

    if (hours > 12) {
      period = "PM";
      if (hours > 12) hours -= 12;
    }

    if (hours === 0) {
      hours = 12;
    }

    minutes = minutes.padStart(2, "0");

    return {
      hours: hours,
      minutes: minutes,
      period: period,
    };
  }

  return (
    <div className="col-md-8 task-add bg-white text-start">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            value={title}
            placeholder="Task name here...."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-desc"
            placeholder="Description..."
            value={description}
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3 text-start">
            <input
              type="text"
              value={date}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              placeholder="Due Date"
              className="date"
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              onFocus={(e) => (e.target.type = "time")}
              onBlur={(e) => (e.target.type = "text")}
              placeholder="Time"
              value={time}
              className="date"
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="col-md-6 text-end">
            <button type="button" onClick={handleCancel} className="btns">
              Cancel
            </button>
            <button type="submit" className="btns1 mx-3">
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
