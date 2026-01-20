import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Camera, Upload, RefreshCw, ArrowRight } from "lucide-react-native";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
} from "@expo-google-fonts/plus-jakarta-sans";

export default function UploadScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
  });

  const [photos, setPhotos] = useState({
    front: null,
    side: null,
    back: null,
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || mediaStatus !== "granted") {
      Alert.alert(
        "Permissions required",
        "Camera and photo library access are required to take and upload photos.",
      );
      return false;
    }
    return true;
  };

  const showImagePickerOptions = (photoType) => {
    Alert.alert("Select Photo", "Choose how you want to add your photo", [
      { text: "Take Photo", onPress: () => takePhoto(photoType) },
      {
        text: "Choose from Library",
        onPress: () => pickFromLibrary(photoType),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const takePhoto = async (photoType) => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPhotos((prev) => ({
          ...prev,
          [photoType]: result.assets[0],
        }));
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const pickFromLibrary = async (photoType) => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPhotos((prev) => ({
          ...prev,
          [photoType]: result.assets[0],
        }));
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick photo");
    }
  };

  const analyzePhotos = async () => {
    const photoCount = Object.values(photos).filter(Boolean).length;

    if (photoCount === 0) {
      Alert.alert("No Photos", "Please upload at least one photo to continue");
      return;
    }

    if (photoCount < 3) {
      Alert.alert(
        "Incomplete Photos",
        `You have uploaded ${photoCount}/3 photos. For the best analysis, please upload all three angles (front, side, back).`,
        [
          { text: "Continue Anyway", onPress: () => proceedToAnalysis() },
          { text: "Add More Photos", style: "cancel" },
        ],
      );
    } else {
      proceedToAnalysis();
    }
  };

  const proceedToAnalysis = async () => {
    setIsAnalyzing(true);

    try {
      // Get current user data
      const userId = global.currentUserId;
      const userData = global.currentUserData;

      if (!userId || !userData) {
        router.push("/(tabs)/onboarding");
        return;
      }

      // Prepare photos data for API
      const photosForAPI = Object.entries(photos)
        .filter(([key, photo]) => photo !== null)
        .map(([type, photo]) => ({
          type,
          uri: photo.uri,
          base64: photo.base64 || null,
        }));

      // Call analysis API
      const response = await fetch("/api/analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          photos: photosForAPI,
          user_data: {
            age: userData.age,
            height_cm: userData.height_cm,
            weight_kg: userData.weight_kg,
            activity_level: userData.activity_level,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const analysisResult = await response.json();

      // Store analysis results globally for results page
      global.currentAnalysis = analysisResult;

      // Navigate to results
      router.push("/(tabs)/results");
    } catch (error) {
      console.error("Analysis error:", error);
      Alert.alert(
        "Analysis Failed",
        "There was an error analyzing your photos. Please try again.",
        [{ text: "OK" }],
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const photoSections = [
    {
      key: "front",
      title: "Front View",
      description: "Stand straight facing the camera",
      icon: Camera,
    },
    {
      key: "side",
      title: "Side View",
      description: "Turn to your side (profile view)",
      icon: Camera,
    },
    {
      key: "back",
      title: "Back View",
      description: "Turn around showing your back",
      icon: Camera,
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
            Upload Photos
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 16,
              color: isDark ? "#999999" : "#8D8D8D",
              lineHeight: 24,
            }}
          >
            Take or upload 3 photos for the most accurate AI analysis of your
            physique
          </Text>
        </View>

        {/* Photo Upload Sections */}
        {photoSections.map((section) => {
          const IconComponent = section.icon;
          const hasPhoto = photos[section.key];

          return (
            <TouchableOpacity
              key={section.key}
              style={{
                backgroundColor: isDark ? "#262626" : "#F6F6F6",
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
                borderWidth: hasPhoto ? 2 : 0,
                borderColor: "#27C94B",
              }}
              onPress={() => showImagePickerOptions(section.key)}
              activeOpacity={0.8}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: hasPhoto
                      ? "#27C94B20"
                      : isDark
                        ? "#444444"
                        : "#DDDDDD",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 16,
                  }}
                >
                  <IconComponent
                    size={24}
                    color={
                      hasPhoto ? "#27C94B" : isDark ? "#999999" : "#8D8D8D"
                    }
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
                    {section.title}
                    {hasPhoto && <Text style={{ color: "#27C94B" }}> ✓</Text>}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "PlusJakartaSans_400Regular",
                      fontSize: 14,
                      color: isDark ? "#999999" : "#8D8D8D",
                    }}
                  >
                    {section.description}
                  </Text>
                </View>
                <Upload
                  size={20}
                  color={isDark ? "#666666" : "#8D8D8D"}
                  strokeWidth={2}
                />
              </View>

              {hasPhoto && (
                <View
                  style={{
                    height: 200,
                    borderRadius: 12,
                    overflow: "hidden",
                    backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
                  }}
                >
                  <Image
                    source={{ uri: hasPhoto.uri }}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                  />
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* Analysis Instructions */}
        <View
          style={{
            backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
            borderRadius: 16,
            padding: 20,
            marginBottom: 32,
            borderLeftWidth: 4,
            borderLeftColor: "#4F9CFF",
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
            Tips for best results:
          </Text>
          <Text
            style={{
              fontFamily: "PlusJakartaSans_400Regular",
              fontSize: 14,
              color: isDark ? "#999999" : "#8D8D8D",
              lineHeight: 20,
            }}
          >
            • Wear fitted clothing or workout attire{"\n"}• Ensure good lighting
            {"\n"}• Stand relaxed with arms slightly away from body{"\n"}• Keep
            consistent distance from camera
          </Text>
        </View>

        {/* Analyze Button */}
        <TouchableOpacity
          style={{
            backgroundColor: isDark ? "#DDDDDD" : "#000000",
            borderRadius: 16,
            padding: 18,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            opacity: isAnalyzing ? 0.7 : 1,
          }}
          onPress={analyzePhotos}
          disabled={isAnalyzing}
          activeOpacity={0.8}
        >
          {isAnalyzing ? (
            <>
              <RefreshCw
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
                Analyzing...
              </Text>
            </>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: "PlusJakartaSans_500Medium",
                  fontSize: 16,
                  color: isDark ? "#000000" : "#FFFFFF",
                }}
              >
                Start AI Analysis
              </Text>
              <ArrowRight
                size={20}
                color={isDark ? "#000000" : "#FFFFFF"}
                strokeWidth={2}
              />
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
