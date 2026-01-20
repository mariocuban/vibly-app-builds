import { Tabs } from "expo-router";
import { Home, User } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: "#1a1a2e", borderTopColor: "#333" }, tabBarActiveTintColor: "#6366f1" }}>
      <Tabs.Screen name="home" options={{ title: "Home", tabBarIcon: ({ color }) => <Home size={24} color={color} /> }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: ({ color }) => <User size={24} color={color} /> }} />
    </Tabs>
  );
}