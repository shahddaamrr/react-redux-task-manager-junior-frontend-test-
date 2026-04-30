import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice";

// Main Redux store for the application
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
