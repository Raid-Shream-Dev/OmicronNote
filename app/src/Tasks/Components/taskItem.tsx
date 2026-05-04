import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { isRTL } from "../../i18n";
import { theme } from "../../Theme/color";
import styles from "./style";
import type { Tasks } from "./types";

type TaskItemProps = {
  task: Tasks;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
};

export default function TaskItem({
  task,
  onToggleTask,
  onDeleteTask,
}: TaskItemProps) {
  const { t, i18n } = useTranslation("tasks");
  const rtl = isRTL(i18n.resolvedLanguage);

  return (
    <View style={[styles.taskCard, rtl && styles.taskCardRtl]}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
        onPress={() => onToggleTask(task.id)}
        style={[
          styles.checkbox,
          task.completed && styles.checkboxCompleted,
        ]}
      >
        {task.completed ? <Feather name="check" size={16} color={theme.surface} /> : null}
      </Pressable>
      <View style={[styles.taskBody, rtl && styles.taskBodyRtl]}>
        <Text
          style={[
            styles.taskTitle,
            task.completed && styles.taskTitleCompleted,
            rtl ? styles.textRtl : styles.textLtr,
          ]}
        >
          {task.title}
        </Text>
        <Text style={[styles.taskStatus, rtl ? styles.textRtl : styles.textLtr]}>
          {task.completed ? t("statusCompleted") : t("statusPending")}
        </Text>
      </View>
      <Pressable
        accessibilityLabel={t("deleteTask", { title: task.title })}
        onPress={() => onDeleteTask(task.id)}
        style={styles.deleteButton}
      >
        <Feather name="trash-2" size={18} color={theme.ink} />
      </Pressable>
    </View>
  );
}
