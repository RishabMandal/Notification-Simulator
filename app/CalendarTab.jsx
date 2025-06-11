// import { Ionicons } from "@expo/vector-icons";
// import * as Haptics from "expo-haptics";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { Image, Pressable, ScrollView, Text, View } from "react-native";
// import { Calendar } from "react-native-calendars";
// import { useCloths } from "./ClothContext";

// const CalendarTab = () => {
//   const router = useRouter();
//   const d = new Date();

//   const formatDateToString = (dateObj) =>
//     `${dateObj.getDate().toString().padStart(2, "0")}/${(dateObj.getMonth() + 1)
//       .toString()
//       .padStart(2, "0")}/${dateObj.getFullYear()}`;

//   const [selectedDate, setSelectedDate] = useState(formatDateToString(d));
//   const { history } = useCloths();

//   const itemsForSelectedDate = history.filter(
//     (item) => item.date === selectedDate
//   );

//   const buildMarkedDates = () => {
//     const marks = {};

//     history.forEach((item) => {
//       const [day, month, year] = item.date.split("/"); // Convert to ISO format
//       const iso = `${year}-${month}-${day}`;

//       if (!marks[iso]) {
//         marks[iso] = { marked: true, dots: [{ color: "orange" }] };
//       }
//     });

//     // Convert selectedDate to ISO too:
//     const [sDay, sMonth, sYear] = selectedDate.split("/");
//     const selectedISO = `${sYear}-${sMonth}-${sDay}`;

//     // Add or update the selected date with highlight
//     marks[selectedISO] = {
//       ...(marks[selectedISO] || {}),
//       selected: true,
//       selectedColor: "green",
//       selectedDotColor: "orange",
//     };

//     return marks;
//   };

//   return (
//     <View className="bg-black min-h-screen p-4 pt-10 flex-1">
//       {/* Header */}
//       <View className="flex-row justify-between items-center mb-6">
//         <Ionicons
//           name="arrow-back-circle-outline"
//           size={36}
//           color="white"
//           onPress={() => {
//             Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//             router.push("/");
//           }}
//         />
//         <Text className="text-white text-3xl font-semibold">Calendar</Text>
//         <Ionicons name="mic-circle-outline" size={36} color="white" />
//       </View>

//       {/* Calendar */}
//       <Calendar
//         theme={{
//           backgroundColor: "#171717",
//           calendarBackground: "#171717",
//           textSectionTitleColor: "red",
//           selectedDayBackgroundColor: "green",
//           selectedDayTextColor: "#ffffff",
//           selectedDotColor: "red",
//           todayTextColor: "red",
//           dayTextColor: "white",
//           textDisabledColor: "gray",
//           monthTextColor: "white",
//           arrowColor: "red",
//         }}
//         onDayPress={(day) => {
//           Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//           const formatted = formatDateToString(new Date(day.dateString));
//           setSelectedDate(formatted);
//         }}
//         markedDates={buildMarkedDates()}
//       />

//       {/* Selected Date Title */}
//       <Text className="text-white text-xl font-semibold mt-6 mb-2">
//         Worn on: {selectedDate}
//       </Text>

//       {/* Worn Items List */}
//       <ScrollView className="space-y-4">
//         {itemsForSelectedDate.length > 0 ? (
//           itemsForSelectedDate.map((item) => (
//             <Pressable
//               key={item.id}
//               onPress={() => {
//                 Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
//                 setTimeout(() => {
//                   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
//                 }, 200);
//                 router.push(`/${item.id.split("_")[0]}`);
//               }}
//               className="bg-white/10 rounded-xl p-4 m-1 flex-row items-center"
//             >
//               <Image
//                 source={{ uri: item.uri }}
//                 className="w-20 h-28 rounded-md mr-4 border border-red-500"
//                 resizeMode="cover"
//               />
//               <View className="flex-1">
//                 <Text className="text-white text-2xl font-semibold">
//                   {item.name}
//                 </Text>
//                 <Text className="text-gray-300 text-lg">
//                   {item.category} • {item.color}
//                 </Text>
//               </View>
//             </Pressable>
//           ))
//         ) : (
//           <Text className="text-gray-400 text-center mt-10">
//             No notifications on this date.
//           </Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// export default CalendarTab;
