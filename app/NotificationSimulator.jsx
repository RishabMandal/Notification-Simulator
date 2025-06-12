import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Haptics from "expo-haptics";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Platform, Text, View } from "react-native";
import NotificationGlassCard from "../components/NotificationGlassCard";
import NotificationInput from "../components/NotificationInput";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function TryNoti() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState(undefined);
  const [notifications, setNotifications] = useState([]);
  const [lastNotification, setLastNotification] = useState(null);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    loadStoredNotifications();

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const loadStoredNotifications = async () => {
    try {
      const stored = await AsyncStorage.getItem("notifications");
      if (stored) {
        setNotifications(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load stored notifications:", e);
    }
  };

  const handleSave = async (note) => {
    const now = new Date();
    const dateObj = note.dateTime ? new Date(note.dateTime) : now;
  
    const isValidScheduled =
      note.dateTime &&
      dateObj instanceof Date &&
      !isNaN(dateObj.getTime()) &&
      dateObj > now;
  
    const newNote = {
      ...note,
      time: dateObj.toLocaleTimeString(),
      date: dateObj.toLocaleDateString(),
    };
  
    const updated = [newNote, ...notifications];
  
    console.log("Scheduled for:", newNote.date, newNote.time);
  
    setLastNotification(newNote);
    setNotifications(updated);
    await AsyncStorage.setItem("notifications", JSON.stringify(updated));
  
    await Notifications.scheduleNotificationAsync({
      content: {
        title: note.title,
        body: note.message,
        data: note,
        sound: true,
      },
      trigger: isValidScheduled ? dateObj : null,
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
          className="p-4 rounded-2xl border border-white/10 bg-white/10 mt-4"
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

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("myNotificationChannel", {
      name: "A channel is needed for the permissions prompt to appear",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [250, 0, 0, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId ??
        "b16f13a0-ae00-4062-b4a0-bb7d4b5bf442";

      if (!projectId) throw new Error("Project ID not found");

      token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
