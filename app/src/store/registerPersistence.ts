import { saveStoredNotes } from "../features/notes/storage/notesStorage";
import { saveStoredTasks } from "../features/tasks/storage/tasksStorage";
import type { AppStore } from "./store";
export function registerStorePersistence(store: AppStore) {
  let previousPersistedNotes = store.getState().notes.items;
  let previousPersistedTasks = store.getState().tasks.items;

  return store.subscribe(() => {
    const currentNotesState = store.getState().notes;
    const currentTasksState = store.getState().tasks;
    if (!currentNotesState.hydrated) {
      return;
    }
    if (currentNotesState.items !== previousPersistedNotes) {
      previousPersistedNotes = currentNotesState.items;
      void saveStoredNotes(currentNotesState.items);
    }

    if (!currentTasksState.hydrated) {
      return;
    }
    if (currentTasksState.items === previousPersistedTasks) {
      return;
    }

    previousPersistedTasks = currentTasksState.items;
    void saveStoredTasks(currentTasksState.items);
  });
}
