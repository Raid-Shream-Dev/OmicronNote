import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import notesReducer from "../features/notes/state/notesSlice";
import tasksReducer from "../features/tasks/state/tasksSlice";
import { registerStorePersistence } from "./registerPersistence";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    notes: notesReducer,
    tasks: tasksReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
registerStorePersistence(store);
