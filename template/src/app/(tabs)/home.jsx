import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Camera,
  Activity,
  Apple,
  User,
  ArrowRight,
  UserPlus,
} from "lucide-react-native";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  useEffect(() => {
    // Check if user has completed onboarding
    // In a real app, this would check local storage or database
    setTimeout(() => {
      setHasProfile(false); // Set to false for demo - user needs onboarding
      setIsLoading(false);
    }, 1000);
  }, []);

  if (!fontsLoaded || isLoading) {
    return null;
  }

  // Show welcome screen for first-time users
  if (!hasProfile) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: isDark ? "#121212" : "#E7E6E2",
          paddingTop: insets.top,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <StatusBar style={isDark ? "light" : "dark"} />

        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: isDark ? "#4F9CFF20" : "#4F9CFF40",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 32,
          }}
        >
          <UserPlus size={60} color="#4F9CFF" strokeWidth={2} />
        </View>

        <Text
          style={{
            fontFamily: "PlusJakartaSans_600SemiBold",
            fontSize: 32,
            color: isDark ? "#DDDDDD" : "#000000",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Welcome to FitnessAI
        </Text>

        <Text
          style={{
            fontFamily: "PlusJakartaSans_400Regular",
            fontSize: 18,
            color: isDark ? "#999999" : "#8D8D8D",
            textAlign: "center",
            lineHeight: 26,
            marginBottom: 48,
          }}
        >
          Get AI-powered physique analysis, personalized workout plans, and
          nutrition guidance tailored to your body and goals.
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: isDark ? "#DDDDDD" : "#000000",
            borderRadius: 16,
            padding: 18,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 16,
          }}
          onPress={() => router.push("/(tabs)/onboarding")}
          activeOpacity={0.8}
        >
          <Text
            style={{
              fontFamily: "PlusJakartaSans_500Medium",
              fontSize: 16,
              color: isDark ? "#000000" : "#FFFFFF",
            }}
          >
            Get Started
          </Text>
          <ArrowRight
            size={20}
            color={isDark ? "#000000" : "#FFFFFF"}
            strokeWidth={2}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 16,
          }}
          onPress={() => setHasProfile(true)}
          activeOpacity={0.8}
        >
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 14,
              color: isDark ? "#999999" : "#8D8D8D",
            }}
          >
            Already have a profile? Continue →
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const quickActions = [
    {
      title: "Take Photos",
      description: "Upload your progress photos for AI analysis",
      icon: Camera,
      color: "#4F9CFF",
      onPress: () => router.push("/(tabs)/upload"),
    },
    {
      title: "View Workout",
      description: "Check your personalized workout plan",
      icon: Activity,
      color: "#27C94B",
      onPress: () => router.push("/(tabs)/workout"),
    },
    {
      title: "Nutrition Plan",
      description: "See your daily nutrition recommendations",
      icon: Apple,
      color: "#FF6B6B",
      onPress: () => router.push("/(tabs)/nutrition"),
    },
  ];

  const stats = [
    { label: "Current BMI", value: "22.5", status: "Normal" },
    { label: "Daily Calories", value: "2,340", status: "Goal" },
    { label: "Workouts This Week", value: "3", status: "4 remaining" },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#121212" : "#E7E6E2",
        paddingTop: insets.top,
      }}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ marginTop: 20, marginBottom: 32 }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 32,
              color: isDark ? "#DDDDDD" : "#000000",
              marginBottom: 8,
            }}
          >
            Welcome Back
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 16,
              color: isDark ? "#999999" : "#8D8D8D",
            }}
          >
            Ready to continue your fitness journey?
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 20,
              color: isDark ? "#DDDDDD" : "#000000",
              marginBottom: 16,
            }}
          >
            Your Progress
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            {stats.map((stat, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
                  borderRadius: 16,
                  padding: 16,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_600SemiBold",
                    fontSize: 20,
                    color: isDark ? "#DDDDDD" : "#000000",
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 12,
                    color: isDark ? "#999999" : "#8D8D8D",
                    textAlign: "center",
                    marginBottom: 8,
                  }}
                >
                  {stat.label}
                </Text>
                <View
                  style={{
                    backgroundColor: isDark ? "#1A4A20" : "#DFF8E7",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 999,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_400Regular",
                      fontSize: 10,
                      color: "#27C94B",
                    }}
                  >
                    {stat.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 20,
              color: isDark ? "#DDDDDD" : "#000000",
              marginBottom: 16,
            }}
          >
            Quick Actions
          </Text>
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: isDark ? "#262626" : "#F6F6F6",
                  borderRadius: 16,
                  padding: 20,
                  marginBottom: 12,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={action.onPress}
                activeOpacity={0.8}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: action.color + "20",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <IconComponent
                    size={24}
                    color={action.color}
                    strokeWidth={2}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_500Medium",
                      fontSize: 16,
                      color: isDark ? "#DDDDDD" : "#000000",
                      marginBottom: 4,
                    }}
                  >
                    {action.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_400Regular",
                      fontSize: 14,
                      color: isDark ? "#999999" : "#8D8D8D",
                    }}
                  >
                    {action.description}
                  </Text>
                </View>
                <ArrowRight
                  size={20}
                  color={isDark ? "#666666" : "#8D8D8D"}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={{
            backgroundColor: isDark ? "#DDDDDD" : "#000000",
            borderRadius: 16,
            padding: 18,
            alignItems: "center",
            marginTop: 16,
          }}
          onPress={() => router.push("/(tabs)/onboarding")}
          activeOpacity={0.8}
        >
          <Text
            style={{
              fontFamily: "PlusJakartaSans_500Medium",
              fontSize: 16,
              color: isDark ? "#000000" : "#FFFFFF",
            }}
          >
            Update Your Profile
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
