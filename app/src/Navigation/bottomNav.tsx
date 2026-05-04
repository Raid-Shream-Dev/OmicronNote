import { Feather } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import type { AppResumeRoute } from "../i18n";
import { theme } from "../Theme/color";
import styles from "./style";

const bottomNavItems: {
  key: AppResumeRoute;
  icon: keyof typeof Feather.glyphMap;
}[] = [
  { key: "/", icon: "home" },
  { key: "/notes", icon: "file-text" },
  { key: "/tasks", icon: "check-square" },
  { key: "/settings", icon: "settings" },
];

function getActiveTab(pathname: string): AppResumeRoute {
  if (pathname.startsWith("/note-details")) {
    return "/notes";
  }

  if (pathname === "/notes" || pathname === "/tasks" || pathname === "/settings") {
    return pathname;
  }

  return "/";
}

export function BottomNav() {
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);

  return (
    <View style={styles.container}>
      {bottomNavItems.map((item) => {
        const isActive = item.key === activeTab;

        return (
          <Pressable
            key={item.key}
            onPress={() => router.replace(item.key)}
            style={[styles.tabButton, isActive && styles.tabButtonActive]}
          >
            <Feather
              name={item.icon}
              size={18}
              color={isActive ? theme.surface : theme.inkMuted}
            />
            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
              {
                item.key === "/"
                  ? t("navHome")
                  : item.key === "/notes"
                    ? t("navNotes")
                    : item.key === "/tasks"
                      ? t("navTasks")
                      : t("navSettings")
              }
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
