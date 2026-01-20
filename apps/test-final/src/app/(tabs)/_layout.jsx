import { Tabs } from "expo-router";
import { Home } from "lucide-react-native";
export default function TabLayout() { return <Tabs screenOptions={{ headerShown: false }}><Tabs.Screen name="home" options={{ title: "Home" }} /></Tabs>; }