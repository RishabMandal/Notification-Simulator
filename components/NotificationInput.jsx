import DateTimePicker from "@react-native-community/datetimepicker";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

// Get today's date in YYYY-MM-DD format
const getTodayDateString = () => {
  return new Date().toISOString().split("T")[0];
};

export default function NotificationInput({ onSave }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(getTodayDateString());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    }, 200);

    if (!title) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert(
        "Title is empty",
        "Notification title is empty",
        [{ text: "Ok", style: "cancel" }],
        { cancelable: true }
      );
      return;
    }

    if (!selectedDate) {
      Alert.alert("No Date", "Please select a date.");
      return;
    }

    // Combine selected date and selected time
    const fullDateTime = new Date(
      `${selectedDate}T${selectedTime.toTimeString().slice(0, 8)}`
    );

    if (isNaN(fullDateTime.getTime())) {
      Alert.alert("Invalid Date", "Please select a valid date and time.");
      return;
    }

    const now = new Date();
    // if (fullDateTime.getTime()-1000 < now.getTime() + 1000) {
    //   Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    //   Alert.alert("⏰ Invalid Time", "Scheduled time must be in the future.", [
    //     { text: "OK" },
    //   ]);
    //   return;
    // }

    onSave({
      title,
      message,
      dateTime: fullDateTime,
    });

    setTitle("");
    setMessage("");
    setSelectedDate(null);
  };

  const [CalendarView, setCalendarView] = useState(false);

  return (
    <BlurView
      intensity={70}
      tint="dark"
      className="w-full rounded-2xl p-4 mb-6 bg-white/10 border border-white/10 overflow-hidden"
    >
      <TextInput
        className="bg-white/10 text-white p-3 mb-3 rounded-xl border border-white/20"
        placeholder="Notification Title"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        }}
      />
      <TextInput
        className="bg-white/10 text-white p-3 mb-3 rounded-xl border border-white/20"
        placeholder="Notification Description"
        placeholderTextColor="#aaa"
        value={message}
        onChangeText={setMessage}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        }}
      />
      <View className="flex flex-row justify-between gap-4">
        <Pressable
          className="bg-white/30 border border-white/20 p-3 mb-3 rounded-xl items-center shadow-lg flex-1"
          onPress={() => {
            Haptics.selectionAsync();
            setCalendarView(!CalendarView);
          }}
        >
          <Text className="text-white font-semibold">
            📅 {selectedDate
      ? new Date(selectedDate).toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Select Date"}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setShowTimePicker(true);
            Haptics.selectionAsync();
          }}
          className="bg-white/10 border border-white/20 p-3 rounded-xl mb-3"
        >
          <Text className="text-white text-center">
            🕒{" "}
            {selectedTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </Pressable>
      </View>

      {CalendarView && (
        <Calendar
          onDayPress={(day) => {
            Haptics.selectionAsync();
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: "#4B9CD3",
            },
          }}
          theme={{
            backgroundColor: "transparent",
            calendarBackground: "transparent",
            dayTextColor: "#ffffff",
            monthTextColor: "#ffffff",
            textDisabledColor: "#555",
            arrowColor: "#ffffff",
          }}
          style={{
            marginBottom: 12,
            borderRadius: 12,
            backgroundColor: "rgba(255,255,255,0.05)",
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => {
            if (date) setSelectedTime(date);
            setShowTimePicker(false);
          }}
        />
      )}

      <Pressable
        className="bg-white/30 border border-white/20 p-3 rounded-xl items-center shadow-lg"
        onPress={handleSave}
      >
        <Text className="text-white font-semibold">
          📅 Schedule Notification
        </Text>
      </Pressable>
    </BlurView>
  );
}
