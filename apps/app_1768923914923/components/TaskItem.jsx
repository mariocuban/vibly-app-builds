import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check, Trash2 } from 'lucide-react-native';
import { theme } from '../theme';

export const TaskItem = ({ 
  task = { 
    id: '', 
    text: 'Untitled Task', 
    completed: false 
  }, 
  onToggle = () => {}, 
  onDelete = () => {} 
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
      >
        <View style={[
          styles.checkbox, 
          task.completed && styles.checkboxCompleted
        ]}>
          {task.completed && (
            <Check 
              size={16} 
              color={theme.colors.label.primary} 
            />
          )}
        </View>
        <Text 
          style={[
            styles.taskText, 
            task.completed && styles.completedText
          ]}
        >
          {task.text || 'Untitled Task'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => onDelete(task.id)}
        activeOpacity={0.7}
      >
        <Trash2 
          size={20} 
          color={theme.colors.error} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.secondary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    ...theme.shadows.sm
  },
  checkboxContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    flex: 1
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.label.tertiary,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxCompleted: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary
  },
  taskText: {
    fontSize: 16,
    color: theme.colors.label.primary,
    flex: 1
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: theme.colors.label.secondary
  },
  deleteButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22
  }
});