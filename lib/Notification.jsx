// lib/notifications.js
import * as Notifications from "expo-notifications";

export async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Please enable notifications to receive daily reminders.");
    return;
  }
}

export async function scheduleDailyReminder() {
  // 9 PM
  await Notifications.cancelAllScheduledNotificationsAsync(); 
  const now = new Date();

  // Create a new Date object for the desired trigger time (9:50 PM)
  const triggerDate = new Date(now);
  triggerDate.setHours(10, 9, 0, 0); // Set to 9:50 PM today

  // If the trigger time has already passed today, schedule for the same time tomorrow
  if (triggerDate <= now) {
    triggerDate.setDate(triggerDate.getDate() + 1);
  }

  // Schedule the notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "👕 Outfit Reminder",
      body: "Don’t forget to log what you wore today!",
    },
    trigger: {
      type: "date", // Use 'date' trigger type instead of the old one
      date: triggerDate, // Pass the calculated trigger date
      repeats: true,
    },
  });
}
