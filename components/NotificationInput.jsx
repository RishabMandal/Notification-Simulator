import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Pressable, Text, TextInput } from "react-native";

export default function NotificationInput({ onSave }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    }, 200);
    if (!title) return;
    onSave({
      title,
      message,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    });
    setTitle("");
    setMessage("");
  };

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
      <Pressable
        className="bg-white/30 border border-white/20 p-3 rounded-xl items-center shadow-lg"
        onPress={handleSave}
      >
        <Text className="text-white font-semibold">💾 Save & Notify</Text>
      </Pressable>
    </BlurView>
  );
}
