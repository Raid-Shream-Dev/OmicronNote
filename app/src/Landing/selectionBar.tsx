import { Pressable, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../i18n";
import styles from "./style";

type SelectionBarProps = {
  activeTab: "allNotes" | "folders";
  onChangeActiveTab: (tab: "allNotes" | "folders") => void;
};

export function SelectionBar({
  activeTab,
  onChangeActiveTab,
}: SelectionBarProps) {
  const { t, i18n } = useTranslation("landing");
  const rtl = isRTL(i18n.resolvedLanguage);

  const tabs = [
    { key: "allNotes", label: t("allNotes") },
    { key: "folders", label: t("folders") },
  ] as const;

  return (
    <View style={[styles.tabRow, rtl && styles.tabRowRtl]}>
      {tabs.map((tab) =>
        tab.key === activeTab ? (
          <View key={tab.key} style={styles.activeTabGroup}>
            <Text
              style={[styles.tabActive, rtl ? styles.textRtl : styles.textLtr]}
            >
              {tab.label}
            </Text>
            <View style={styles.tabIndicator} />
          </View>
        ) : (
          <Pressable
            key={tab.key}
            onPress={() => onChangeActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabInactive,
                rtl ? styles.textRtl : styles.textLtr,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        )
      )}
    </View>
  );
}
