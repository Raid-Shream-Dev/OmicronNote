import React from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../../i18n";
import { Tasks } from "./types";
import TaskItem from "./taskItem";
import { theme } from "../../Theme/color";
import styles from "./style";

type TaskListProps = {
  taskListItems: Tasks[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onFocusComposer: () => void;
};

export function TaskList({
  taskListItems,
  onToggleTask,
  onDeleteTask,
  onFocusComposer,
}: TaskListProps) {
  const { t, i18n } = useTranslation("tasks");
  const rtl = isRTL(i18n.resolvedLanguage);
  const taskItems = taskListItems.map(function renderTask(item) {
    return (
      <TaskItem
        key={item.id}
        task={item}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
      />
    );
  });
  if (taskListItems.length === 0) {
    return (
      <View style={[styles.emptyState, rtl && styles.emptyStateRtl]}>
        <View style={styles.emptyIcon}>
          <Feather name="clipboard" size={24} color={theme.atractive} />
        </View>
        <Text style={[styles.emptyTitle, rtl ? styles.textRtl : styles.textLtr]}>
          {t("emptyTitle")}
        </Text>
        <Text style={[styles.emptySubtitle, rtl ? styles.textRtl : styles.textLtr]}>
          {t("emptySubtitle")}
        </Text>
        <Pressable onPress={onFocusComposer} style={styles.emptyButton}>
          <Text style={[styles.emptyButtonText, rtl ? styles.textRtl : styles.textLtr]}>
            {t("emptyButton")}
          </Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.listContent}>{taskItems}</View>
  );
}
