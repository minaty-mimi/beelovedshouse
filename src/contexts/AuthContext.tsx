import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { supabase } from '../lib/supabase';

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
  createdAt: Date;
  lastLoginAt: Date;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  const isAdmin = userProfile?.role === 'admin';

  // Load user profile
  const loadUserProfile = useCallback(async (user: User) => {
    console.log('AuthContext: Loading user profile for user:', user.uid, user.email);

    // Set profile from Firebase user data
    console.log('AuthContext: Using Firebase auth profile');
    setUserProfile({
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || user.email?.split('@')[0] || 'User',
      role: user.email === 'beelovedshouse@gmail.com' ? 'admin' : 'user', // Set admin role for known admin email
      createdAt: new Date(user.metadata.creationTime || Date.now()),
      lastLoginAt: new Date(user.metadata.lastSignInTime || Date.now())
    });
    console.log('AuthContext: Profile set for Firebase user');
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User state will be updated by the auth state listener
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Set display name
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      
      // User state will be updated by the auth state listener
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  };

  // Sign out
  const logout = async () => {
    console.log('AuthContext: Starting logout process...');

    try {
      await signOut(auth);

      console.log('AuthContext: Clearing local state...');
      setUser(null);
      setUserProfile(null);

      console.log('AuthContext: Logout completed successfully');
    } catch (error) {
      console.error('AuthContext: Exception in logout:', error);
      // Even if something fails, clear local state
      setUser(null);
      setUserProfile(null);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: unknown) {
      throw new Error((error as Error).message);
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !userProfile) return;

    // Update local state only since we're using Firebase-only auth
    setUserProfile({ ...userProfile, ...updates });
  };

  // Listen to auth state changes
  useEffect(() => {
    console.log('AuthContext: Setting up Firebase auth listener');

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('AuthContext: Auth state changed:', firebaseUser);
      
      if (firebaseUser) {
        console.log('AuthContext: User signed in:', firebaseUser.uid, firebaseUser.email);
        setUser(firebaseUser);
        
        // Load user profile
        await loadUserProfile(firebaseUser);
      } else {
        console.log('AuthContext: User signed out, clearing state');
        setUser(null);
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => {
      console.log('AuthContext: Cleaning up Firebase auth listener');
      unsubscribe();
    };
  }, [loadUserProfile]);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    logout,
    resetPassword,
    updateUserProfile,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};