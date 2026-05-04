import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../i18n";
import styles from "./style";

type TaskHeaderProps = {
  taskCount: number;
  completedCount: number;
};

export function TaskHeader({ taskCount, completedCount }: TaskHeaderProps) {
  const { t, i18n } = useTranslation("tasks");
  const rtl = isRTL(i18n.resolvedLanguage);
  const taskLabel = t("taskLabel", { count: taskCount });
  const remainingCount = taskCount - completedCount;

  return (
    <View style={[styles.taskHeader, rtl && styles.taskHeaderRtl]}>
      <Text style={[styles.sectionEyebrow, rtl ? styles.textRtl : styles.textLtr]}>
        {t("today")}
      </Text>
      <Text style={[styles.screenTitle, rtl ? styles.textRtl : styles.textLtr]}>
        {t("taskBoard")}
      </Text>
      <Text style={[styles.taskMeta, rtl ? styles.textRtl : styles.textLtr]}>
        {taskCount} {taskLabel}
      </Text>
      <Text style={[styles.taskHint, rtl ? styles.textRtl : styles.textLtr]}>
        {t("taskSummary", {
          completed: completedCount,
          remaining: remainingCount,
        })}
      </Text>
      <View style={[styles.taskStatRow, rtl && styles.taskStatRowRtl]}>
        <View style={styles.taskStatPill}>
          <Text style={styles.taskStatText}>
            {t("summaryDone", { count: completedCount })}
          </Text>
        </View>
        <View style={styles.taskStatPill}>
          <Text style={styles.taskStatText}>
            {t("summaryLeft", { count: remainingCount })}
          </Text>
        </View>
      </View>
    </View>
  );
}
