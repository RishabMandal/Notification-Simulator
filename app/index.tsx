import "../global.css";

import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Platform, View } from "react-native";
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
  return (
    <View className="bg-black">
      <HomePage />
    </View>
  );
}
