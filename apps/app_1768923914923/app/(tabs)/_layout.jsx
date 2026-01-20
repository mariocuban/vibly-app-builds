import { Tabs } from 'expo-router';
import { Grid, PlusCircle } from 'lucide-react-native';
import { theme } from '../../theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.label.tertiary,
        tabBarStyle: {
          backgroundColor: theme.colors.background.secondary,
          borderTopColor: theme.colors.separator,
          borderTopWidth: 0.5,
          paddingTop: 8,
          paddingBottom: 28,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="tasklist"
        options={{
          title: 'TaskList',
          tabBarIcon: ({ color, focused }) => (
            <Grid size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="addtask"
        options={{
          title: 'AddTask',
          tabBarIcon: ({ color, focused }) => (
            <PlusCircle size={24} color={color} fill={focused ? color : 'transparent'} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ color, focused }) => (
            <Grid size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
