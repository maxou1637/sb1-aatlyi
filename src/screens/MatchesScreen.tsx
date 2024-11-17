import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const mockMatches = [
  { id: '1', name: 'Sophie', lastMessage: 'Salut ! Comment vas-tu ?' },
  { id: '2', name: 'Thomas', lastMessage: 'On se voit demain ?' }
];

export function MatchesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockMatches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.matchItem}>
            <Text style={styles.matchName}>{item.name}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Pas encore de matches</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  matchItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  matchName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lastMessage: {
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});