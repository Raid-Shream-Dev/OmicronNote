import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../i18n";
import { getNotePreview, Note } from "../../features/notes/model/noteModel";
import { theme } from "../../Theme/color";
import styles from "./style";

type NoteItemProps = {
  note: Note;
  onOpenNote: (id: string) => void;
  onDuplicateNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onTogglePinNote: (id: string) => void;
  variant?: "recent" | "default";
};

const folderTranslationKey = {
  Inbox: "folderInbox",
  Homework: "folderHomework",
  Workout: "folderWorkout",
  Projects: "folderProjects",
} as const;

const labelTranslationKey = {
  Personal: "labelPersonal",
  Work: "labelWork",
  Study: "labelStudy",
  Ideas: "labelIdeas",
} as const;

const typeTranslationKey = {
  text: "typeText",
  checklist: "typeChecklist",
} as const;

const coverStyles = {
  sunrise: { backgroundColor: theme.atractive, emoji: "\uD83C\uDF24" },
  ocean: { backgroundColor: theme.primary, emoji: "\uD83C\uDF0A" },
  forest: { backgroundColor: theme.panel, emoji: "\uD83C\uDF3F" },
} as const;

export function NoteItem({
  note,
  onOpenNote,
  onDuplicateNote,
  onDeleteNote,
  onTogglePinNote,
  variant = "default",
}: NoteItemProps) {
  const { t, i18n } = useTranslation("notes");
  const rtl = isRTL(i18n.resolvedLanguage);
  const coverStyle = coverStyles[note.coverStyle];
  const updatedLabel = new Date(note.updatedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <Pressable
      onPress={() => onOpenNote(note.id)}
      style={[
        styles.noteCard,
        note.pinned && styles.noteCardPinned,
        variant === "recent" && styles.recentCard,
      ]}
    >
      <View style={[styles.noteTopRow, rtl && styles.noteTopRowRtl]}>
        <View
          style={[styles.coverCard, { backgroundColor: coverStyle.backgroundColor }]}
        >
          <Text style={styles.coverEmoji}>{coverStyle.emoji}</Text>
        </View>
        <View style={[styles.noteMain, rtl && styles.noteMainRtl]}>
          <Text
            numberOfLines={1}
            style={[
              styles.noteTitle,
              note.textStyle === "highlight" && styles.noteTitleHighlight,
              note.textStyle === "focus" && styles.noteTitleFocus,
              rtl ? styles.textRtl : styles.textLtr,
            ]}
          >
            {note.title || t("untitledNote")}
          </Text>
          <Text
            numberOfLines={3}
            style={[styles.notePreview, rtl ? styles.textRtl : styles.textLtr]}
          >
            {getNotePreview(note, t("previewFallback"))}
          </Text>
        </View>
        <View style={[styles.noteActions, styles.noteActionsVertical]}>
          <Pressable
            onPress={() => onTogglePinNote(note.id)}
            style={styles.iconButton}
          >
            <Feather
              name="bookmark"
              size={16}
              color={note.pinned ? theme.atractive : theme.inkMuted}
            />
          </Pressable>
          <Pressable
            onPress={() => onDuplicateNote(note.id)}
            style={styles.iconButton}
          >
            <Feather name="copy" size={16} color={theme.inkMuted} />
          </Pressable>
          <Pressable
            onPress={() => onDeleteNote(note.id)}
            style={styles.iconButton}
          >
            <Feather name="trash-2" size={16} color={theme.danger} />
          </Pressable>
        </View>
      </View>
      <View style={[styles.noteMetaRow, rtl && styles.noteMetaRowRtl]}>
        <View style={styles.metaBadge}>
          <Text style={styles.metaBadgeText}>{t(folderTranslationKey[note.folder])}</Text>
        </View>
        <View style={styles.metaBadge}>
          <Text style={styles.metaBadgeText}>{t(typeTranslationKey[note.noteType])}</Text>
        </View>
        {note.locked ? (
          <View style={styles.metaBadge}>
            <Text style={styles.metaBadgeText}>{t("lockedBadge")}</Text>
          </View>
        ) : null}
        <View style={styles.metaBadge}>
          <Text style={styles.metaBadgeText}>
            {t("updatedOn", { date: updatedLabel })}
          </Text>
        </View>
      </View>
      <View style={[styles.labelRow, rtl && styles.labelRowRtl]}>
        {note.labels.map((label) => (
          <View key={label} style={styles.labelBadge}>
            <Text style={styles.labelBadgeText}>{t(labelTranslationKey[label])}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}
