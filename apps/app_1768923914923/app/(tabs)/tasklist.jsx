import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Plus, Check, MoreHorizontal } from 'lucide-react-native';
import { theme } from '../../theme';

const mockItems = [
  { id: '1', title: 'Item 1', image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=400&fit=crop', description: 'Description for item 1' },
  { id: '2', title: 'Item 2', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', description: 'Description for item 2' },
  { id: '3', title: 'Item 3', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=400&fit=crop', description: 'Description for item 3' },
];

export default function TaskListScreen() {
  const router = useRouter();
  const [items, setItems] = useState(mockItems);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItemSelection = (itemId) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedItems(current => 
      current.includes(itemId) 
        ? current.filter(id => id !== itemId)
        : [...current, itemId]
    );
  };

  const handleAddTask = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/add-task');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddTask}
        >
          <Plus size={24} color={theme.colors.label.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items && items.length > 0 && items.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInDown.delay(index * 50).springify()}
            style={styles.taskCard}
          >
            <TouchableOpacity 
              style={styles.taskContent}
              onPress={() => toggleItemSelection(item.id)}
            >
              <Image 
                source={{ uri: item.image }} 
                style={styles.taskImage} 
                resizeMode="cover"
              />
              <View style={styles.taskTextContainer}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDescription} numberOfLines={2}>
                  {item.description}
                </Text>
              </View>
              <TouchableOpacity 
                style={[
                  styles.checkButton, 
                  selectedItems.includes(item.id) && styles.selectedCheckButton
                ]}
                onPress={() => toggleItemSelection(item.id)}
              >
                {selectedItems.includes(item.id) && (
                  <Check size={16} color={theme.colors.label.primary} />
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    ...theme.typography.largeTitle,
    color: theme.colors.label.primary,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.fill.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  taskCard: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: theme.colors.background.secondary,
    ...theme.shadows.card,
    overflow: 'hidden',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  taskImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  taskTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  taskTitle: {
    ...theme.typography.headline,
    color: theme.colors.label.primary,
    marginBottom: 4,
  },
  taskDescription: {
    ...theme.typography.body,
    color: theme.colors.label.secondary,
  },
  checkButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.fill.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheckButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
});