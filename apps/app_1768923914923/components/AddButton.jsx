import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';
import { theme } from '../theme';

export const AddButton = ({ 
  onPress = () => {}, 
  size = 56, 
  backgroundColor = theme.colors.primary 
}) => {
  return (
    <TouchableOpacity 
      onPress={() => onPress()}
      style={[
        styles.button, 
        { 
          width: size, 
          height: size, 
          borderRadius: size / 2,
          backgroundColor 
        }
      ]}
      activeOpacity={0.7}
    >
      <Plus 
        size={24} 
        color={theme.colors.label.primary} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md
  }
});