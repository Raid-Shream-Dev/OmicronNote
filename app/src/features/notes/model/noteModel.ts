export const NOTE_LABELS = ["Personal", "Work", "Study", "Ideas"] as const;
export const NOTE_FOLDERS = [
  "Inbox",
  "Homework",
  "Workout",
  "Projects",
] as const;
export const NOTE_TYPES = ["text", "checklist"] as const;
export const NOTE_TEXT_STYLES = ["plain", "highlight", "focus"] as const;
export const NOTE_COVER_STYLES = ["sunrise", "ocean", "forest"] as const;
export const NOTE_SORT_OPTIONS = [
  "updated",
  "created",
  "title",
  "type",
] as const;
export type NoteLabel = (typeof NOTE_LABELS)[number];
export type NoteFolder = (typeof NOTE_FOLDERS)[number];
export type NoteType = (typeof NOTE_TYPES)[number];
export type NoteTextStyle = (typeof NOTE_TEXT_STYLES)[number];
export type NoteCoverStyle = (typeof NOTE_COVER_STYLES)[number];
export type NoteSortOption = (typeof NOTE_SORT_OPTIONS)[number];
export type NoteChecklistItem = {
  id: string;
  text: string;
  done: boolean;
};
export type Note = {
  id: string;
  title: string;
  content: string;
  labels: NoteLabel[];
  folder: NoteFolder;
  pinned: boolean;
  locked: boolean;
  noteType: NoteType;
  textStyle: NoteTextStyle;
  coverStyle: NoteCoverStyle;
  checklist: NoteChecklistItem[];
  createdAt: string;
  updatedAt: string;
};
export function createEntityId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
export function createNoteDraft(overrides: Partial<Note> = {}): Note {
  const timestamp = new Date().toISOString();

  return {
    id: createEntityId("note"),
    title: "",
    content: "",
    labels: ["Personal"],
    folder: "Inbox",
    pinned: false,
    locked: false,
    noteType: "text",
    textStyle: "plain",
    coverStyle: "sunrise",
    checklist: [],
    createdAt: timestamp,
    updatedAt: timestamp,
    ...overrides,
  };
}
export function getNotePreview(note: Note, fallbackText = "No preview available yet.") {
  const checklistPreview = note.checklist
    .slice(0, 2)
    .map((item) => `${item.done ? "[x]" : "[ ]"} ${item.text}`)
    .join("  ");

  const rawPreview = note.noteType === "checklist" ? checklistPreview : note.content;

  return rawPreview.trim().slice(0, 120) || fallbackText;
}
