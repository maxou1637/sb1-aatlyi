import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from './src/screens/HomeScreen';
import { MatchesScreen } from './src/screens/MatchesScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#FF6B6B',
            tabBarInactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen 
            name="Découvrir" 
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <span style={{ color }}>❤️</span>
              ),
            }}
          />
          <Tab.Screen 
            name="Matches" 
            component={MatchesScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <span style={{ color }}>💬</span>
              ),
            }}
          />
          <Tab.Screen 
            name="Profil" 
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color }) => (
                <span style={{ color }}>👤</span>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100vh',
  },
});