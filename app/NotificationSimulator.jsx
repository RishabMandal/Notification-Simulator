import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import NotificationGlassCard from "../components/NotificationGlassCard";
import NotificationInput from "../components/NotificationInput";

export default function NotificationSimulator() {
  const [notifications, setNotifications] = useState([
    {
      title: "Welcome!",
      message: "Your glassy notification simulator is ready 🚀",
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const [lastNotification, setLastNotification] = useState(null);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const stored = await AsyncStorage.getItem("notifications");
        if (stored) {
          setNotifications(JSON.parse(stored));
        } else {
          const defaultNote = {
            title: "Welcome!",
            message: "Your glassy notification simulator is ready 🚀",
            time: new Date().toLocaleTimeString(),
          };
          setNotifications([defaultNote]);
          await AsyncStorage.setItem(
            "notifications",
            JSON.stringify([defaultNote])
          );
        }
      } catch (e) {
        console.error("Failed to load notifications:", e);
      }
    };

    loadNotifications();
  }, []);

  const handleSave = async (notification) => {
    const updated = [notification, ...notifications];
    setLastNotification(notification);
    setNotifications(updated);

    await AsyncStorage.setItem("notifications", JSON.stringify(updated));

    // 🔔 Local Push Notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title,
        body: notification.message,
        sound: true,
      },
      trigger: null, // trigger immediately
    });

    setTimeout(() => setLastNotification(null), 5000);
  };

  const confirmDelete = (index) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    }, 200);
    setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    }, 400);
    Alert.alert(
      "Delete Notification?",
      "Are you sure you want to remove this notification?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const updated = [...notifications];
            updated.splice(index, 1);
            setNotifications(updated);
            await AsyncStorage.setItem(
              "notifications",
              JSON.stringify(updated)
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-1 space-y-4">
      <NotificationInput onSave={handleSave} />

      {lastNotification && (
        <BlurView
          intensity={70}
          tint="dark"
          className="p-4 rounded-2xl border border-white/10 bg-white/10"
        >
          <Text className="text-white font-bold mb-2 text-lg">
            🔔 New Notification
          </Text>
          <NotificationGlassCard {...lastNotification} />
        </BlurView>
      )}

      <BlurView
        intensity={60}
        tint="dark"
        className="flex-1 mt-4 p-4 rounded-2xl border border-white/10 bg-white/10 overflow-hidden"
      >
        <Text className="text-white font-bold mb-2 text-lg">
          📜 Notification History
        </Text>
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <NotificationGlassCard
              {...item}
              onLongPress={() => confirmDelete(index)}
            />
          )}
        />
      </BlurView>
    </View>
  );
}
