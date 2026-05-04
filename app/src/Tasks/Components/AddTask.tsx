import { isRTL } from "../../i18n";
import { theme } from "../../Theme/color";
import styles from "./style";
import { RefObject } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";

type AddTaskProps = {
  value: string;
  onChangeText: (text: string) => void;
  onAddTask: () => void;
  inputRef?: RefObject<TextInput | null>;
};

export function AddTask({
  value,
  onChangeText,
  onAddTask,
  inputRef,
}: AddTaskProps) {
  const { t, i18n } = useTranslation("tasks");
  const rtl = isRTL(i18n.resolvedLanguage);
  const isDisabled = value.trim().length === 0;

  return (
    <View style={[styles.composerCard, rtl && styles.composerCardRtl]}>
      <Text style={[styles.composerTitle, rtl ? styles.textRtl : styles.textLtr]}>
        {t("composerTitle")}
      </Text>
      <Text style={[styles.composerSubtitle, rtl ? styles.textRtl : styles.textLtr]}>
        {t("composerSubtitle")}
      </Text>
      <TextInput
        ref={inputRef}
        multiline
        numberOfLines={3}
        placeholder={t("composerPlaceholder")}
        placeholderTextColor={theme.inkMuted}
        style={[styles.textInput, rtl && styles.textInputRtl]}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onAddTask}
      />
      <Pressable
        accessibilityRole="button"
        disabled={isDisabled}
        onPress={onAddTask}
        style={[styles.addButton, isDisabled && styles.addButtonDisabled]}
      >
        <Text style={[styles.addButtonText, rtl ? styles.textRtl : styles.textLtr]}>
          {t("addTask")}
        </Text>
      </Pressable>
    </View>
  );
}
