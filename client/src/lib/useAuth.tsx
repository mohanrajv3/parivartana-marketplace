import { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

// Simple User interface to replace Firebase's User
export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  isAdmin: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<User | null>;
  login: (email: string, password: string) => Promise<User | null>;
  register: (email: string, password: string, username: string) => Promise<User | null>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  const googleSignIn = async () => {
    try {
      setLoading(true);
      // Simulate a successful Google sign-in
      const user: User = {
        uid: 'google-user-123',
        email: 'user@example.com',
        displayName: 'Google User',
        photoURL: null,
        isAdmin: false
      };
      setCurrentUser(user);
      return user;
    } catch (error) {
      toast({
        title: "Sign-in Failed",
        description: "Could not sign in with Google. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Check if this is our admin user
      const isAdminUser = email === 'admin@example.com';
      setIsAdmin(isAdminUser);
      
      const user: User = {
        uid: 'email-user-' + Date.now(),
        email: email,
        displayName: email.split('@')[0],
        photoURL: null,
        isAdmin: isAdminUser
      };
      
      setCurrentUser(user);
      return user;
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      setLoading(true);
      const user: User = {
        uid: 'new-user-' + Date.now(),
        email: email,
        displayName: username,
        photoURL: null,
        isAdmin: false
      };
      
      setCurrentUser(user);
      return user;
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Could not create account. Email may already be in use.",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setCurrentUser(null);
      setIsAdmin(false);
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: "Could not log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  const contextValue: AuthContextType = {
    currentUser,
    loading,
    signInWithGoogle: googleSignIn,
    login,
    register,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
