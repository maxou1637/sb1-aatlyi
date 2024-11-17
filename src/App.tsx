import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native-web';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { MatchesScreen } from './screens/MatchesScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { LoveCoinsScreen } from './screens/LoveCoinsScreen';
import { useUserStore } from './store/userStore';

export default function App() {
  const { currentUser } = useUserStore();
  const [currentTab, setCurrentTab] = React.useState('home');

  if (!currentUser) {
    return <LoginScreen />;
  }

  const renderScreen = () => {
    switch (currentTab) {
      case 'home':
        return <HomeScreen />;
      case 'matches':
        return <MatchesScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'coins':
        return <LoveCoinsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, currentTab === 'home' && styles.activeTab]}
          onPress={() => setCurrentTab('home')}
        >
          <Text>❤️</Text>
          <Text style={styles.tabText}>Découvrir</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, currentTab === 'matches' && styles.activeTab]}
          onPress={() => setCurrentTab('matches')}
        >
          <Text>💬</Text>
          <Text style={styles.tabText}>Matches</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, currentTab === 'profile' && styles.activeTab]}
          onPress={() => setCurrentTab('profile')}
        >
          <Text>👤</Text>
          <Text style={styles.tabText}>Profil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, currentTab === 'coins' && styles.activeTab]}
          onPress={() => setCurrentTab('coins')}
        >
          <Text>💰</Text>
          <Text style={styles.tabText}>LoveCoins</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100vh',
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    height: 60,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  activeTab: {
    backgroundColor: '#fff5f5',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  }
});