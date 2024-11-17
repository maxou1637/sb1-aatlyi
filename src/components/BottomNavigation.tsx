import * as React from "react";
import { BottomNavigation as BottomNav } from "@nativescript/core";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { MatchesScreen } from "../screens/MatchesScreen";

export function BottomNavigation() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const items = [
    { title: "Découvrir", icon: "res://heart" },
    { title: "Matches", icon: "res://chat" },
    { title: "Profil", icon: "res://person" }
  ];

  const screens = [HomeScreen, MatchesScreen, ProfileScreen];
  const CurrentScreen = screens[selectedIndex];

  return (
    <gridLayout rows="*, auto">
      <ContentView row={0}>
        <CurrentScreen />
      </ContentView>
      <BottomNav
        row={1}
        items={items}
        selectedIndex={selectedIndex}
        onSelectedIndexChanged={(args) => {
          setSelectedIndex(args.newIndex);
        }}
      />
    </gridLayout>
  );
}