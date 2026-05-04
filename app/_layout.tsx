import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import {
  prepareApp as prepareApplication,
  rememberMainRoute,
  resolveStartupRoute,
} from "./src/app/bootstrap";
import { store } from "./src/store/store";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    async function initializeApp() {
      try {
        await prepareApplication(store);
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    }

    void initializeApp();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    let isMounted = true;

    async function restoreStartupRoute() {
      const restoreRoute = await resolveStartupRoute();

      if (isMounted && restoreRoute && restoreRoute !== pathname) {
        router.replace(restoreRoute);
      }
    }

    void restoreStartupRoute();

    return () => {
      isMounted = false;
    };
  }, [isReady, pathname, router]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    void rememberMainRoute(pathname);
  }, [isReady, pathname]);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="notes" />
        <Stack.Screen name="tasks" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="note-details" />
      </Stack>
    </Provider>
  );
}
