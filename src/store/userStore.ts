import { create } from 'zustand';
import { User } from '../types/User';

interface UserState {
  currentUser: User | null;
  potentialMatches: User[];
  setCurrentUser: (user: User | null) => void;
  setPotentialMatches: (users: User[]) => void;
  updateUser: (user: User) => void;
  updateLoveCoins: (amount: number) => void;
  removeMatch: (userId: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  potentialMatches: [],
  setCurrentUser: (user) => set({ currentUser: user }),
  setPotentialMatches: (users) => set({ potentialMatches: users }),
  updateUser: (user) => set({ currentUser: user }),
  updateLoveCoins: (amount) => 
    set((state) => ({
      currentUser: state.currentUser 
        ? { ...state.currentUser, loveCoins: (state.currentUser.loveCoins || 0) + amount }
        : null
    })),
  removeMatch: (userId) => 
    set((state) => ({
      potentialMatches: state.potentialMatches.filter(user => user.id !== userId)
    })),
  logout: () => set({ currentUser: null, potentialMatches: [] })
}));