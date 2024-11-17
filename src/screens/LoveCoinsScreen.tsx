import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native-web';
import { useUserStore } from '../store/userStore';
import Confetti from 'react-confetti';

const COIN_PACKAGES = [
  { coins: 100, price: 4.99, bonus: 0 },
  { coins: 500, price: 19.99, bonus: 50 },
  { coins: 1000, price: 34.99, bonus: 150 },
  { coins: 2000, price: 59.99, bonus: 400 },
  { coins: 5000, price: 99.99, bonus: 1500 }
];

export function LoveCoinsScreen() {
  const { currentUser, updateLoveCoins } = useUserStore();
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handlePurchase = (coinPackage) => {
    setSelectedPackage(coinPackage);
    updateLoveCoins(coinPackage.coins + coinPackage.bonus);
    
    // Démarrer l'animation de confetti
    setShowConfetti(true);

    // Arrêter l'animation après 5 secondes
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  return (
    <View style={styles.container}>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      <View style={styles.header}>
        <Text style={styles.title}>Acheter des LoveCoins</Text>
        <Text style={styles.balance}>
          Solde actuel: {currentUser?.loveCoins || 0} LoveCoins
        </Text>
      </View>

      <ScrollView style={styles.packagesContainer}>
        {COIN_PACKAGES.map((pkg, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.packageCard,
              selectedPackage === pkg && styles.selectedPackage
            ]}
            onPress={() => handlePurchase(pkg)}
          >
            <View style={styles.packageContent}>
              <View style={styles.coinAmount}>
                <Text style={styles.coinText}>{pkg.coins}</Text>
                <Text style={styles.coinLabel}>LoveCoins</Text>
              </View>
              
              {pkg.bonus > 0 && (
                <View style={styles.bonusTag}>
                  <Text style={styles.bonusText}>+{pkg.bonus} BONUS</Text>
                </View>
              )}
              
              <View style={styles.priceTag}>
                <Text style={styles.priceText}>{pkg.price}€</Text>
              </View>
            </View>

            <View style={styles.valueIndicator}>
              <Text style={styles.valueText}>
                {((pkg.coins + pkg.bonus) / pkg.price).toFixed(1)} coins/€
              </Text>
              {pkg.bonus > 0 && (
                <Text style={styles.savingsText}>
                  Économisez {((pkg.bonus / (pkg.coins + pkg.bonus)) * 100).toFixed(0)}%
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          💝 1 LoveCoin = 10 secondes d'appel vidéo
        </Text>
        <Text style={styles.infoText}>
          🎁 Les bonus sont ajoutés instantanément
        </Text>
        <Text style={styles.infoText}>
          💫 Paiement sécurisé
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  balance: {
    fontSize: 18,
    color: '#666',
  },
  packagesContainer: {
    padding: 20,
  },
  packageCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedPackage: {
    borderColor: '#FF6B6B',
    backgroundColor: '#fff5f5',
  },
  packageContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinAmount: {
    alignItems: 'center',
  },
  coinText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  coinLabel: {
    fontSize: 14,
    color: '#666',
  },
  bonusTag: {
    backgroundColor: '#FFE5E5',
    padding: 8,
    borderRadius: 20,
    position: 'absolute',
    top: -10,
    right: 10,
  },
  bonusText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
    fontSize: 12,
  },
  priceTag: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  valueIndicator: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  valueText: {
    color: '#666',
    fontSize: 12,
  },
  savingsText: {
    color: '#FF6B6B',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  infoText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
});