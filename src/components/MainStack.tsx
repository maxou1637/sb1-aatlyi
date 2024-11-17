import * as React from "react";
import { Frame } from "@nativescript/core";
import { HomeScreen } from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { MatchesScreen } from "../screens/MatchesScreen";

export function MainStack() {
  const [currentScreen, setCurrentScreen] = React.useState("home");

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case "matches":
        return <MatchesScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <Frame>
      <page>
        <actionBar title="LoveConnect" backgroundColor="#FF6B6B" color="white" />
        <gridLayout rows="*, auto">
          {renderScreen()}
          <stackLayout row="1" orientation="horizontal" className="bg-white p-2">
            <button
              className={`text-center p-2 w-1/3 ${currentScreen === 'home' ? 'text-pink-500' : 'text-gray-500'}`}
              text="Découvrir"
              onTap={() => setCurrentScreen('home')}
            />
            <button
              className={`text-center p-2 w-1/3 ${currentScreen === 'matches' ? 'text-pink-500' : 'text-gray-500'}`}
              text="Matches"
              onTap={() => setCurrentScreen('matches')}
            />
            <button
              className={`text-center p-2 w-1/3 ${currentScreen === 'profile' ? 'text-pink-500' : 'text-gray-500'}`}
              text="Profil"
              onTap={() => setCurrentScreen('profile')}
            />
          </stackLayout>
        </gridLayout>
      </page>
    </Frame>
  );
}