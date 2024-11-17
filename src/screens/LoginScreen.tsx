import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native-web';
import { useUserStore } from '../store/userStore';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { setCurrentUser } = useUserStore();

  const handleSubmit = async () => {
    try {
      // Validation basique
      if (!email || !password) {
        alert('Veuillez remplir tous les champs');
        return;
      }

      if (isLogin) {
        // Simuler une connexion
        const mockUser = {
          id: '123',
          name: 'John Doe',
          age: 25,
          bio: 'Amateur de voyage et de photographie',
          photos: ['https://picsum.photos/seed/john/400/600'],
          location: { latitude: 48.8566, longitude: 2.3522 },
          interests: ['voyage', 'photo', 'sport'],
          loveCoins: 100,
          matches: [],
          likes: [],
          dislikes: []
        };
        setCurrentUser(mockUser);
      } else {
        // Simuler une inscription
        const mockUser = {
          id: '124',
          name: 'New User',
          age: 24,
          bio: 'Nouveau sur LoveConnect',
          photos: ['https://picsum.photos/seed/new/400/600'],
          location: { latitude: 48.8566, longitude: 2.3522 },
          interests: [],
          loveCoins: 50,
          matches: [],
          likes: [],
          dislikes: []
        };
        setCurrentUser(mockUser);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>LoveConnect</Text>
        <Text style={styles.subtitle}>
          {isLogin ? 'Connexion' : 'Inscription'}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          secureTextEntry
          type="password"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {isLogin ? 'Se connecter' : "S'inscrire"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.switchButton} 
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchText}>
            {isLogin 
              ? "Pas encore de compte ? S'inscrire" 
              : 'Déjà un compte ? Se connecter'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FF6B6B',
  },
  card: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF6B6B',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    padding: 10,
  },
  switchText: {
    color: '#FF6B6B',
    textAlign: 'center',
    fontSize: 16,
  },
});