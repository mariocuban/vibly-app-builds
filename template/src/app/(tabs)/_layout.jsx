import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Home, Camera, User, Dumbbell, Apple } from "lucide-react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? "#121212" : "#E7E6E2",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: isDark ? "#DDDDDD" : "#000000",
        tabBarInactiveTintColor: isDark ? "#666666" : "#666666",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Home color={color} size={24} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: "Upload",
          tabBarIcon: ({ color, size }) => (
            <Camera color={color} size={24} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: "Workout",
          tabBarIcon: ({ color, size }) => (
            <Dumbbell color={color} size={24} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: "Nutrition",
          tabBarIcon: ({ color, size }) => (
            <Apple color={color} size={24} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <User color={color} size={24} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="onboarding/index"
        options={{
          href: null, // Hidden from tab bar
        }}
      />
      <Tabs.Screen
        name="results/index"
        options={{
          href: null, // Hidden from tab bar
        }}
      />
    </Tabs>
  );
}
