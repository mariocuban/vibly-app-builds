import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: "#1a1a2e", paddingTop: insets.top, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 32, fontWeight: "bold", color: "#fff", marginBottom: 16 }}>My Test App</Text>
      <Text style={{ fontSize: 16, color: "#888", marginBottom: 32 }}>Built with Vibly</Text>
      <TouchableOpacity style={{ backgroundColor: "#6366f1", paddingHorizontal: 32, paddingVertical: 16, borderRadius: 12 }}>
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}