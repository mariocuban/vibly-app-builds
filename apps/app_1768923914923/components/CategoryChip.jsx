import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';

export const CategoryChip = ({
  category = '',
  selected = false,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(category)}
      style={[
        styles.chip,
        selected && styles.selectedChip
      ]}
      activeOpacity={0.7}
    >
      <Text 
        style={[
          styles.chipText,
          selected && styles.selectedChipText
        ]}
      >
        {category || 'Category'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.background.tertiary,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: theme.colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.label.secondary,
  },
  selectedChipText: {
    color: theme.colors.label.primary,
  }
});