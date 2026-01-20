import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArrowRight } from "lucide-react-native";
import KeyboardAvoidingAnimatedView from "@/components/KeyboardAvoidingAnimatedView";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    height: "",
    weight: "",
    age: "",
    activityLevel: "moderate",
    units: "metric", // metric or imperial
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.height) newErrors.height = "Height is required";
    if (!formData.weight) newErrors.weight = "Weight is required";
    if (!formData.age) newErrors.age = "Age is required";

    const height = parseFloat(formData.height);
    const weight = parseFloat(formData.weight);
    const age = parseInt(formData.age);

    if (isNaN(height) || height <= 0) newErrors.height = "Enter a valid height";
    if (isNaN(weight) || weight <= 0) newErrors.weight = "Enter a valid weight";
    if (isNaN(age) || age < 13 || age > 120)
      newErrors.age = "Enter a valid age (13-120)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);

      try {
        // Convert measurements based on units
        let heightCm = parseFloat(formData.height);
        let weightKg = parseFloat(formData.weight);

        if (formData.units === "imperial") {
          // Convert feet/inches to cm (assuming format like "5.9" for 5'9")
          heightCm = heightCm * 30.48; // feet to cm conversion
          weightKg = weightKg * 0.453592; // lbs to kg conversion
        }

        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name || "User",
            email: formData.email,
            age: parseInt(formData.age),
            height_cm: heightCm,
            weight_kg: weightKg,
            activity_level: formData.activityLevel,
            units: formData.units,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create user profile");
        }

        const userData = await response.json();

        // Store user ID for later use (in a real app, you'd use secure storage)
        global.currentUserId = userData.id;
        global.currentUserData = userData;

        // Navigate to upload screen
        router.push("/(tabs)/upload");
      } catch (error) {
        console.error("Error creating profile:", error);
        setErrors({ general: "Failed to create profile. Please try again." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const activityLevels = [
    {
      key: "sedentary",
      label: "Sedentary",
      description: "Little or no exercise",
    },
    {
      key: "light",
      label: "Light",
      description: "Light exercise/sports 1-3 days/week",
    },
    {
      key: "moderate",
      label: "Moderate",
      description: "Moderate exercise/sports 3-5 days/week",
    },
    {
      key: "active",
      label: "Very Active",
      description: "Hard exercise/sports 6-7 days/week",
    },
    {
      key: "extra",
      label: "Extra Active",
      description: "Very hard exercise & physical job",
    },
  ];

  return (
    <KeyboardAvoidingAnimatedView style={{ flex: 1 }} behavior="padding">
      <StatusBar style={isDark ? "light" : "dark"} />
      <View
        style={{
          flex: 1,
          backgroundColor: isDark ? "#121212" : "#E7E6E2",
          paddingTop: insets.top,
        }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: insets.bottom + 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 40, marginBottom: 40 }}>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                fontSize: 32,
                color: isDark ? "#DDDDDD" : "#000000",
                marginBottom: 8,
              }}
            >
              Let's Get Started
            </Text>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 16,
                color: isDark ? "#999999" : "#8D8D8D",
                lineHeight: 24,
              }}
            >
              Tell us about yourself to get personalized fitness and nutrition
              recommendations
            </Text>
          </View>

          {/* Units Selection */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 16,
                color: isDark ? "#DDDDDD" : "#000000",
                marginBottom: 12,
              }}
            >
              Units
            </Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              {[
                { key: "metric", label: "Metric (kg, cm)" },
                { key: "imperial", label: "Imperial (lbs, ft)" },
              ].map((unit) => (
                <TouchableOpacity
                  key={unit.key}
                  style={{
                    flex: 1,
                    backgroundColor:
                      formData.units === unit.key
                        ? isDark
                          ? "#DDDDDD"
                          : "#000000"
                        : isDark
                          ? "#262626"
                          : "#F6F6F6",
                    borderRadius: 12,
                    padding: 16,
                    alignItems: "center",
                  }}
                  onPress={() => setFormData({ ...formData, units: unit.key })}
                  activeOpacity={0.8}
                >
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_500Medium",
                      fontSize: 14,
                      color:
                        formData.units === unit.key
                          ? isDark
                            ? "#000000"
                            : "#FFFFFF"
                          : isDark
                            ? "#DDDDDD"
                            : "#000000",
                    }}
                  >
                    {unit.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Name */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 16,
                color: isDark ? "#DDDDDD" : "#000000",
                marginBottom: 8,
              }}
            >
              Name (Optional)
            </Text>
            <TextInput
              style={{
                backgroundColor: isDark ? "#262626" : "#F6F6F6",
                borderRadius: 12,
                padding: 16,
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 16,
                color: isDark ? "#DDDDDD" : "#000000",
              }}
              placeholder="Your name"
              placeholderTextColor={isDark ? "#666666" : "#8D8D8D"}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          {/* Email */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 16,
                color: isDark ? "#DDDDDD" : "#000000",
                marginBottom: 8,
              }}
            >
              Email (Optional)
            </Text>
            <TextInput
              style={{
                backgroundColor: isDark ? "#262626" : "#F6F6F6",
                borderRadius: 12,
                padding: 16,
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 16,
                color: isDark ? "#DDDDDD" : "#000000",
              }}
              placeholder="your@email.com"
              placeholderTextColor={isDark ? "#666666" : "#8D8D8D"}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Height */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 16,
                color: isDark ? "#DDDDDD" : "#000000",
                marginBottom: 8,
              }}
            >
              Height {formData.units === "metric" ? "(cm)" : "(ft/in)"}
            </Text>
            <TextInput
              style={{
                backgroundColor: isDark ? "#262626" : "#F6F6F6",
                borderRadius: 12,
                padding: 16,
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 16,
                color: isDark ? "#DDDDDD" : "#000000",
                borderWidth: errors.height ? 1 : 0,
                borderColor: "#FF6B6B",
              }}
              placeholder={formData.units === "metric" ? "175" : "5'9\""}
              placeholderTextColor={isDark ? "#666666" : "#8D8D8D"}
              value={formData.height}
              onChangeText={(text) =>
                setFormData({ ...formData, height: text })
              }
              keyboardType="numeric"
            />
            {errors.height && (
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: "#FF6B6B",
                  marginTop: 4,
                }}
              >
                {errors.height}
              </Text>
            )}
          </View>

          {/* Weight */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 16,
                color: isDark ? "#DDDDDD" : "#000000",
                marginBottom: 8,
              }}
            >
              Weight {formData.units === "metric" ? "(kg)" : "(lbs)"}
            </Text>
            <TextInput
              style={{
                backgroundColor: isDark ? "#262626" : "#F6F6F6",
                borderRadius: 12,
                padding: 16,
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 16,
                color: isDark ? "#DDDDDD" : "#000000",
                borderWidth: errors.weight ? 1 : 0,
                borderColor: "#FF6B6B",
              }}
              placeholder={formData.units === "metric" ? "70" : "154"}
              placeholderTextColor={isDark ? "#666666" : "#8D8D8D"}
              value={formData.weight}
              onChangeText={(text) =>
                setFormData({ ...formData, weight: text })
              }
              keyboardType="numeric"
            />
            {errors.weight && (
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: "#FF6B6B",
                  marginTop: 4,
                }}
              >
                {errors.weight}
              </Text>
            )}
          </View>

          {/* Age */}
          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 16,
                color: isDark ? "#DDDDDD" : "#000000",
                marginBottom: 8,
              }}
            >
              Age
            </Text>
            <TextInput
              style={{
                backgroundColor: isDark ? "#262626" : "#F6F6F6",
                borderRadius: 12,
                padding: 16,
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 16,
                color: isDark ? "#DDDDDD" : "#000000",
                borderWidth: errors.age ? 1 : 0,
                borderColor: "#FF6B6B",
              }}
              placeholder="25"
              placeholderTextColor={isDark ? "#666666" : "#8D8D8D"}
              value={formData.age}
              onChangeText={(text) => setFormData({ ...formData, age: text })}
              keyboardType="numeric"
            />
            {errors.age && (
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 12,
                  color: "#FF6B6B",
                  marginTop: 4,
                }}
              >
                {errors.age}
              </Text>
            )}
          </View>

          {/* Activity Level */}
          <View style={{ marginBottom: 40 }}>
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 16,
                color: isDark ? "#DDDDDD" : "#000000",
                marginBottom: 16,
              }}
            >
              Activity Level
            </Text>
            {activityLevels.map((activity) => (
              <TouchableOpacity
                key={activity.key}
                style={{
                  backgroundColor:
                    formData.activityLevel === activity.key
                      ? isDark
                        ? "#DDDDDD"
                        : "#000000"
                      : isDark
                        ? "#262626"
                        : "#F6F6F6",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                }}
                onPress={() =>
                  setFormData({ ...formData, activityLevel: activity.key })
                }
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_500Medium",
                    fontSize: 14,
                    color:
                      formData.activityLevel === activity.key
                        ? isDark
                          ? "#000000"
                          : "#FFFFFF"
                        : isDark
                          ? "#DDDDDD"
                          : "#000000",
                    marginBottom: 4,
                  }}
                >
                  {activity.label}
                </Text>
                <Text
                  style={{
                    fontFamily: "PlusJakartaSans_400Regular",
                    fontSize: 12,
                    color:
                      formData.activityLevel === activity.key
                        ? isDark
                          ? "#666666"
                          : "#CCCCCC"
                        : isDark
                          ? "#999999"
                          : "#8D8D8D",
                  }}
                >
                  {activity.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={{
              backgroundColor: isDark ? "#DDDDDD" : "#000000",
              borderRadius: 16,
              padding: 18,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 16,
                color: isDark ? "#000000" : "#FFFFFF",
              }}
            >
              Continue to Photo Upload
            </Text>
            <ArrowRight
              size={20}
              color={isDark ? "#000000" : "#FFFFFF"}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingAnimatedView>
  );
}
