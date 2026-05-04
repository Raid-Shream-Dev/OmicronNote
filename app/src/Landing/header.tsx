import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";
import { isRTL, toggleAppLanguage } from "../i18n";
import type { AppResumeRoute } from "../i18n";
import { theme } from "../Theme/color";
import style from "./style";

type HeaderProfileProps = {
  name: string;
  profileImage: ImageSourcePropType;
  resumeRoute?: AppResumeRoute;
};

export function HeaderProfile({
  name,
  profileImage,
  resumeRoute,
}: HeaderProfileProps) {
  const { t, i18n } = useTranslation("common");
  const rtl = isRTL(i18n.resolvedLanguage);

  return (
    <View style={[style.headerRow, rtl && style.headerRowRtl]}>
      <View style={[style.profileRow, rtl && style.profileRowRtl]}>
        <Image source={profileImage} style={style.avatar} />
        <Text style={[style.profileName, rtl ? style.textRtl : style.textLtr]}>
          {name}
        </Text>
      </View>

      <View style={[style.headerActions, rtl && style.headerActionsRtl]}>
        <Pressable
          onPress={() => {
            void toggleAppLanguage(resumeRoute);
          }}
          style={[style.languageToggle, rtl && style.languageToggleRtl]}
        >
          <Feather name="globe" size={16} color={theme.surface} />
          <Text
            style={[
              style.languageToggleText,
              rtl ? style.textRtl : style.textLtr,
            ]}
          >
            {t("languageToggle")}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.push("/notes")} style={style.iconButton}>
          <Feather name="search" size={20} color={theme.ink} />
        </Pressable>

        <Pressable
          onPress={() => router.push("/settings")}
          style={style.iconButton}
        >
          <Feather name="more-horizontal" size={20} color={theme.ink} />
        </Pressable>
      </View>
    </View>
  );
}
