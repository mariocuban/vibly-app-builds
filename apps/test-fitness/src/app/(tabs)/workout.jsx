import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Calendar,
  Clock,
  Target,
  Check,
  ChevronDown,
  ChevronRight,
} from "lucide-react-native";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

export default function WorkoutScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  const [completedSets, setCompletedSets] = useState({});
  const [expandedDay, setExpandedDay] = useState(null);

  if (!fontsLoaded) {
    return null;
  }

  // Mock workout data - would come from AI generation
  const workoutPlan = {
    goal: "Build Muscle & Improve Posture",
    duration: "6 weeks",
    daysPerWeek: 4,
    workouts: [
      {
        day: "Monday",
        title: "Upper Body Strength",
        duration: "45 min",
        exercises: [
          { name: "Push-ups", sets: 3, reps: 12, rest: "60s" },
          { name: "Chest Press", sets: 3, reps: "8-10", rest: "90s" },
          { name: "Bent-over Rows", sets: 3, reps: 10, rest: "90s" },
          { name: "Shoulder Press", sets: 3, reps: 10, rest: "60s" },
          { name: "Bicep Curls", sets: 2, reps: 12, rest: "45s" },
        ],
      },
      {
        day: "Tuesday",
        title: "Core & Cardio",
        duration: "30 min",
        exercises: [
          { name: "Plank", sets: 3, reps: "45s", rest: "60s" },
          { name: "Bicycle Crunches", sets: 3, reps: 20, rest: "45s" },
          { name: "Dead Bug", sets: 3, reps: 10, rest: "45s" },
          { name: "Jump Rope", sets: 3, reps: "60s", rest: "90s" },
        ],
      },
      {
        day: "Thursday",
        title: "Lower Body Power",
        duration: "40 min",
        exercises: [
          { name: "Squats", sets: 3, reps: 12, rest: "90s" },
          { name: "Lunges", sets: 3, reps: 10, rest: "60s" },
          { name: "Deadlifts", sets: 3, reps: 8, rest: "2 min" },
          { name: "Calf Raises", sets: 3, reps: 15, rest: "45s" },
        ],
      },
      {
        day: "Friday",
        title: "Full Body Circuit",
        duration: "35 min",
        exercises: [
          { name: "Burpees", sets: 3, reps: 8, rest: "90s" },
          { name: "Mountain Climbers", sets: 3, reps: 20, rest: "60s" },
          { name: "Russian Twists", sets: 3, reps: 20, rest: "45s" },
          { name: "Wall Sit", sets: 3, reps: "30s", rest: "60s" },
        ],
      },
    ],
  };

  const toggleSetCompletion = (day, exerciseIndex, setIndex) => {
    const key = `${day}-${exerciseIndex}-${setIndex}`;
    setCompletedSets((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleDayExpansion = (day) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

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
        <View style={{ marginTop: 20, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 32,
              color: isDark ? "#DDDDDD" : "#000000",
              marginBottom: 8,
            }}
          >
            Your Workout Plan
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 16,
              color: isDark ? "#999999" : "#8D8D8D",
            }}
          >
            AI-generated plan based on your physique analysis
          </Text>
        </View>

        {/* Plan Overview */}
        <View
          style={{
            backgroundColor: isDark ? "#262626" : "#F6F6F6",
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            borderLeftWidth: 4,
            borderLeftColor: "#27C94B",
          }}
        >
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 18,
              color: isDark ? "#DDDDDD" : "#000000",
              marginBottom: 12,
            }}
          >
            Plan Overview
          </Text>

          <View style={{ flexDirection: "row", gap: 20, marginBottom: 12 }}>
            <View style={{ alignItems: "center" }}>
              <Target size={20} color="#27C94B" strokeWidth={2} />
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#8D8D8D",
                  marginTop: 4,
                }}
              >
                Goal
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_500Medium",
                  fontSize: 12,
                  color: isDark ? "#DDDDDD" : "#000000",
                  textAlign: "center",
                }}
              >
                {workoutPlan.goal}
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <Calendar size={20} color="#4F9CFF" strokeWidth={2} />
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#8D8D8D",
                  marginTop: 4,
                }}
              >
                Duration
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_500Medium",
                  fontSize: 12,
                  color: isDark ? "#DDDDDD" : "#000000",
                }}
              >
                {workoutPlan.duration}
              </Text>
            </View>

            <View style={{ alignItems: "center" }}>
              <Clock size={20} color="#FF8A00" strokeWidth={2} />
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#8D8D8D",
                  marginTop: 4,
                }}
              >
                Frequency
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_500Medium",
                  fontSize: 12,
                  color: isDark ? "#DDDDDD" : "#000000",
                }}
              >
                {workoutPlan.daysPerWeek} days/week
              </Text>
            </View>
          </View>
        </View>

        {/* Workouts */}
        {workoutPlan.workouts.map((workout, workoutIndex) => {
          const isExpanded = expandedDay === workout.day;

          return (
            <View
              key={workout.day}
              style={{
                backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
                borderRadius: 16,
                marginBottom: 16,
                overflow: "hidden",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => toggleDayExpansion(workout.day)}
                activeOpacity={0.8}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_500Medium",
                      fontSize: 16,
                      color: isDark ? "#DDDDDD" : "#000000",
                      marginBottom: 4,
                    }}
                  >
                    {workout.day}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_600SemiBold",
                      fontSize: 18,
                      color: isDark ? "#DDDDDD" : "#000000",
                      marginBottom: 4,
                    }}
                  >
                    {workout.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_400Regular",
                      fontSize: 14,
                      color: isDark ? "#999999" : "#8D8D8D",
                    }}
                  >
                    {workout.duration}
                  </Text>
                </View>

                {isExpanded ? (
                  <ChevronDown
                    size={24}
                    color={isDark ? "#DDDDDD" : "#000000"}
                    strokeWidth={2}
                  />
                ) : (
                  <ChevronRight
                    size={24}
                    color={isDark ? "#DDDDDD" : "#000000"}
                    strokeWidth={2}
                  />
                )}
              </TouchableOpacity>

              {isExpanded && (
                <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
                  {workout.exercises.map((exercise, exerciseIndex) => (
                    <View
                      key={exerciseIndex}
                      style={{
                        backgroundColor: isDark ? "#262626" : "#F6F6F6",
                        borderRadius: 12,
                        padding: 16,
                        marginBottom: 12,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "PlusJakartaSans_500Medium",
                          fontSize: 16,
                          color: isDark ? "#DDDDDD" : "#000000",
                          marginBottom: 8,
                        }}
                      >
                        {exercise.name}
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          gap: 8,
                          flexWrap: "wrap",
                        }}
                      >
                        {Array.from(
                          { length: exercise.sets },
                          (_, setIndex) => {
                            const key = `${workout.day}-${exerciseIndex}-${setIndex}`;
                            const isCompleted = completedSets[key];

                            return (
                              <TouchableOpacity
                                key={setIndex}
                                style={{
                                  backgroundColor: isCompleted
                                    ? "#27C94B"
                                    : isDark
                                      ? "#1E1E1E"
                                      : "#FFFFFF",
                                  borderRadius: 8,
                                  padding: 8,
                                  minWidth: 60,
                                  alignItems: "center",
                                  borderWidth: 1,
                                  borderColor: isCompleted
                                    ? "#27C94B"
                                    : isDark
                                      ? "#444444"
                                      : "#E5E5E5",
                                }}
                                onPress={() =>
                                  toggleSetCompletion(
                                    workout.day,
                                    exerciseIndex,
                                    setIndex,
                                  )
                                }
                                activeOpacity={0.8}
                              >
                                <Text
                                  style={{
                                    fontFamily: "PlusJakartaSans_500Medium",
                                    fontSize: 12,
                                    color: isCompleted
                                      ? "#000000"
                                      : isDark
                                        ? "#DDDDDD"
                                        : "#000000",
                                  }}
                                >
                                  Set {setIndex + 1}
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "PlusJakartaSans_400Regular",
                                    fontSize: 10,
                                    color: isCompleted
                                      ? "#000000"
                                      : isDark
                                        ? "#999999"
                                        : "#8D8D8D",
                                  }}
                                >
                                  {exercise.reps} reps
                                </Text>
                                {isCompleted && (
                                  <Check
                                    size={12}
                                    color="#000000"
                                    strokeWidth={3}
                                    style={{ marginTop: 2 }}
                                  />
                                )}
                              </TouchableOpacity>
                            );
                          },
                        )}
                      </View>

                      <Text
                        style={{
                          fontFamily: "PlusJakartaSans_400Regular",
                          fontSize: 12,
                          color: isDark ? "#999999" : "#8D8D8D",
                          marginTop: 8,
                        }}
                      >
                        Rest: {exercise.rest}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
