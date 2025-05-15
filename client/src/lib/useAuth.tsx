import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from "react";
import { auth, signInWithGoogle, loginWithEmailPassword, registerWithEmailPassword, logOut } from "./firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "./queryClient";

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
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Check if user exists in our database, if not register them
          // This is just a simulation since we're using in-memory storage
          const idToken = await user.getIdToken();
          try {
            // Check if user exists in our backend
            const response = await fetch('/api/users/firebase/' + user.uid, {
              credentials: 'include',
            });
            
            if (response.status === 404) {
              // If user doesn't exist in our backend, create the user
              await apiRequest('POST', '/api/users', {
                username: user.displayName || user.email?.split('@')[0] || 'user',
                email: user.email || 'unknown@example.com',
                displayName: user.displayName || user.email?.split('@')[0] || 'User',
                photoURL: user.photoURL || '',
                firebaseUid: user.uid,
                role: 'user'
              });
            } else if (response.ok) {
              const userData = await response.json();
              setIsAdmin(userData.role === 'admin');
            }
          } catch (error) {
            console.error("Error checking/creating user in backend:", error);
          }
        } catch (error) {
          console.error("Error getting Firebase ID token:", error);
        }
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const googleSignIn = async () => {
    try {
      setLoading(true);
      const user = await signInWithGoogle();
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
      const user = await loginWithEmailPassword(email, password);
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
      const user = await registerWithEmailPassword(email, password);
      if (user) {
        // Register user in our backend
        await apiRequest('POST', '/api/users', {
          username,
          email: user.email || email,
          displayName: username,
          photoURL: user.photoURL || '',
          firebaseUid: user.uid,
          role: 'user'
        });
      }
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
      await logOut();
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
