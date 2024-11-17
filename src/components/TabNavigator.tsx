import * as React from "react";
import { tabNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { MatchesScreen } from "../screens/MatchesScreen";
import { Color } from "@nativescript/core";

const TabNavigator = tabNavigatorFactory();

export function TabNavigatorComponent() {
  return (
    <TabNavigator.Navigator
      screenOptions={{
        tabBarActiveTintColor: new Color("#FF6B6B"),
        tabBarInactiveTintColor: new Color("#999999"),
      }}
    >
      <TabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Découvrir",
          tabBarIcon: ({ focused, color }) => ({
            name: focused ? "heart" : "heart-outline",
            color: color
          })
        }}
      />
      <TabNavigator.Screen
        name="Matches"
        component={MatchesScreen}
        options={{
          tabBarLabel: "Matches",
          tabBarIcon: ({ focused, color }) => ({
            name: focused ? "chat" : "chat-outline",
            color: color
          })
        }}
      />
      <TabNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profil",
          tabBarIcon: ({ focused, color }) => ({
            name: focused ? "person" : "person-outline",
            color: color
          })
        }}
      />
    </TabNavigator.Navigator>
  );
}