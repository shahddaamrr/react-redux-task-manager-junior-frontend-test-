import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";

function TaskForm() {
  const dispatch = useDispatch();

  // Local state for form inputs
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prevent adding an empty task
    if (title.trim() === "") {
      return;
    }

    // Add task to Redux store
    dispatch(
      addTask({
        title: title,
        priority: priority,
      }),
    );

    // Reset form
    setTitle("");
    setPriority("Medium");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What do you need to do?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <button type="submit" className="primary-btn">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
