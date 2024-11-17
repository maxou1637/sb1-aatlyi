import { firebase } from '@nativescript/firebase-core';
import { Auth, getAuth } from '@nativescript/firebase-auth';

export class AuthService {
  private auth: Auth;

  constructor() {
    this.auth = getAuth(firebase());
  }

  async signUp(email: string, password: string) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Signup failed: ${error.message}`);
    }
  }

  async signIn(email: string, password: string) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  async signOut() {
    try {
      await this.auth.signOut();
    } catch (error) {
      throw new Error(`Signout failed: ${error.message}`);
    }
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
}