import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderProfile } from "../Landing/header";
import landingStyles from "../Landing/style";
import { BottomNav } from "../Navigation/bottomNav";
import { AddNote } from "../Notes/Components/addNote";
import { NoteHeader } from "../Notes/Components/noteHeader";
import { NoteList } from "../Notes/Components/noteList";
import noteStyles from "../Notes/Components/style";
import {
  NOTE_FOLDERS,
  NOTE_LABELS,
  NOTE_SORT_OPTIONS,
  Note,
  NoteFolder,
  NoteLabel,
  NoteSortOption,
} from "../features/notes/model/noteModel";
import {
  deleteNote,
  duplicateNote,
  togglePinNote,
} from "../features/notes/state/notesSlice";
import { isRTL } from "../i18n";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import screenStyles from "./style";

const profileImage = require("../../../assets/images/icon.png");
type QuickFilter = "all" | "pinned" | "locked" | "checklist";
function getSortLabelKey(sortOption: NoteSortOption) {
  switch (sortOption) {
    case "created":
      return "sortCreated";
    case "title":
      return "sortTitle";
    case "type":
      return "sortType";
    default:
      return "sortUpdated";
  }
}
function getQuickFilterLabelKey(filterOption: QuickFilter) {
  switch (filterOption) {
    case "pinned":
      return "filterPinned";
    case "locked":
      return "filterLocked";
    case "checklist":
      return "filterChecklist";
    default:
      return "filterAll";
  }
}
function getFolderLabelKey(folder: "All" | NoteFolder) {
  switch (folder) {
    case "Inbox":
      return "folderInbox";
    case "Homework":
      return "folderHomework";
    case "Workout":
      return "folderWorkout";
    case "Projects":
      return "folderProjects";
    default:
      return "filterAll";
  }
}
function getLabelKey(label: "All" | NoteLabel) {
  switch (label) {
    case "Personal":
      return "labelPersonal";
    case "Work":
      return "labelWork";
    case "Study":
      return "labelStudy";
    case "Ideas":
      return "labelIdeas";
    default:
      return "filterAll";
  }
}
function sortNotes(notes: Note[], sortOption: NoteSortOption) {
  return [...notes].sort((left, right) => {
    if (left.pinned !== right.pinned) {
      return left.pinned ? -1 : 1;
    }

    switch (sortOption) {
      case "created":
        return right.createdAt.localeCompare(left.createdAt);
      case "title":
        return left.title.localeCompare(right.title);
      case "type":
        return left.noteType.localeCompare(right.noteType);
      default:
        return right.updatedAt.localeCompare(left.updatedAt);
    }
  });
}

