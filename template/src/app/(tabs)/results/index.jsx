import React, { useState, useEffect } from "react";
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
  TrendingUp,
  TrendingDown,
  Heart,
  Zap,
  Target,
  ArrowRight,
  RefreshCw,
} from "lucide-react-native";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

export default function ResultsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    // Check if we have analysis results
    const analysisData = global.currentAnalysis;

    if (!analysisData) {
      // If no analysis data, redirect to upload
      router.push("/(tabs)/upload");
      return;
    }

    // Simulate loading for better UX
    setTimeout(() => {
      setIsLoading(false);
      setAnalysisComplete(true);
    }, 2000);
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  // Get real analysis data or fallback to mock data
  const analysisResult = global.currentAnalysis;
  const analysisData = analysisResult
    ? {
        roast:
          analysisResult.analysis?.ai_roast ||
          "Great work on taking your first step towards better fitness! 💪",
        metrics: {
          bmi: {
            value: analysisResult.analysis?.bmi || 24.2,
            status: "Normal",
            color: "#27C94B",
          },
          bodyFat: {
            value: analysisResult.analysis?.body_fat_percentage || 18,
            status: "Athletic",
            color: "#27C94B",
          },
          bmr: {
            value: analysisResult.analysis?.bmr || 1847,
            status: "Calories/day",
            color: "#4F9CFF",
          },
        },
        bodyAnalysis: {
          strengths: analysisResult.analysis?.strengths || [
            "Good overall posture and alignment",
            "Balanced shoulder width",
            "Healthy body composition baseline",
          ],
          improvements: analysisResult.analysis?.improvements || [
            "Core strength needs development",
            "Upper body muscle mass could be increased",
            "Slight forward head posture to address",
          ],
        },
      }
    : {
        // Fallback mock data if no analysis
        roast: "Looking good! Ready to start your fitness journey! 💪",
        metrics: {
          bmi: { value: 24.2, status: "Normal", color: "#27C94B" },
          bodyFat: { value: 18, status: "Athletic", color: "#27C94B" },
          bmr: { value: 1847, status: "Calories/day", color: "#4F9CFF" },
        },
        bodyAnalysis: {
          strengths: [
            "Great motivation to start",
            "Taking the first step",
            "Ready to commit to change",
          ],
          improvements: [
            "Establish consistent routine",
            "Focus on form and technique",
            "Build sustainable habits",
          ],
        },
      };

  if (isLoading) {
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

        <RefreshCw
          size={48}
          color={isDark ? "#DDDDDD" : "#000000"}
          strokeWidth={2}
          style={{ marginBottom: 24 }}
        />

        <Text
          style={{
            fontFamily: "PlusJakartaSans_600SemiBold",
            fontSize: 24,
            color: isDark ? "#DDDDDD" : "#000000",
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          Analyzing Your Photos...
        </Text>

        <Text
          style={{
            fontFamily: "PlusJakartaSans_400Regular",
            fontSize: 16,
            color: isDark ? "#999999" : "#8D8D8D",
            textAlign: "center",
            lineHeight: 24,
          }}
        >
          Our AI is carefully examining your physique and preparing your
          personalized analysis.
        </Text>

        <style jsx global>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </View>
    );
  }

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
            Your Results
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 16,
              color: isDark ? "#999999" : "#8D8D8D",
            }}
          >
            AI analysis complete! Here's what we found.
          </Text>
        </View>

        {/* AI Roast Section */}
        <View
          style={{
            backgroundColor: isDark ? "#262626" : "#F6F6F6",
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            borderLeftWidth: 4,
            borderLeftColor: "#FF6B6B",
          }}
        >
          <Text
            style={{
              fontFamily: "PlusJakartaSans_600SemiBold",
              fontSize: 20,
              color: isDark ? "#DDDDDD" : "#000000",
              marginBottom: 12,
            }}
          >
            🔥 AI Roast
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 16,
              color: isDark ? "#DDDDDD" : "#000000",
              lineHeight: 24,
            }}
          >
            {analysisData.roast}
          </Text>
        </View>

        {/* Metrics Cards */}
        <Text
          style={{
            fontFamily: "PlusJakartaSans_600SemiBold",
            fontSize: 20,
            color: isDark ? "#DDDDDD" : "#000000",
            marginBottom: 16,
          }}
        >
          Your Metrics
        </Text>

        <View style={{ flexDirection: "row", gap: 12, marginBottom: 24 }}>
          {Object.entries(analysisData.metrics).map(([key, metric]) => (
            <View
              key={key}
              style={{
                flex: 1,
                backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                alignItems: "center",
                borderWidth: 1,
                borderColor: isDark ? "#333333" : "#E5E5E5",
              }}
            >
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_600SemiBold",
                  fontSize: 24,
                  color: metric.color,
                  marginBottom: 4,
                }}
              >
                {metric.value}
                {key === "bodyFat" ? "%" : key === "bmr" ? "" : ""}
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_500Medium",
                  fontSize: 12,
                  color: isDark ? "#DDDDDD" : "#000000",
                  marginBottom: 4,
                }}
              >
                {key === "bmi" ? "BMI" : key === "bodyFat" ? "Body Fat" : "BMR"}
              </Text>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_400Regular",
                  fontSize: 10,
                  color: metric.color,
                  textAlign: "center",
                }}
              >
                {metric.status}
              </Text>
            </View>
          ))}
        </View>

        {/* Body Analysis */}
        <Text
          style={{
            fontFamily: "PlusJakartaSans_600SemiBold",
            fontSize: 20,
            color: isDark ? "#DDDDDD" : "#000000",
            marginBottom: 16,
          }}
        >
          Body Analysis
        </Text>

        {/* Strengths */}
        <View
          style={{
            backgroundColor: isDark ? "#1A4A20" : "#DFF8E7",
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <TrendingUp
              size={20}
              color="#27C94B"
              strokeWidth={2}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 16,
                color: "#27C94B",
              }}
            >
              Strengths
            </Text>
          </View>
          {analysisData.bodyAnalysis.strengths.map((strength, index) => (
            <Text
              key={index}
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 14,
                color: isDark ? "#DDDDDD" : "#000000",
                marginBottom: 4,
              }}
            >
              • {strength}
            </Text>
          ))}
        </View>

        {/* Areas for Improvement */}
        <View
          style={{
            backgroundColor: isDark ? "#4A2A1A" : "#FFF5E6",
            borderRadius: 16,
            padding: 20,
            marginBottom: 32,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Target
              size={20}
              color="#FF8A00"
              strokeWidth={2}
              style={{ marginRight: 8 }}
            />
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 16,
                color: "#FF8A00",
              }}
            >
              Areas for Improvement
            </Text>
          </View>
          {analysisData.bodyAnalysis.improvements.map((improvement, index) => (
            <Text
              key={index}
              style={{
                fontFamily: "PlusJakartaSans_400Regular",
                fontSize: 14,
                color: isDark ? "#DDDDDD" : "#000000",
                marginBottom: 4,
              }}
            >
              • {improvement}
            </Text>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={{ gap: 12 }}>
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
            onPress={() => router.push("/(tabs)/workout")}
            activeOpacity={0.8}
          >
            <Zap
              size={20}
              color={isDark ? "#000000" : "#FFFFFF"}
              strokeWidth={2}
            />
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 16,
                color: isDark ? "#000000" : "#FFFFFF",
              }}
            >
              Get Your Workout Plan
            </Text>
            <ArrowRight
              size={20}
              color={isDark ? "#000000" : "#FFFFFF"}
              strokeWidth={2}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: isDark ? "#262626" : "#F6F6F6",
              borderRadius: 16,
              padding: 18,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onPress={() => router.push("/(tabs)/nutrition")}
            activeOpacity={0.8}
          >
            <Heart
              size={20}
              color={isDark ? "#DDDDDD" : "#000000"}
              strokeWidth={2}
            />
            <Text
              style={{
                fontFamily: "PlusJakartaSans_500Medium",
                fontSize: 16,
                color: isDark ? "#DDDDDD" : "#000000",
              }}
            >
              View Nutrition Plan
            </Text>
            <ArrowRight
              size={20}
              color={isDark ? "#666666" : "#8D8D8D"}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
