import { Image, Pressable, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../i18n";
import styles from "./style";

type AddButtonProps = {
  label: string;
  onPress?: () => void;
};

export function AddButton({ label, onPress }: AddButtonProps) {
  const { i18n } = useTranslation();
  const rtl = isRTL(i18n.resolvedLanguage);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.addButton, rtl && styles.addButtonRtl]}
    >
      <Image
        source={require("../../assets/icons8-plus-48.png")}
        style={[styles.addButtonImage, rtl && styles.addButtonImageRtl]}
      />
      <Text style={[styles.addButtonText, rtl && styles.addButtonTextRtl]}>
        {label}
      </Text>
    </Pressable>
  );
}
