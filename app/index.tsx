import "../global.css";

import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import AnimatedSplash from "../components/AnimatedSplash";
import HomePage from "./HomePage";

export default function HomeScreen() {
  useEffect(() => {
    Notifications.requestPermissionsAsync();

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
  }, []);

  const [ready, setReady] = useState(false);

  if (!ready) {
    return <AnimatedSplash onDone={() => setReady(true)} />;
  }
  return (
    <View className="bg-black">
      <HomePage />
    </View>
  );
}
