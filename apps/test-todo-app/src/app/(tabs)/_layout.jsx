import { Tabs } from "expo-router";
import { Home, List } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: "#1a1a2e", borderTopColor: "#2d2d44" }, tabBarActiveTintColor: "#6366f1", tabBarInactiveTintColor: "#888" }}>
      <Tabs.Screen name="home" options={{ title: "Home", tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }} />
      <Tabs.Screen name="todos" options={{ title: "Todos", tabBarIcon: ({ color, size }) => <List color={color} size={size} /> }} />
    </Tabs>
  );
}