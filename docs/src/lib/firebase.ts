// Mock User type to replace Firebase's User
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  getIdToken: () => Promise<string>;
}

// This is a simple authentication service that will be replaced by your backend
// It doesn't actually do any real authentication, but it simulates the flow

// Register callbacks for auth state changes
let authStateListeners: ((user: User | null) => void)[] = [];
let currentUser: User | null = null;

// Helper to notify all listeners
const notifyAuthStateChanged = () => {
  authStateListeners.forEach(listener => listener(currentUser));
};

// Simulate the onAuthStateChanged functionality
export function onAuthStateChanged(
  auth: any,
  callback: (user: User | null) => void
) {
  authStateListeners.push(callback);
  
  // Initial callback with current state
  setTimeout(() => callback(currentUser), 0);
  
  // Return unsubscribe function
  return () => {
    authStateListeners = authStateListeners.filter(listener => listener !== callback);
  };
}

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    // In a real app, this would redirect to Google OAuth
    // For now, we'll just simulate a successful login
    currentUser = {
      uid: 'google-user-123',
      email: 'user@example.com',
      displayName: 'Google User',
      photoURL: null,
      getIdToken: async () => 'mock-token-123'
    };
    
    notifyAuthStateChanged();
    return currentUser;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
};

// Sign in with email/password
export const loginWithEmailPassword = async (email: string, password: string) => {
  try {
    // In a real app, this would validate credentials with the server
    // For now, we'll just simulate a successful login
    currentUser = {
      uid: 'email-user-123',
      email: email,
      displayName: email.split('@')[0],
      photoURL: null,
      getIdToken: async () => 'mock-token-123'
    };
    
    notifyAuthStateChanged();
    return currentUser;
  } catch (error) {
    console.error("Error signing in with email/password: ", error);
    throw error;
  }
};

// Create a new user with email/password
export const registerWithEmailPassword = async (email: string, password: string) => {
  try {
    // In a real app, this would create a new user on the server
    // For now, we'll just simulate a successful registration
    currentUser = {
      uid: 'new-user-' + Date.now(),
      email: email,
      displayName: email.split('@')[0],
      photoURL: null,
      getIdToken: async () => 'mock-token-123'
    };
    
    notifyAuthStateChanged();
    return currentUser;
  } catch (error) {
    console.error("Error registering with email/password: ", error);
    throw error;
  }
};

// Sign out
export const logOut = async () => {
  try {
    currentUser = null;
    notifyAuthStateChanged();
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};

// Mock auth object for compatibility
export const auth = {
  currentUser: null,
  onAuthStateChanged: onAuthStateChanged
};

// No-op mock for other services
export const storage = {};
export const firestore = {};

// For API compatibility
export const googleProvider = {};

// Default export for compatibility
export default { auth };
