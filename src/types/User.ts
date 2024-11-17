export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: 'homme' | 'femme' | 'autre';
  orientation?: 'hétérosexuel' | 'homosexuel' | 'bisexuel' | 'pansexuel' | 'autre';
  name: string;
  age: number;
  bio: string;
  photos: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  interests: string[];
  loveCoins: number;
  matches: string[];
  likes: string[];
  dislikes: string[];
}

export interface Match {
  id: string;
  users: [string, string];
  timestamp: number;
  messages: Message[];
  lastCallTimestamp?: number;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
}

export interface VideoCall {
  id: string;
  matchId: string;
  initiatorId: string;
  receiverId: string;
  startTime: number;
  duration: number;
  loveCoinsSpent: number;
}