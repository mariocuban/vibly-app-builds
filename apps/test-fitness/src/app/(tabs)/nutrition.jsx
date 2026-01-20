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
  Apple,
  Coffee,
  Utensils,
  Moon,
  Target,
  Zap,
  Heart,
  Plus,
  Minus,
} from "lucide-react-native";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

export default function NutritionScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  const [consumedWater, setConsumedWater] = useState(0);
  const [completedMeals, setCompletedMeals] = useState({});

  if (!fontsLoaded) {
    return null;
  }

  // Mock nutrition data - would come from AI generation
  const nutritionPlan = {
    dailyCalories: 2340,
    macros: {
      protein: { grams: 140, percentage: 24, color: "#FF6B6B" },
      carbs: { grams: 290, percentage: 50, color: "#4F9CFF" },
      fat: { grams: 65, percentage: 26, color: "#FFC64B" },
    },
    waterGoal: 8, // glasses
    meals: [
      {
        time: "Breakfast",
        icon: Coffee,
        color: "#FFC64B",
        calories: 450,
        items: [
          "Oatmeal with berries (1 cup)",
          "Greek yogurt (150g)",
          "Almonds (30g)",
          "Green tea",
        ],
      },
      {
        time: "Lunch",
        icon: Utensils,
        color: "#27C94B",
        calories: 550,
        items: [
          "Grilled chicken breast (150g)",
          "Quinoa (100g)",
          "Mixed vegetables",
          "Avocado (1/2)",
        ],
      },
      {
        time: "Snack",
        icon: Apple,
        color: "#FF6B6B",
        calories: 200,
        items: ["Protein shake", "Banana (1 medium)"],
      },
      {
        time: "Dinner",
        icon: Moon,
        color: "#9C88FF",
        calories: 650,
        items: [
          "Salmon fillet (180g)",
          "Sweet potato (150g)",
          "Steamed broccoli",
          "Mixed green salad",
        ],
      },
      {
        time: "Evening Snack",
        icon: Apple,
        color: "#66FA84",
        calories: 150,
        items: ["Greek yogurt (100g)", "Handful of walnuts"],
      },
    ],
  };

  const toggleMealCompletion = (mealIndex) => {
    setCompletedMeals((prev) => ({
      ...prev,
      [mealIndex]: !prev[mealIndex],
    }));
  };

  const adjustWater = (change) => {
    setConsumedWater((prev) =>
      Math.max(0, Math.min(nutritionPlan.waterGoal, prev + change)),
    );
  };

  const waterPercentage = (consumedWater / nutritionPlan.waterGoal) * 100;
  const completedMealsCount =
    Object.values(completedMeals).filter(Boolean).length;
  const totalCaloriesConsumed = nutritionPlan.meals
    .filter((_, index) => completedMeals[index])
    .reduce((sum, meal) => sum + meal.calories, 0);

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
            Nutrition Plan
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 16,
              color: isDark ? "#999999" : "#8D8D8D",
            }}
          >
            Personalized meal plan based on your goals
          </Text>
        </View>

        {/* Daily Overview */}
        <View
          style={{
            backgroundColor: isDark ? "#262626" : "#F6F6F6",
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 18,
              color: isDark ? "#DDDDDD" : "#000000",
              marginBottom: 16,
            }}
          >
            Today's Progress
          </Text>

          <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Target size={20} color="#27C94B" strokeWidth={2} />
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 20,
                  color: "#27C94B",
                  marginTop: 4,
                }}
              >
                {totalCaloriesConsumed}
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#8D8D8D",
                }}
              >
                / {nutritionPlan.dailyCalories} cal
              </Text>
            </View>

            <View style={{ flex: 1, alignItems: "center" }}>
              <Utensils size={20} color="#4F9CFF" strokeWidth={2} />
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 20,
                  color: "#4F9CFF",
                  marginTop: 4,
                }}
              >
                {completedMealsCount}
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#8D8D8D",
                }}
              >
                / {nutritionPlan.meals.length} meals
              </Text>
            </View>

            <View style={{ flex: 1, alignItems: "center" }}>
              <Heart size={20} color="#FF6B6B" strokeWidth={2} />
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 20,
                  color: "#FF6B6B",
                  marginTop: 4,
                }}
              >
                {consumedWater}
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: isDark ? "#999999" : "#8D8D8D",
                }}
              >
                / {nutritionPlan.waterGoal} glasses
              </Text>
            </View>
          </View>
        </View>

        {/* Macros */}
        <View
          style={{
            backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 18,
              color: isDark ? "#DDDDDD" : "#000000",
              marginBottom: 16,
            }}
          >
            Macronutrients Goal
          </Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            {Object.entries(nutritionPlan.macros).map(([macro, data]) => (
              <View
                key={macro}
                style={{
                  flex: 1,
                  alignItems: "center",
                  padding: 16,
                  backgroundColor: data.color + "20",
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_600SemiBold",
                    fontSize: 20,
                    color: data.color,
                    marginBottom: 4,
                  }}
                >
                  {data.grams}g
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 12,
                    color: isDark ? "#DDDDDD" : "#000000",
                    marginBottom: 2,
                  }}
                >
                  {macro.charAt(0).toUpperCase() + macro.slice(1)}
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 10,
                    color: data.color,
                  }}
                >
                  {data.percentage}%
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Water Intake */}
        <View
          style={{
            backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 18,
                color: isDark ? "#DDDDDD" : "#000000",
              }}
            >
              Water Intake
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <TouchableOpacity
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: isDark ? "#262626" : "#F6F6F6",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => adjustWater(-1)}
                activeOpacity={0.8}
              >
                <Minus
                  size={16}
                  color={isDark ? "#DDDDDD" : "#000000"}
                  strokeWidth={2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: "#4F9CFF",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => adjustWater(1)}
                activeOpacity={0.8}
              >
                <Plus size={16} color="#FFFFFF" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 8 }}>
            {Array.from({ length: nutritionPlan.waterGoal }, (_, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    index < consumedWater
                      ? "#4F9CFF"
                      : isDark
                        ? "#262626"
                        : "#F6F6F6",
                }}
              />
            ))}
          </View>
        </View>

        {/* Meal Plan */}
        <Text
          style={{
            fontFamily: "PlusJakartaSans_600SemiBold",
            fontSize: 20,
            color: isDark ? "#DDDDDD" : "#000000",
            marginBottom: 16,
          }}
        >
          Today's Meals
        </Text>

        {nutritionPlan.meals.map((meal, index) => {
          const IconComponent = meal.icon;
          const isCompleted = completedMeals[index];

          return (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                borderWidth: isCompleted ? 2 : 0,
                borderColor: meal.color,
                opacity: isCompleted ? 0.8 : 1,
              }}
              onPress={() => toggleMealCompletion(index)}
              activeOpacity={0.8}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: meal.color + "20",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <IconComponent size={24} color={meal.color} strokeWidth={2} />
                </View>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "PlusJakartaSans_600SemiBold",
                        fontSize: 18,
                        color: isDark ? "#DDDDDD" : "#000000",
                      }}
                    >
                      {meal.time}
                      {isCompleted && (
                        <Text style={{ color: meal.color }}> ✓</Text>
                      )}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "PlusJakartaSans_500Medium",
                        fontSize: 14,
                        color: meal.color,
                      }}
                    >
                      {meal.calories} cal
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{ marginLeft: 64 }}>
                {meal.items.map((item, itemIndex) => (
                  <Text
                    key={itemIndex}
                    style={{
                      fontFamily: "PlusJakartaSans_400Regular",
                      fontSize: 14,
                      color: isDark ? "#999999" : "#8D8D8D",
                      marginBottom: 4,
                      textDecorationLine: isCompleted ? "line-through" : "none",
                    }}
                  >
                    • {item}
                  </Text>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
