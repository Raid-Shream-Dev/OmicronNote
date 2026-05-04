import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { isRTL } from "../i18n";
import { AddButton } from "../Landing/button";
import { Card } from "../Landing/card";
import { HeaderProfile } from "../Landing/header";
import { SelectionBar } from "../Landing/selectionBar";
import styles from "../Landing/style";
import { BottomNav } from "../Navigation/bottomNav";
import screenStyles from "./style";
import { useAppSelector } from "../store/hooks";
import { theme } from "../Theme/color";

const profileImage = require("../../../assets/images/icon.png");
const noteImage = require("../../../assets/images/icons8-notepad-100.png");
const todoImage = require("../../../assets/images/icons8-to-do-100.png");

export function LandingScreen() {
  const { t, i18n } = useTranslation("landing");
  const rtl = isRTL(i18n.resolvedLanguage);
  const notes = useAppSelector((state) => state.notes.items);
  const [activeTab, setActiveTab] = useState<"allNotes" | "folders">("folders");

  const quickActions = [
    {
      key: "notes",
      title: t("myNotes"),
      imageSource: noteImage,
    },
    {
      key: "todo",
      title: t("todoList"),
      imageSource: todoImage,
    },
  ];

  const folderPreview = useMemo(
    () => [
      {
        key: "personal",
        title: t("personal"),
        count: t("notesCount", {
          count: notes.filter((note) => note.labels.includes("Personal")).length,
        }),
      },
      {
        key: "work",
        title: t("work"),
        count: t("notesCount", {
          count: notes.filter((note) => note.labels.includes("Work")).length,
        }),
      },
    ],
    [notes, t],
  );

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.phoneShell}>
          <View style={screenStyles.screenBody}>
            <ScrollView
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={false}
            >
              <HeaderProfile
                name={t("profileName")}
                profileImage={profileImage}
                resumeRoute="/"
              />

              <SelectionBar
                activeTab={activeTab}
                onChangeActiveTab={setActiveTab}
              />

              {activeTab === "allNotes" ? (
                <View style={[styles.actionsRow, rtl && styles.actionsRowRtl]}>
                  {quickActions.map((item) => (
                    <Pressable
                      key={item.key}
                      onPress={
                        item.key === "todo"
                          ? () => router.push("/tasks")
                          : () => router.push("/notes")
                      }
                      style={styles.cardWrapper}
                    >
                      <Card title={item.title} imageSource={item.imageSource} />

                      <View pointerEvents="none" style={styles.cardOverlay}>
                        <Image
                          source={item.imageSource}
                          style={styles.actionIcon}
                        />
                        <Text
                          style={[
                            styles.actionLabel,
                            rtl && styles.centeredTextRtl,
                          ]}
                        >
                          {item.title}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              ) : (
                <>
                  <View style={styles.previewPanel}>
                    <View style={[styles.previewGrid, rtl && styles.previewGridRtl]}>
                      {folderPreview.map((item) => (
                        <Pressable
                          key={item.key}
                          onPress={() => router.push("/notes")}
                          style={[styles.previewCard, rtl && styles.previewCardRtl]}
                        >
                          <View style={styles.previewIcon}>
                            <Feather name="folder" size={18} color={theme.surface} />
                          </View>

                          <Text
                            style={[styles.previewTitle, rtl ? styles.textRtl : null]}
                          >
                            {item.title}
                          </Text>

                          <Text
                            style={[styles.previewCount, rtl ? styles.textRtl : null]}
                          >
                            {item.count}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  <View style={styles.buttonRow}>
                    <AddButton
                      label={t("addNewFolder")}
                      onPress={() => router.push("/notes")}
                    />
                  </View>
                </>
              )}
            </ScrollView>
            <BottomNav />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
