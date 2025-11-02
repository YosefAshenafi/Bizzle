import React, { createContext, useContext, useState, useEffect } from 'react';
// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // TODO: Configure Firebase when ready
    // GoogleSignin.configure({
    //   webClientId: '753328004035-kl4a6kr531fc920umdnn2qakp1mgjess.apps.googleusercontent.com',
    // });

    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber;
    
    // For now, simulate a logged-in user for testing
    const mockUser = {
      uid: 'mock-user-123',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: null,
    };
    setUser(mockUser);
    setInitializing(false);
    setLoading(false);
  }, []);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    try {
      // TODO: Implement Firebase Google Sign-In
      // For now, simulate successful Google sign-in with realistic data
      const mockGoogleUser = {
        uid: 'google-user-' + Date.now(),
        email: 'user@gmail.com',
        displayName: 'Google User',
        photoURL: 'https://via.placeholder.com/100',
      };
      setUser(mockGoogleUser);
      return mockGoogleUser;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email, password, displayName) => {
    try {
      // TODO: Implement Firebase Email Sign-Up
      console.log('Email Sign-Up not configured yet');
      // For now, simulate successful sign-up
      const mockUser = {
        uid: 'mock-user-email',
        email: email,
        displayName: displayName,
        photoURL: null,
      };
      setUser(mockUser);
      return mockUser;
    } catch (error) {
      console.error('Sign Up Error:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      // TODO: Implement Firebase Email Sign-In
      console.log('Email Sign-In not configured yet');
      // For now, simulate successful sign-in
      const mockUser = {
        uid: 'mock-user-email',
        email: email,
        displayName: 'Email User',
        photoURL: null,
      };
      setUser(mockUser);
      return mockUser;
    } catch (error) {
      console.error('Sign In Error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // TODO: Implement Firebase Sign-Out
      // await auth().signOut();
      // await GoogleSignin.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign Out Error:', error);
      throw error;
    }
  };

  const saveUserProfile = async (user) => {
    try {
      // TODO: Implement Firebase user profile saving
      console.log('Save user profile not configured yet');
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const updateUserStats = async (stats) => {
    if (!user) return;
    
    try {
      // TODO: Implement Firebase user stats updating
      console.log('Update user stats not configured yet');
    } catch (error) {
      console.error('Error updating user stats:', error);
    }
  };

  const getUserProfile = async (uid) => {
    try {
      // TODO: Implement Firebase user profile retrieval
      console.log('Get user profile not configured yet');
      return null;
    } catch (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
  };

  if (initializing) {
    return null;
  }

  const value = {
    user,
    loading,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    updateUserStats,
    getUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};