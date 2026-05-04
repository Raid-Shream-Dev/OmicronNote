import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Note } from "../model/noteModel";
const NOTES_STORAGE_KEY = "@omicronnote/notes";
export async function loadStoredNotes(): Promise<Note[] | null> {
  const storedNotes = await AsyncStorage.getItem(NOTES_STORAGE_KEY);

  if (!storedNotes) {
    return null;
  }

  try {
    return JSON.parse(storedNotes) as Note[];
  } catch (error) {
    console.error("Failed to parse stored notes", error);
    return null;
  }
}
export async function saveStoredNotes(notes: Note[]) {
  await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}
