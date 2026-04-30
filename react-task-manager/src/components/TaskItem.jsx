import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, editTask, toggleTask } from "../redux/taskSlice";

function TaskItem({ task }) {
  const dispatch = useDispatch();

  // Used only while editing
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newPriority, setNewPriority] = useState(task.priority);

  const handleSave = () => {
    // Prevent saving empty title
    if (newTitle.trim() === "") {
      return;
    }

    // Update task in Redux
    dispatch(
      editTask({
        id: task.id,
        title: newTitle,
        priority: newPriority,
      })
    );

    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />

          <select
            value={newPriority}
            onChange={(event) => setNewPriority(event.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <div className="task-actions">
            <button onClick={handleSave} className="save-btn">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-info">
            <div className="task-top-row">
              <h3>{task.title}</h3>

              {/* Priority badge */}
              <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
            </div>

            <p>{task.completed ? "Status: Completed" : "Status: In Progress"}</p>
          </div>

          <div className="task-actions">
            <button onClick={() => dispatch(toggleTask(task.id))} className="done-btn">
              {task.completed ? "Undo" : "Done"}
            </button>

            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Edit
            </button>

            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;