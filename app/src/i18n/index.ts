import AsyncStorage from "@react-native-async-storage/async-storage";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import { DevSettings, I18nManager, Platform } from "react-native";

import arCommon from "./locales/ar/common.json";
import arLanding from "./locales/ar/landing.json";
import arNotes from "./locales/ar/notes.json";
import arSettings from "./locales/ar/settings.json";
import arTasks from "./locales/ar/tasks.json";
import enCommon from "./locales/en/common.json";
import enLanding from "./locales/en/landing.json";
import enNotes from "./locales/en/notes.json";
import enSettings from "./locales/en/settings.json";
import enTasks from "./locales/en/tasks.json";

export type AppLanguage = "en" | "ar";
export type AppResumeRoute = "/" | "/notes" | "/tasks" | "/settings";

const LANGUAGE_STORAGE_KEY = "@omicronnote/language";
const LAST_ROUTE_STORAGE_KEY = "@omicronnote/last-route";
const PENDING_ROUTE_STORAGE_KEY = "@omicronnote/pending-route";

const i18n = createInstance();

function normalizeLanguage(language?: string | null): AppLanguage {
  if (!language) return "en";
  return language.toLowerCase().startsWith("ar") ? "ar" : "en";
}

function isAppResumeRoute(route: string): route is AppResumeRoute {
  return (
    route === "/" ||
    route === "/notes" ||
    route === "/tasks" ||
    route === "/settings"
  );
}

export const initI18n = i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      landing: enLanding,
      notes: enNotes,
      settings: enSettings,
      tasks: enTasks,
    },
    ar: {
      common: arCommon,
      landing: arLanding,
      notes: arNotes,
      settings: arSettings,
      tasks: arTasks,
    },
  },
  lng: "en",

  fallbackLng: "en",
  supportedLngs: ["en", "ar"],

  defaultNS: "common",
  ns: ["common", "landing", "notes", "settings", "tasks"],

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },
});

async function storeLanguage(language: AppLanguage) {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}

async function getStoredLanguage(): Promise<AppLanguage | null> {
  const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (!storedLanguage) return null;

  return normalizeLanguage(storedLanguage);
}

async function storePendingRoute(route: AppResumeRoute) {
  await AsyncStorage.setItem(PENDING_ROUTE_STORAGE_KEY, route);
}

export async function storeLastRoute(route: AppResumeRoute) {
  await AsyncStorage.setItem(LAST_ROUTE_STORAGE_KEY, route);
}

export async function getStoredLastRoute(): Promise<AppResumeRoute | null> {
  const lastRoute = await AsyncStorage.getItem(LAST_ROUTE_STORAGE_KEY);

  if (!lastRoute || !isAppResumeRoute(lastRoute)) {
    return null;
  }

  return lastRoute;
}

export async function consumePendingRoute(): Promise<AppResumeRoute | null> {
  const pendingRoute = await AsyncStorage.getItem(PENDING_ROUTE_STORAGE_KEY);

  if (!pendingRoute) {
    return null;
  }

  await AsyncStorage.removeItem(PENDING_ROUTE_STORAGE_KEY);

  if (isAppResumeRoute(pendingRoute)) {
    return pendingRoute;
  }

  return null;
}

async function reloadApp() {
  if (Platform.OS === "web") {
    return;
  }

  if (__DEV__) {
    DevSettings.reload();
  }
}

export async function hydrateStoredLanguage() {
  await initI18n;

  const storedLanguage = await getStoredLanguage();
  const nextLanguage = storedLanguage ?? "en";
  const shouldBeRTL = nextLanguage === "ar";

  if (I18nManager.isRTL !== shouldBeRTL) {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
  }

  if (i18n.resolvedLanguage !== nextLanguage) {
    await i18n.changeLanguage(nextLanguage);
  }

  return nextLanguage;
}

export async function setAppLanguage(
  language: AppLanguage,
  resumeRoute?: AppResumeRoute,
) {
  await initI18n;

  const shouldBeRTL = language === "ar";
  const directionChanged = I18nManager.isRTL !== shouldBeRTL;

  await storeLanguage(language);
  await i18n.changeLanguage(language);

  if (directionChanged) {
    if (resumeRoute) {
      await storePendingRoute(resumeRoute);
    }

    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);

    await reloadApp();

    return language;
  }
  return language;
}

export async function toggleAppLanguage(resumeRoute?: AppResumeRoute) {
  try {
    await initI18n;

    const current = normalizeLanguage(i18n.resolvedLanguage);
    const next = current === "ar" ? "en" : "ar";

    return setAppLanguage(next, resumeRoute);
  } catch (error: unknown) {
    console.error("Failed to toggle app language", error);
  }
}

export function isRTL(language = i18n.resolvedLanguage) {
  return i18n.dir(language).toLowerCase() === "rtl";
}

export default i18n;
