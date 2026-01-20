import React from "react";
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
  User,
  Settings,
  Camera,
  Target,
  Calendar,
  TrendingUp,
  ArrowRight,
  Edit,
} from "lucide-react-native";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Mock profile data
  const profileData = {
    name: "Alex Johnson",
    age: 28,
    height: "175 cm",
    weight: "70 kg",
    goal: "Build Muscle & Improve Posture",
    memberSince: "January 2024",
    streak: 14,
    achievements: [
      {
        title: "First Upload",
        desc: "Completed your first photo analysis",
        icon: Camera,
      },
      {
        title: "Week Warrior",
        desc: "Worked out for 7 days straight",
        icon: Target,
      },
      {
        title: "Nutrition Master",
        desc: "Followed meal plan for 14 days",
        icon: TrendingUp,
      },
    ],
  };

  const profileItems = [
    {
      title: "Edit Profile",
      description: "Update your personal information",
      icon: Edit,
      onPress: () => router.push("/(tabs)/onboarding"),
    },
    {
      title: "Progress Photos",
      description: "View your transformation timeline",
      icon: Camera,
      onPress: () => router.push("/(tabs)/upload"),
    },
    {
      title: "Goals & Targets",
      description: "Manage your fitness objectives",
      icon: Target,
      onPress: () => {},
    },
    {
      title: "Settings",
      description: "App preferences and notifications",
      icon: Settings,
      onPress: () => {},
    },
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
            Profile
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 16,
              color: isDark ? "#999999" : "#8D8D8D",
            }}
          >
            Track your progress and manage your account
          </Text>
        </View>

        {/* Profile Card */}
        <View
          style={{
            backgroundColor: isDark ? "#262626" : "#F6F6F6",
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: isDark ? "#4F9CFF20" : "#4F9CFF40",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <User size={40} color="#4F9CFF" strokeWidth={2} />
          </View>

          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 24,
              color: isDark ? "#DDDDDD" : "#000000",
              marginBottom: 8,
            }}
          >
            {profileData.name}
          </Text>

          <View style={{ flexDirection: "row", gap: 16, marginBottom: 16 }}>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 18,
                  color: "#27C94B",
                }}
              >
                {profileData.age}
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#8D8D8D",
                }}
              >
                Years
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 18,
                  color: "#4F9CFF",
                }}
              >
                {profileData.height}
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#8D8D8D",
                }}
              >
                Height
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 18,
                  color: "#FF6B6B",
                }}
              >
                {profileData.weight}
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#8D8D8D",
                }}
              >
                Weight
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
              borderRadius: 12,
              padding: 12,
              width: "100%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 14,
                color: isDark ? "#DDDDDD" : "#000000",
                marginBottom: 4,
              }}
            >
              Current Goal
            </Text>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 12,
                color: isDark ? "#999999" : "#8D8D8D",
                textAlign: "center",
              }}
            >
              {profileData.goal}
            </Text>
          </View>
        </View>

        {/* Streak & Member Since */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 24 }}>
          <View
            style={{
              flex: 1,
              backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
              borderRadius: 16,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Calendar
              size={24}
              color="#FFC64B"
              strokeWidth={2}
              style={{ marginBottom: 8 }}
            />
            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 20,
                color: "#FFC64B",
                marginBottom: 4,
              }}
            >
              {profileData.streak}
            </Text>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 12,
                color: isDark ? "#999999" : "#8D8D8D",
                textAlign: "center",
              }}
            >
              Day Streak
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
              borderRadius: 16,
              padding: 20,
              alignItems: "center",
            }}
          >
            <User
              size={24}
              color="#9C88FF"
              strokeWidth={2}
              style={{ marginBottom: 8 }}
            />
            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 14,
                color: "#9C88FF",
                marginBottom: 4,
              }}
            >
              Member
            </Text>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 12,
                color: isDark ? "#999999" : "#8D8D8D",
                textAlign: "center",
              }}
            >
              Since {profileData.memberSince}
            </Text>
          </View>
        </View>

        {/* Achievements */}
        <Text
          style={{
            fontFamily: "PlusJakartaSans_600SemiBold",
            fontSize: 20,
            color: isDark ? "#DDDDDD" : "#000000",
            marginBottom: 16,
          }}
        >
          Recent Achievements
        </Text>

        {profileData.achievements.map((achievement, index) => {
          const IconComponent = achievement.icon;
          const colors = ["#27C94B", "#4F9CFF", "#FFC64B"];
          const color = colors[index % colors.length];

          return (
            <View
              key={index}
              style={{
                backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: color + "20",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <IconComponent size={20} color={color} strokeWidth={2} />
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
                  {achievement.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 14,
                    color: isDark ? "#999999" : "#8D8D8D",
                  }}
                >
                  {achievement.desc}
                </Text>
              </View>
            </View>
          );
        })}

        {/* Profile Options */}
        <Text
          style={{
            fontFamily: "PlusJakartaSans_600SemiBold",
            fontSize: 20,
            color: isDark ? "#DDDDDD" : "#000000",
            marginTop: 24,
            marginBottom: 16,
          }}
        >
          Account Options
        </Text>

        {profileItems.map((item, index) => {
          const IconComponent = item.icon;

          return (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
                borderRadius: 16,
                padding: 20,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={item.onPress}
              activeOpacity={0.8}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: isDark ? "#262626" : "#F6F6F6",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <IconComponent
                  size={24}
                  color={isDark ? "#DDDDDD" : "#000000"}
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
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 14,
                    color: isDark ? "#999999" : "#8D8D8D",
                  }}
                >
                  {item.description}
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
      </ScrollView>
    </View>
  );
}
