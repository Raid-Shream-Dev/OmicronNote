import { ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../i18n";
import { Note } from "../../features/notes/model/noteModel";
import { NoteItem } from "./noteItem";
import styles from "./style";

type NoteListProps = {
  recentNotes: Note[];
  notes: Note[];
  onOpenNote: (id: string) => void;
  onDuplicateNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onTogglePinNote: (id: string) => void;
};

export function NoteList({
  recentNotes,
  notes,
  onOpenNote,
  onDuplicateNote,
  onDeleteNote,
  onTogglePinNote,
}: NoteListProps) {
  const { t, i18n } = useTranslation("notes");
  const rtl = isRTL(i18n.resolvedLanguage);

  return (
    <View>
      <View style={styles.section}>
        <View style={[styles.sectionHeader, rtl && styles.sectionHeaderRtl]}>
          <Text style={[styles.sectionTitle, rtl ? styles.textRtl : styles.textLtr]}>
            {t("recentNotes")}
          </Text>
          <Text style={[styles.sectionMeta, rtl ? styles.textRtl : styles.textLtr]}>
            {t("shownCount", { count: recentNotes.length })}
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recentScrollContent}
        >
          {recentNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onOpenNote={onOpenNote}
              onDuplicateNote={onDuplicateNote}
              onDeleteNote={onDeleteNote}
              onTogglePinNote={onTogglePinNote}
              variant="recent"
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.section}>
        <View style={[styles.sectionHeader, rtl && styles.sectionHeaderRtl]}>
          <Text style={[styles.sectionTitle, rtl ? styles.textRtl : styles.textLtr]}>
            {t("allNotes")}
          </Text>
          <Text style={[styles.sectionMeta, rtl ? styles.textRtl : styles.textLtr]}>
            {t("resultsCount", { count: notes.length })}
          </Text>
        </View>
        {notes.length > 0 ? (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onOpenNote={onOpenNote}
              onDuplicateNote={onDuplicateNote}
              onDeleteNote={onDeleteNote}
              onTogglePinNote={onTogglePinNote}
            />
          ))
        ) : (
          <View style={[styles.emptyState, rtl && styles.emptyStateRtl]}>
            <Text style={[styles.emptyTitle, rtl ? styles.textRtl : styles.textLtr]}>
              {t("emptyTitle")}
            </Text>
            <Text style={[styles.emptySubtitle, rtl ? styles.textRtl : styles.textLtr]}>
              {t("emptySubtitle")}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
