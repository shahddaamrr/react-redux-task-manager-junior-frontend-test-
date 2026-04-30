import { createSlice } from "@reduxjs/toolkit";

// Load saved tasks from localStorage when the app starts
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const initialState = {
  tasks: savedTasks,
  filter: "All",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      // Add a new task with default completed status
      state.tasks.push({
        id: Date.now(),
        title: action.payload.title,
        priority: action.payload.priority,
        completed: false,
      });

      // Save updated tasks
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    deleteTask: (state, action) => {
      // Remove the selected task
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    toggleTask: (state, action) => {
      // Change task status between completed and not completed
      const task = state.tasks.find((task) => task.id === action.payload);

      if (task) {
        task.completed = !task.completed;
      }

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    editTask: (state, action) => {
      // Update task title and priority
      const task = state.tasks.find((task) => task.id === action.payload.id);

      if (task) {
        task.title = action.payload.title;
        task.priority = action.payload.priority;
      }

      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },

    setFilter: (state, action) => {
      // Store the selected priority filter
      state.filter = action.payload;
    },
  },
});

export const { addTask, deleteTask, toggleTask, editTask, setFilter } =
  tasksSlice.actions;

export default tasksSlice.reducer;
