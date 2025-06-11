import {
  registerForPushNotificationsAsync,
  scheduleDailyReminder,
} from "@/lib/Notification";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "react-native-reanimated";

export default function RootLayout() {
  useEffect(() => {
    (async () => {
      await registerForPushNotificationsAsync();
      await scheduleDailyReminder();
    })();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" /> */}
      {/* <StatusBar style="auto" /> */}
    </Stack>
  );
}
