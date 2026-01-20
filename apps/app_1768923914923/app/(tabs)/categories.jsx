import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Grid, List, Plus } from 'lucide-react-native';

import { theme } from '../../theme';
const mockItems = [
  { id: '1', title: 'Work', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=400&fit=crop', description: 'Professional tasks and projects' },
  { id: '2', title: 'Personal', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', description: 'Personal goals and activities' },
  { id: '3', title: 'Fitness', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop', description: 'Health and wellness objectives' },
];

export default function CategoriesScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState(mockItems);
  const [viewMode, setViewMode] = useState('grid');

  const handleCategoryPress = (category) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/tasks/${category.id}`);
  };

  const toggleViewMode = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  const renderCategoryItem = (category) => (
    <TouchableOpacity 
      key={category.id}
      style={viewMode === 'grid' ? styles.gridCard : styles.listCard}
      activeOpacity={0.8}
      onPress={() => handleCategoryPress(category)}
    >
      <Image 
        source={{ uri: category.image }} 
        style={viewMode === 'grid' ? styles.gridImage : styles.listImage} 
        resizeMode="cover"
      />
      <View style={styles.categoryTextContainer}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Categories</Text>
        <TouchableOpacity 
          style={styles.viewModeButton} 
          onPress={toggleViewMode}
        >
          {viewMode === 'grid' ? <List size={24} /> : <Grid size={24} />}
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {categories && categories.length > 0 ? (
          viewMode === 'grid' ? (
            <View style={styles.gridContainer}>
              {categories.map(renderCategoryItem)}
            </View>
          ) : (
            categories.map(renderCategoryItem)
          )
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No categories found</Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.push('/add-category');
        }}
      >
        <Plus size={24} color={theme.colors.background.secondary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  screenTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: theme.colors.label.primary,
  },
  viewModeButton: {
    padding: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '48%',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: theme.colors.background.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: theme.colors.background.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  gridImage: {
    width: '100%',
    height: 180,
  },
  listImage: {
    width: 120,
    height: 120,
  },
  categoryTextContainer: {
    padding: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.label.primary,
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 15,
    color: theme.colors.label.secondary,
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.background.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 17,
    color: theme.colors.label.secondary,
  },
});