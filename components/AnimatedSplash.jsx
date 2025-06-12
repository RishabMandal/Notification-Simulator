import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

export default function AnimatedSplash({ onDone }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    async function hideNativeSplash() {
      await SplashScreen.hideAsync();
    }

    hideNativeSplash();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(500),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDone(); // Switch to main app
    });
  }, []);

  return (
    <View className="flex-1 bg-black items-center justify-center">
      <Animated.View
        className="items-center"
        style={{
          opacity,
          transform: [{ scale }],
        }}
      >
        <Text className="text-white text-4xl font-bold">Notification 🚀</Text>
        <Text className="text-gray-400 text-base mt-2">Loading...</Text>
      </Animated.View>
    </View>
  );
}
