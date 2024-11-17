import { firebase } from '@nativescript/firebase-core';
import { Database, getDatabase } from '@nativescript/firebase-database';
import { User, Match } from '../types/User';

export class MatchService {
  private db: Database;

  constructor() {
    this.db = getDatabase(firebase());
  }

  async like(userId: string, likedUserId: string) {
    const userRef = this.db.ref(`users/${userId}/likes`);
    await userRef.push(likedUserId);

    // Check if it's a match
    const otherUserLikes = await this.db
      .ref(`users/${likedUserId}/likes`)
      .orderByValue()
      .equalTo(userId)
      .once('value');

    if (otherUserLikes.exists()) {
      await this.createMatch(userId, likedUserId);
      return true;
    }
    return false;
  }

  async dislike(userId: string, dislikedUserId: string) {
    const userRef = this.db.ref(`users/${userId}/dislikes`);
    await userRef.push(dislikedUserId);
  }

  private async createMatch(user1Id: string, user2Id: string) {
    const matchRef = this.db.ref('matches').push();
    const match: Match = {
      id: matchRef.key,
      users: [user1Id, user2Id],
      timestamp: Date.now(),
      messages: []
    };
    await matchRef.set(match);
    
    // Update both users' matches
    await this.db.ref(`users/${user1Id}/matches`).push(match.id);
    await this.db.ref(`users/${user2Id}/matches`).push(match.id);
  }

  async getPotentialMatches(userId: string, radius: number = 50) {
    // Implement geolocation-based matching logic here
    const usersRef = this.db.ref('users');
    const snapshot = await usersRef.once('value');
    const users: User[] = [];
    
    snapshot.forEach((child) => {
      const user = child.val() as User;
      if (user.id !== userId) {
        users.push(user);
      }
    });
    
    return users;
  }
}