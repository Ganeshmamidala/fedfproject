import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, getMockSession, signIn as libSignIn, signUp as libSignUp, signOut as libSignOut } from '../lib/supabase';
import type { User as AppUser } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: AppUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const isDemoMode = import.meta.env.VITE_SUPABASE_URL === 'https://placeholder.supabase.co' || 
                     !import.meta.env.VITE_SUPABASE_URL ||
                     import.meta.env.VITE_SUPABASE_URL === 'your_supabase_url_here';

  useEffect(() => {
    if (isDemoMode) {
      // Handle demo mode authentication
      const mockSession = getMockSession();
      if (mockSession) {
        setUser(mockSession.user);
        setUserProfile({
          id: mockSession.user.id,
          email: mockSession.user.email,
          full_name: mockSession.user.user_metadata.full_name,
          role: mockSession.user.user_metadata.role,
          created_at: new Date().toISOString()
        });
      }
      setLoading(false);

      // Listen for storage changes (for demo logout)
      const handleStorageChange = () => {
        const session = getMockSession();
        if (session) {
          setUser(session.user);
          setUserProfile({
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata.full_name,
            role: session.user.user_metadata.role,
            created_at: new Date().toISOString()
          });
        } else {
          setUser(null);
          setUserProfile(null);
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    } else {
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchUserProfile(session.user.id);
        } else {
          setLoading(false);
        }
      });

      // Listen for auth changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUserProfile(null);
          setLoading(false);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [isDemoMode]);

  const fetchUserProfile = async (userId: string) => {
    if (isDemoMode) {
      // Skip database fetch in demo mode
      return;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const result = await libSignIn(email, password);
    if (!result.error && result.data?.user) {
      // Only set user if it matches the Supabase User type
      setUser(result.data.user as User);
      if (isDemoMode) {
        setUserProfile({
          id: result.data.user.id,
          email: result.data.user.email ?? '',
          full_name: result.data.user.user_metadata?.full_name ?? '',
          role: result.data.user.user_metadata?.role ?? '',
          created_at: new Date().toISOString()
        });
      }
    }
    return result;
  };

  const signUp = async (email: string, password: string, userData: any) => {
    return await libSignUp(email, password, userData);
  };

  const signOut = async () => {
    const result = await libSignOut();
    // Immediately clear state after successful sign-out
    if (!result.error) {
      setUser(null);
      setUserProfile(null);
    }
    // Return void to match AuthContextType
    return;
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};