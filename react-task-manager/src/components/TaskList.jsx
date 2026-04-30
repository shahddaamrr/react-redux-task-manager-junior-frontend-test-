import { useSelector } from "react-redux";
import TaskItem from "./TaskItem";

function TaskList() {
  // Get tasks and filter value from Redux
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);

  // Filter tasks by selected priority
  const visibleTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.priority === filter);

  return (
    <div className="task-list-wrapper">
      <p className="section-title">Tasks ({visibleTasks.length})</p>

      {visibleTasks.length === 0 ? (
        <p className="empty-message">No tasks found.</p>
      ) : (
        <div className="task-list">
          {visibleTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
