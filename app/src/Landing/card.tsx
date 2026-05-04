import { Image, ImageSourcePropType, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { isRTL } from "../i18n";
import styles from "./style";

type CardProps = {
  imageSource: ImageSourcePropType;
  title: string;
};

export function Card({ title, imageSource }: CardProps) {
  const { i18n } = useTranslation();
  const rtl = isRTL(i18n.resolvedLanguage);

  return (
    <View style={styles.cardContainer}>
      <Image source={imageSource} style={styles.cardImage} />
      <Text style={[styles.cardTitle, rtl && styles.centeredTextRtl]}>
        {title}
      </Text>
    </View>
  );
}
