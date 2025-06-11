import { BlurView } from "expo-blur";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function NotificationGlassCard({
  title,
  message,
  time,
  date,
  onLongPress,
}) {
  return (
    <Pressable onLongPress={onLongPress} className="relative w-full mb-4">
      <BlurView
        intensity={80}
        tint="dark"
        className="p-4 rounded-2xl overflow-hidden border border-white/10"
      >
        <View className="absolute inset-0 bg-white/10 rounded-2xl" />
        <View className="relative">
          <Text className="text-white text-base font-semibold mb-1">
            {title}
          </Text>
          <Text className="text-gray-300 text-sm">{message}</Text>
          <Text className="text-gray-400 text-xs mt-2 text-right">{time}</Text>
          <Text className="text-gray-400 text-xs mt-2 text-right">{date}</Text>
        </View>
      </BlurView>
    </Pressable>
  );
}
