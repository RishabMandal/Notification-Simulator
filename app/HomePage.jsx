import React from "react";
import { ImageBackground, StatusBar, Text, View } from "react-native";
import NotificationSimulator from "./NotificationSimulator";

const HomePage = () => {
  return (
    <View className="flex-1 bg-black min-h-screen">
        <ImageBackground
          source={{
            // uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1350&q=80",
            uri: "https://images.unsplash.com/photo-1709377058964-929af7f2d02f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGFyayUyMGFic3RyYWN0fGVufDB8fDB8fHww",
          }}
          resizeMode="cover"
          className="flex-1"
        >
          <View className="flex-1 pt-12 pb-6 px-4">
            <Text className="text-white text-3xl font-bold text-center pt-1 pb-5">Notification Simulator</Text>
            <NotificationSimulator />
            {/* <StatusBar style="light" /> */}
          </View>
        </ImageBackground>
    </View>
  );
};

export default HomePage;
