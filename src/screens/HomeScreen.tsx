import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native-web';
import { SwipeCard } from '../components/SwipeCard';
import { VideoCallModal } from '../components/VideoCallModal';
import { useUserStore } from '../store/userStore';

const mockUsers = [
  {
    id: '1',
    name: 'Sophie',
    age: 25,
    bio: 'Passionnée de voyage et de photographie. Toujours à la recherche de nouvelles aventures ! 🌍✈️',
    photos: ['https://picsum.photos/seed/sophie/400/600'],
    location: { latitude: 48.8566, longitude: 2.3522 },
    interests: ['voyage', 'photo', 'cuisine'],
    loveCoins: 100,
    matches: [],
    likes: [],
    dislikes: []
  },
  {
    id: '2',
    name: 'Thomas',
    age: 28,
    bio: 'Amateur de cuisine et de sport. Je cherche quelqu\'un pour partager mes passions ! 🏃‍♂️👨‍🍳',
    photos: ['https://picsum.photos/seed/thomas/400/600'],
    location: { latitude: 48.8566, longitude: 2.3522 },
    interests: ['cuisine', 'sport', 'musique'],
    loveCoins: 50,
    matches: [],
    likes: [],
    dislikes: []
  },
  {
    id: '3',
    name: 'Emma',
    age: 24,
    bio: 'Artiste peintre et musicienne. La créativité est ma plus grande source d\'inspiration ! 🎨🎵',
    photos: ['https://picsum.photos/seed/emma/400/600'],
    location: { latitude: 48.8566, longitude: 2.3522 },
    interests: ['art', 'musique', 'lecture'],
    loveCoins: 75,
    matches: [],
    likes: [],
    dislikes: []
  },
  {
    id: '4',
    name: 'Lucas',
    age: 29,
    bio: 'Développeur web et passionné de technologie. Geek assumé cherchant sa player 2 ! 🎮💻',
    photos: ['https://picsum.photos/seed/lucas/400/600'],
    location: { latitude: 48.8566, longitude: 2.3522 },
    interests: ['technologie', 'jeux vidéo', 'cinéma'],
    loveCoins: 120,
    matches: [],
    likes: [],
    dislikes: []
  },
  {
    id: '5',
    name: 'Julie',
    age: 26,
    bio: 'Prof de yoga et amoureuse de la nature. À la recherche d\'une âme zen ! 🧘‍♀️🌿',
    photos: ['https://picsum.photos/seed/julie/400/600'],
    location: { latitude: 48.8566, longitude: 2.3522 },
    interests: ['yoga', 'méditation', 'écologie'],
    loveCoins: 90,
    matches: [],
    likes: [],
    dislikes: []
  },
  {
    id: '6',
    name: 'Antoine',
    age: 27,
    bio: 'Barista et amateur de café. Je saurai vous réveiller avec le sourire ! ☕️😊',
    photos: ['https://picsum.photos/seed/antoine/400/600'],
    location: { latitude: 48.8566, longitude: 2.3522 },
    interests: ['café', 'gastronomie', 'voyage'],
    loveCoins: 60,
    matches: [],
    likes: [],
    dislikes: []
  }
];

export function HomeScreen() {
  const [users, setUsers] = useState(mockUsers);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [matchedUser, setMatchedUser] = useState<any>(null);
  const { removeMatch } = useUserStore();

  const handleSwipeLeft = () => {
    setLastAction('dislike');
    setUsers(prevUsers => prevUsers.slice(1));
  };

  const handleSwipeRight = () => {
    setLastAction('like');
    const currentUser = users[0];
    setUsers(prevUsers => prevUsers.slice(1));
    
    // Simuler un match avec une probabilité de 30%
    if (Math.random() < 0.3) {
      setMatchedUser(currentUser);
    }
  };

  const handleCloseVideoCall = () => {
    setMatchedUser(null);
    if (matchedUser) {
      removeMatch(matchedUser.id);
    }
  };

  return (
    <View style={styles.container}>
      {users.length > 0 ? (
        <View style={styles.cardContainer}>
          {users.map((user, index) => (
            index === 0 && (
              <SwipeCard
                key={user.id}
                user={user}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              />
            )
          ))}
          {lastAction && (
            <View style={[
              styles.actionIndicator,
              lastAction === 'like' ? styles.likeIndicator : styles.dislikeIndicator
            ]}>
              <Text style={styles.actionText}>
                {lastAction === 'like' ? '❤️' : '👎'}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Plus de profils disponibles</Text>
          <Text style={styles.emptySubtext}>Revenez plus tard !</Text>
          <View style={styles.refreshButton} onClick={() => setUsers(mockUsers)}>
            <Text style={styles.refreshButtonText}>Rafraîchir les profils</Text>
          </View>
        </View>
      )}

      {matchedUser && (
        <VideoCallModal
          matchedUser={matchedUser}
          onClose={handleCloseVideoCall}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    cursor: 'pointer',
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionIndicator: {
    position: 'absolute',
    top: 20,
    padding: 10,
    borderRadius: 20,
    opacity: 0.8,
  },
  likeIndicator: {
    right: 20,
    backgroundColor: '#44dd44',
  },
  dislikeIndicator: {
    left: 20,
    backgroundColor: '#ff4444',
  },
  actionText: {
    fontSize: 24,
  },
});