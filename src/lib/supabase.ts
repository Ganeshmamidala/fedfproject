import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock user data for demo purposes
const mockUsers = [
  {
    id: '1',
    email: 'admin@placementhub.edu',
    password: 'admin123',
    full_name: 'System Administrator',
    role: 'admin'
  },
  {
    id: '2',
    email: 'student@placementhub.edu',
    password: 'student123',
    full_name: 'John Student',
    role: 'student'
  },
  {
    id: '3',
    email: 'employer@company.com',
    password: 'employer123',
    full_name: 'Jane Employer',
    role: 'employer'
  },
  {
    id: '4',
    email: 'officer@placementhub.edu',
    password: 'officer123',
    full_name: 'Mike Officer',
    role: 'placement_officer'
  }
];

// Check if we're using placeholder values (demo mode)
const isDemoMode = supabaseUrl === 'https://placeholder.supabase.co';

export const signUp = async (email: string, password: string, userData: any) => {
  if (isDemoMode) {
    // Mock sign up for demo - simulate successful registration
    return {
      data: {
        user: {
          id: Date.now().toString(),
          email,
          user_metadata: {
            full_name: userData.full_name,
            role: userData.role
          }
        }
      },
      error: null
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  if (isDemoMode) {
    // Mock authentication for demo
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Store mock session in localStorage
      const mockSession = {
        user: {
          id: user.id,
          email: user.email,
          user_metadata: {
            full_name: user.full_name,
            role: user.role
          }
        },
        access_token: 'mock-token',
        expires_at: Date.now() + 3600000 // 1 hour
      };
      
      localStorage.setItem('mock-session', JSON.stringify(mockSession));
      
      return {
        data: {
          user: mockSession.user,
          session: mockSession
        },
        error: null
      };
    } else {
      return {
        data: { user: null, session: null },
        error: { message: 'Invalid email or password' }
      };
    }
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  if (isDemoMode) {
    localStorage.removeItem('mock-session');
    return { error: null };
  }

  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  if (isDemoMode) {
    const mockSession = localStorage.getItem('mock-session');
    if (mockSession) {
      const session = JSON.parse(mockSession);
      if (session.expires_at > Date.now()) {
        return session.user;
      } else {
        localStorage.removeItem('mock-session');
      }
    }
    return null;
  }

  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Mock session management for demo mode
export const getMockSession = () => {
  if (isDemoMode) {
    const mockSession = localStorage.getItem('mock-session');
    if (mockSession) {
      const session = JSON.parse(mockSession);
      if (session.expires_at > Date.now()) {
        return session;
      } else {
        localStorage.removeItem('mock-session');
      }
    }
  }
  return null;
};