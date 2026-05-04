import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { isRTL } from "../../i18n";
import styles from "./style";

type NoteHeaderProps = {
  noteCount: number;
  pinnedCount: number;
  recentCount: number;
};

export function NoteHeader({
  noteCount,
  pinnedCount,
  recentCount,
}: NoteHeaderProps) {
  const { t, i18n } = useTranslation("notes");
  const rtl = isRTL(i18n.resolvedLanguage);
  const noteLabel = t("noteLabel", { count: noteCount });

  return (
    <View style={[styles.headerCard, rtl && styles.headerCardRtl]}>
      <Text
        style={[styles.headerEyebrow, rtl ? styles.textRtl : styles.textLtr]}
      >
        {t("headerEyebrow")}
      </Text>
      <Text style={[styles.headerCount, rtl ? styles.textRtl : styles.textLtr]}>
        {noteCount} {noteLabel}
      </Text>
      <View style={[styles.headerStatRow, rtl && styles.headerStatRowRtl]}>
        <View style={styles.headerStatPill}>
          <Text style={styles.headerStatText}>
            {t("summaryPinned", { count: pinnedCount })}
          </Text>
        </View>
        <View style={styles.headerStatPill}>
          <Text style={styles.headerStatText}>
            {t("summaryRecent", { count: recentCount })}
          </Text>
        </View>
      </View>
    </View>
  );
}
