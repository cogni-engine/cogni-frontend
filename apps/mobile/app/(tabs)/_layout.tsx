import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide default header
        tabBarStyle: { display: 'none' }, // Hide tab bar since we only have one tab
      }}
    >
      <Tabs.Screen 
        name="index"
        options={{
          title: 'Home',
        }}
      />
    </Tabs>
  );
}

