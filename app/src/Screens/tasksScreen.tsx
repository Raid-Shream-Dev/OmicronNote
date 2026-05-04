import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addTask,
  deleteTask,
  toggleTask,
} from "../features/tasks/state/tasksSlice";
import { isRTL } from "../i18n";
import { HeaderProfile } from "../Landing/header";
import landingStyles from "../Landing/style";
import { BottomNav } from "../Navigation/bottomNav";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { AddTask } from "../Tasks/Components/AddTask";
import styles from "../Tasks/Components/style";
import { TaskHeader } from "../Tasks/Components/taskHeader";
import { TaskList } from "../Tasks/Components/taskList";
import screenStyles from "./style";

const profileImage = require("../../../assets/images/icon.png");

export function TasksScreen() {
  const { t, i18n } = useTranslation(["landing", "tasks"]);
  const rtl = isRTL(i18n.resolvedLanguage);
  const [taskTitle, setTaskTitle] = useState("");
  const inputRef = useRef<TextInput>(null);
  const tasks = useAppSelector((state) => state.tasks.items);
  const dispatch = useAppDispatch();
  const completedCount = tasks.filter((task) => task.completed).length;

  function handleAddTask() {
    const trimmedTaskTitle = taskTitle.trim();
    if (!trimmedTaskTitle) {
      return;
    }
    dispatch(addTask(trimmedTaskTitle));
    setTaskTitle("");
  }

  function handleToggleTask(id: string) {
    dispatch(toggleTask(id));
  }

  function handleDeleteTask(id: string) {
    dispatch(deleteTask(id));
  }

  function handleFocusComposer() {
    inputRef.current?.focus();
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
                resumeRoute="/tasks"
              />
              <View style={[styles.screenIntro, rtl && styles.screenIntroRtl]}>
                <Text
                  style={[
                    styles.screenEyebrow,
                    rtl ? landingStyles.textRtl : landingStyles.textLtr,
                  ]}
                >
                  {t("tasks:introEyebrow")}
                </Text>
              </View>
              <View style={landingStyles.previewPanel}>
                <TaskHeader
                  taskCount={tasks.length}
                  completedCount={completedCount}
                />
                <AddTask
                  value={taskTitle}
                  onChangeText={setTaskTitle}
                  onAddTask={handleAddTask}
                  inputRef={inputRef}
                />
                <TaskList
                  taskListItems={tasks}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                  onFocusComposer={handleFocusComposer}
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
