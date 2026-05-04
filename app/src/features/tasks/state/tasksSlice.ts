import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Tasks } from "../../../Tasks/Components/types";

type TasksState = {
  items: Tasks[];
  hydrated: boolean;
};

function createTask(title: string): Tasks {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    completed: false,
  };
}

const sampleTasks: Tasks[] = [
  createTask("Review meeting notes"),
  createTask("Plan the next design pass"),
];

const initialState: TasksState = {
  items: sampleTasks,
  hydrated: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    hydrateTasks: (state, action: PayloadAction<Tasks[] | null>) => {
      state.items =
        action.payload && action.payload.length > 0 ? action.payload : sampleTasks;
      state.hydrated = true;
    },
    addTask: (state, action: PayloadAction<string>) => {
      state.items.unshift(createTask(action.payload));
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task,
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
  },
});

export const { hydrateTasks, addTask, toggleTask, deleteTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