export function NotesScreen() {
  const { t, i18n } = useTranslation(["landing", "notes"]);
  const rtl = isRTL(i18n.resolvedLanguage);
  const notes = useAppSelector((state) => state.notes.items);
  const dispatch = useAppDispatch();
  const [query, setQuery] = useState("");
  const [activeLabel, setActiveLabel] = useState<"All" | NoteLabel>("All");
  const [activeFolder, setActiveFolder] = useState<"All" | NoteFolder>("All");
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [sortOption, setSortOption] = useState<NoteSortOption>("updated");
  const searchInputRef = useRef<TextInput>(null);
  const recentNotes = [...notes]
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .slice(0, 3);
  const filteredNotes = notes.filter((note) => {
    const normalizedQuery = query.trim().toLowerCase();

    const matchesQuery =
      normalizedQuery.length === 0 ||
      note.title.toLowerCase().includes(normalizedQuery) ||
      note.content.toLowerCase().includes(normalizedQuery) ||
      note.checklist.some((item) =>
        item.text.toLowerCase().includes(normalizedQuery),
      );

    const matchesLabel =
      activeLabel === "All" || note.labels.includes(activeLabel);
    const matchesFolder =
      activeFolder === "All" || note.folder === activeFolder;

    const matchesQuickFilter =
      quickFilter === "all" ||
      (quickFilter === "pinned" && note.pinned) ||
      (quickFilter === "locked" && note.locked) ||
      (quickFilter === "checklist" && note.noteType === "checklist");

    return matchesQuery && matchesLabel && matchesFolder && matchesQuickFilter;
  });
  const sortedNotes = sortNotes(filteredNotes, sortOption);
  const pinnedCount = notes.filter((note) => note.pinned).length;

  function handleCreateNote() {
    router.push("/note-details");
  }

  function handleOpenNote(noteId: string) {
    router.push(`/note-details?noteId=${noteId}`);
  }

  function handleDuplicateNote(noteId: string) {
    dispatch(duplicateNote(noteId));
  }

  function handleDeleteNote(noteId: string) {
    dispatch(deleteNote(noteId));
  }

  function handleTogglePinNote(noteId: string) {
    dispatch(togglePinNote(noteId));
  }

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={landingStyles.safeArea}>
        <View style={landingStyles.phoneShell}>
          <View style={screenStyles.screenBody}>
            <ScrollView
              contentContainerStyle={landingStyles.content}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <HeaderProfile
                name={t("profileName")}
                profileImage={profileImage}
                resumeRoute="/notes"
              />
              <View
                style={[
                  noteStyles.screenIntro,
                  rtl && noteStyles.screenIntroRtl,
                ]}
              >
                <Text
                  style={[
                    noteStyles.screenEyebrow,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  {t("notes:introEyebrow")}
                </Text>
                <Text
                  style={[
                    noteStyles.screenDescription,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  {t("notes:introDescription")}
                </Text>
              </View>
              <View style={landingStyles.previewPanel}>
                <NoteHeader
                  noteCount={notes.length}
                  pinnedCount={pinnedCount}
                  recentCount={recentNotes.length}
                />

                <AddNote
                  query={query}
                  onChangeQuery={setQuery}
                  onCreateNote={handleCreateNote}
                  onClearSearch={() => setQuery("")}
                  inputRef={searchInputRef}
                />

                <View style={noteStyles.controlsCard}>
                  <View style={noteStyles.controlsGroup}>
                    <Text
                      style={[
                        noteStyles.controlsLabel,
                        rtl ? noteStyles.textRtl : noteStyles.textLtr,
                      ]}
                    >
                      {t("notes:quickFilters")}
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={noteStyles.chipsScrollContent}
                    >
                      {(["all", "pinned", "locked", "checklist"] as QuickFilter[]).map(
                        (filterOption) => (
                          <Pressable
                            key={filterOption}
                            onPress={() => setQuickFilter(filterOption)}
                            style={[
                              noteStyles.chip,
                              quickFilter === filterOption && noteStyles.chipActive,
                            ]}
                          >
                            <Text
                              style={[
                                noteStyles.chipText,
                                quickFilter === filterOption &&
                                  noteStyles.chipTextActive,
                              ]}
                            >
                              {t(`notes:${getQuickFilterLabelKey(filterOption)}`)}
                            </Text>
                          </Pressable>
                        ),
                      )}
                    </ScrollView>
                  </View>

                  <View style={noteStyles.controlsGroup}>
                    <Text
                      style={[
                        noteStyles.controlsLabel,
                        rtl ? noteStyles.textRtl : noteStyles.textLtr,
                      ]}
                    >
                      {t("notes:sortNotes")}
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={noteStyles.chipsScrollContent}
                    >
                      {NOTE_SORT_OPTIONS.map((option) => (
                        <Pressable
                          key={option}
                          onPress={() => setSortOption(option)}
                          style={[
                            noteStyles.chip,
                            sortOption === option && noteStyles.chipActive,
                          ]}
                        >
                          <Text
                            style={[
                              noteStyles.chipText,
                              sortOption === option && noteStyles.chipTextActive,
                            ]}
                          >
                            {t(`notes:${getSortLabelKey(option)}`)}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={noteStyles.controlsGroup}>
                    <Text
                      style={[
                        noteStyles.controlsLabel,
                        rtl ? noteStyles.textRtl : noteStyles.textLtr,
                      ]}
                    >
                      {t("notes:labelsTitle")}
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={noteStyles.chipsScrollContent}
                    >
                      {(["All", ...NOTE_LABELS] as const).map((labelOption) => (
                        <Pressable
                          key={labelOption}
                          onPress={() => setActiveLabel(labelOption)}
                          style={[
                            noteStyles.chip,
                            activeLabel === labelOption && noteStyles.chipActive,
                          ]}
                        >
                          <Text
                            style={[
                              noteStyles.chipText,
                              activeLabel === labelOption && noteStyles.chipTextActive,
                            ]}
                          >
                            {t(`notes:${getLabelKey(labelOption)}`)}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>

                  <View
                    style={[
                      noteStyles.controlsGroup,
                      noteStyles.controlsGroupLast,
                    ]}
                  >
                    <Text
                      style={[
                        noteStyles.controlsLabel,
                        rtl ? noteStyles.textRtl : noteStyles.textLtr,
                      ]}
                    >
                      {t("notes:foldersTitle")}
                    </Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={noteStyles.chipsScrollContent}
                    >
                      {(["All", ...NOTE_FOLDERS] as const).map((folderOption) => (
                        <Pressable
                          key={folderOption}
                          onPress={() => setActiveFolder(folderOption)}
                          style={[
                            noteStyles.chip,
                            activeFolder === folderOption && noteStyles.chipActive,
                          ]}
                        >
                          <Text
                            style={[
                              noteStyles.chipText,
                              activeFolder === folderOption && noteStyles.chipTextActive,
                            ]}
                          >
                            {t(`notes:${getFolderLabelKey(folderOption)}`)}
                          </Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                </View>

                <NoteList
                  recentNotes={recentNotes}
                  notes={sortedNotes}
                  onOpenNote={handleOpenNote}
                  onDuplicateNote={handleDuplicateNote}
                  onDeleteNote={handleDeleteNote}
                  onTogglePinNote={handleTogglePinNote}
                />
              </View>
            </ScrollView>
            <BottomNav />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
