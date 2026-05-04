import { StatusBar } from "expo-status-bar";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderProfile } from "../Landing/header";
import landingStyles from "../Landing/style";
import { BottomNav } from "../Navigation/bottomNav";
import noteStyles from "../Notes/Components/style";
import { isRTL, setAppLanguage } from "../i18n";
import { useAppSelector } from "../store/hooks";
import screenStyles from "./style";

const profileImage = require("../../../assets/images/icon.png");

export function SettingsScreen() {
  const { t, i18n } = useTranslation(["landing", "settings"]);
  const rtl = isRTL(i18n.resolvedLanguage);
  const noteCount = useAppSelector((state) => state.notes.items.length);
  const activeLanguage = isRTL(i18n.resolvedLanguage) ? "ar" : "en";

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={landingStyles.safeArea}>
        <View style={landingStyles.phoneShell}>
          <View style={screenStyles.screenBody}>
            <ScrollView
              contentContainerStyle={landingStyles.content}
              showsVerticalScrollIndicator={false}
            >
              <HeaderProfile
                name={t("profileName")}
                profileImage={profileImage}
                resumeRoute="/settings"
              />
              <View
                style={[
                  noteStyles.screenIntro,
                  rtl && noteStyles.screenIntroRtl,
                ]}
              >
                <Text
                  style={[
                    noteStyles.screenEyebrow,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  {t("settings:introEyebrow")}
                </Text>
                <Text
                  style={[
                    screenStyles.settingsIntroTitle,
                    rtl ? noteStyles.textRtl : noteStyles.textLtr,
                  ]}
                >
                  {t("settings:introDescription")}
                </Text>
              </View>
              <View style={screenStyles.settingsStage}>
                <View style={screenStyles.settingsGlowLarge} />
                <View style={screenStyles.settingsGlowSmall} />
                <View
                  style={[
                    screenStyles.settingsHeroCard,
                    rtl && screenStyles.settingsHeroCardRtl,
                  ]}
                >
                  <View style={screenStyles.settingsHeroTopline}>
                    <View style={screenStyles.settingsIconPlate}>
                      <MaterialCommunityIcons
                        name="database-lock"
                        size={22}
                        color="#DAF1DE"
                      />
                    </View>
                    <Text
                      style={[
                        screenStyles.settingsKicker,
                        rtl ? noteStyles.textRtl : noteStyles.textLtr,
                      ]}
                    >
                      {t("settings:storageTitle")}
                    </Text>
                  </View>
                  <View style={screenStyles.settingsStatDial}>
                    <View style={screenStyles.settingsDialRing} />
                    <Text
                      style={[
                        screenStyles.settingsStatNumber,
                        rtl ? noteStyles.textRtl : noteStyles.textLtr,
                      ]}
                    >
                      {noteCount}
                    </Text>
                  </View>
                  <Text
                    style={[
                      screenStyles.settingsHeroHint,
                      rtl ? noteStyles.textRtl : noteStyles.textLtr,
                    ]}
                  >
                    {t("settings:storageCount", { count: noteCount })}
                  </Text>
                </View>

                <View style={screenStyles.settingsPanel}>
                  <View
                    style={[
                      screenStyles.settingsPanelHeader,
                      rtl && screenStyles.settingsPanelHeaderRtl,
                    ]}
                  >
                    <View style={screenStyles.settingsIconPlateMuted}>
                      <Ionicons name="language" size={20} color="#8EB69B" />
                    </View>
                    <View style={screenStyles.settingsHeaderCopy}>
                      <Text
                        style={[
                          noteStyles.editorSectionTitle,
                          rtl ? noteStyles.textRtl : noteStyles.textLtr,
                        ]}
                      >
                        {t("settings:languageTitle")}
                      </Text>
                      <Text
                        style={[
                          noteStyles.editorSectionHint,
                          rtl ? noteStyles.textRtl : noteStyles.textLtr,
                        ]}
                      >
                        {t("settings:languageHint")}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      screenStyles.settingsSegment,
                      rtl && screenStyles.settingsSegmentRtl,
                    ]}
                  >
                    <Pressable
                      onPress={() => {
                        void setAppLanguage("en", "/settings");
                      }}
                      android_ripple={{ color: "rgba(218,241,222,0.12)" }}
                      style={[
                        screenStyles.settingsLanguageButton,
                        activeLanguage === "en" &&
                          screenStyles.settingsLanguageButtonActive,
                      ]}
                    >
                      <Text style={screenStyles.settingsLanguageCode}>EN</Text>
                      <Text
                        style={[
                          screenStyles.settingsLanguageText,
                          activeLanguage === "en" &&
                            screenStyles.settingsLanguageTextActive,
                          rtl ? noteStyles.textRtl : noteStyles.textLtr,
                        ]}
                      >
                        {t("settings:languageEnglish")}
                      </Text>
                      {activeLanguage === "en" && (
                        <Ionicons
                          name="checkmark-circle"
                          size={18}
                          color="#051F20"
                        />
                      )}
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        void setAppLanguage("ar", "/settings");
                      }}
                      android_ripple={{ color: "rgba(218,241,222,0.12)" }}
                      style={[
                        screenStyles.settingsLanguageButton,
                        activeLanguage === "ar" &&
                          screenStyles.settingsLanguageButtonActive,
                      ]}
                    >
                      <Text style={screenStyles.settingsLanguageCode}>AR</Text>
                      <Text
                        style={[
                          screenStyles.settingsLanguageText,
                          activeLanguage === "ar" &&
                            screenStyles.settingsLanguageTextActive,
                          rtl ? noteStyles.textRtl : noteStyles.textLtr,
                        ]}
                      >
                        {t("settings:languageArabic")}
                      </Text>
                      {activeLanguage === "ar" && (
                        <Ionicons
                          name="checkmark-circle"
                          size={18}
                          color="#051F20"
                        />
                      )}
                    </Pressable>
                  </View>
                </View>

                <View style={screenStyles.settingsPanel}>
                  <View
                    style={[
                      screenStyles.settingsPanelHeader,
                      rtl && screenStyles.settingsPanelHeaderRtl,
                    ]}
                  >
                    <View style={screenStyles.settingsIconPlateMuted}>
                      <Ionicons name="phone-portrait" size={20} color="#8EB69B" />
                    </View>
                    <View style={screenStyles.settingsHeaderCopy}>
                      <Text
                        style={[
                          noteStyles.editorSectionTitle,
                          rtl ? noteStyles.textRtl : noteStyles.textLtr,
                        ]}
                      >
                        {t("settings:storageTitle")}
                      </Text>
                      <Text
                        style={[
                          noteStyles.editorSectionHint,
                          rtl ? noteStyles.textRtl : noteStyles.textLtr,
                        ]}
                      >
                        {t("settings:storageHint")}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      screenStyles.settingsStatusStrip,
                      rtl && screenStyles.settingsStatusStripRtl,
                    ]}
                  >
                    <View style={screenStyles.settingsStatusDot} />
                    <Text
                      style={[
                        screenStyles.settingsStatusText,
                        rtl ? noteStyles.textRtl : noteStyles.textLtr,
                      ]}
                    >
                      {t("settings:storageCount", { count: noteCount })}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <BottomNav />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
