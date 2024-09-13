function Completed({ task }) {
  if (!task || task.length === 0) {
    return (
      <p className="text-muted fs-5 text-center mt-5">
        No completed tasks available.
      </p>
    );
  }
  return (
    <>
      {task.map((task) => (
        <div key={task.id}>
          <div className="todolist d-flex">
            <h6 className="mx-3">{task.title}</h6>
          </div>
          <div className="tododesc">
            <span className="text">{task.description}....</span>
            <div className="dates d-flex">
              <span className="icon">
                <i className="bi bi-calendar"></i> {task.date}
              </span>{" "}
              .{" "}
              <span className="icon">
                <i className="bi bi-clock"></i>{" "}
                {`${task.time.hours}:${task.time.minutes} ${task.time.period}`}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Completed;
