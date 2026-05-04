import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Tasks } from "../../../Tasks/Components/types";

const TASKS_STORAGE_KEY = "@omicronnote/tasks";

export async function loadStoredTasks(): Promise<Tasks[] | null> {
  const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

  if (!storedTasks) {
    return null;
  }

  try {
    return JSON.parse(storedTasks) as Tasks[];
  } catch (error) {
    console.error("Failed to parse stored tasks", error);
    return null;
  }
}

export async function saveStoredTasks(tasks: Tasks[]) {
  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}
