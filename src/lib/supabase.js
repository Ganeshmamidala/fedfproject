import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Default mock user data for demo purposes
const defaultMockUsers = [
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

// Load users from localStorage or use defaults
const loadMockUsers = () => {
  try {
    const stored = localStorage.getItem('mock-users');
    if (stored) {
      const users = JSON.parse(stored);
      console.log('✅ Loaded', users.length, 'users from localStorage');
      return users;
    }
  } catch (error) {
    console.error('❌ Error loading mock users:', error);
  }
  // If no stored users, initialize with defaults and save them
  console.log('🔄 No stored users found, initializing with', defaultMockUsers.length, 'default users');
  const defaults = [...defaultMockUsers];
  saveMockUsers(defaults);
  return defaults;
};

// Save users to localStorage
const saveMockUsers = (users) => {
  try {
    localStorage.setItem('mock-users', JSON.stringify(users));
    console.log('💾 Saved', users.length, 'users to localStorage');
  } catch (error) {
    console.error('❌ Error saving mock users:', error);
  }
};

// Initialize mock users from localStorage
let mockUsers = loadMockUsers();

// Export function to ensure users are loaded (can be called from main.jsx)
export const ensureMockUsersLoaded = () => {
  mockUsers = loadMockUsers();
  return mockUsers;
};

// Check if we're using placeholder values (demo mode)
const isDemoMode = supabaseUrl === 'https://placeholder.supabase.co';

export const signUp = async (email, password, userData) => {
  try {
    console.log('supabase.signUp called with:', { email, userData, isDemoMode });
    
    if (isDemoMode) {
      // Reload users from localStorage to get latest
      mockUsers = loadMockUsers();
      
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        console.log('User already exists');
        return {
          data: { user: null, session: null },
          error: { message: 'User with this email already exists' }
        };
      }

      // Mock registration - add new user to mock users
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        full_name: userData.full_name,
        role: userData.role
      };
      
      console.log('Creating new user:', newUser);
      mockUsers.push(newUser);
      
      // Save updated users to localStorage
      saveMockUsers(mockUsers);
      
      // Automatically log in the new user
      const mockSession = {
        user: {
          id: newUser.id,
          email: newUser.email,
          user_metadata: {
            full_name: newUser.full_name,
            role: newUser.role
          }
        },
        access_token: 'mock-token-' + newUser.id,
        expires_at: Date.now() + 3600000 // 1 hour
      };
      
      localStorage.setItem('mock-session', JSON.stringify(mockSession));
      console.log('User created and logged in:', mockSession);
      
      return {
        data: {
          user: mockSession.user,
          session: mockSession
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
  } catch (error) {
    console.error('Error in signUp:', error);
    return {
      data: null,
      error: { message: error.message || 'Failed to create account' }
    };
  }
};

export const signIn = async (email, password) => {
  if (isDemoMode) {
    // Reload users from localStorage to get latest registered users
    mockUsers = loadMockUsers();
    console.log('═══════════════════════════════════════════');
    console.log('🔐 SIGN IN ATTEMPT');
    console.log('Email:', email);
    console.log('Total users in database:', mockUsers.length);
    console.log('All registered emails:', mockUsers.map(u => u.email));
    
    // Mock authentication for demo
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      console.log('✅ User found! Logging in:', user.email);
      console.log('User details:', { name: user.full_name, role: user.role });
      
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
        access_token: 'mock-token-' + user.id,
        expires_at: Date.now() + 3600000 // 1 hour
      };
      
      localStorage.setItem('mock-session', JSON.stringify(mockSession));
      console.log('✅ Session created successfully');
      console.log('═══════════════════════════════════════════');
      
      return {
        data: {
          user: mockSession.user,
          session: mockSession
        },
        error: null
      };
    } else {
      // Check if email exists
      const emailExists = mockUsers.find(u => u.email === email);
      if (emailExists) {
        console.log('❌ Email found but password is incorrect');
      } else {
        console.log('❌ Email not found in database');
        console.log('💡 Hint: Available demo accounts:');
        defaultMockUsers.forEach(u => {
          console.log(`   - ${u.email} / ${u.password} (${u.role})`);
        });
      }
      console.log('═══════════════════════════════════════════');
      
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
// Utility function to reset mock data (useful for testing)
export const resetMockData = () => {
  localStorage.removeItem('mock-users');
  localStorage.removeItem('mock-session');
  mockUsers = [...defaultMockUsers];
  saveMockUsers(mockUsers);
  console.log('Mock data reset to defaults');
};

// Utility function to view all registered users (for debugging)
export const viewMockUsers = () => {
  if (isDemoMode) {
    const users = loadMockUsers();
    console.log('Registered users:', users.map(u => ({ email: u.email, full_name: u.full_name, role: u.role })));
    return users;
  }
  return [];
};

// Get database statistics
export const getDatabaseStats = () => {
  if (!isDemoMode) {
    console.log('Database stats only available in demo mode');
    return null;
  }

  const users = loadMockUsers();
  const currentSession = getMockSession();
  
  // Count users by role
  const stats = {
    totalUsers: users.length,
    defaultUsers: defaultMockUsers.length,
    newRegistrations: users.length - defaultMockUsers.length,
    currentlySignedIn: currentSession ? 1 : 0,
    byRole: {
      admin: users.filter(u => u.role === 'admin').length,
      student: users.filter(u => u.role === 'student').length,
      employer: users.filter(u => u.role === 'employer').length,
      placement_officer: users.filter(u => u.role === 'placement_officer').length
    },
    currentUser: currentSession ? {
      email: currentSession.user.email,
      full_name: currentSession.user.user_metadata.full_name,
      role: currentSession.user.user_metadata.role
    } : null
  };

  // Display formatted statistics
  console.log('\n═══════════════════════════════════════════');
  console.log('📊 DATABASE STATISTICS');
  console.log('═══════════════════════════════════════════');
  console.log(`👥 Total Registered Users: ${stats.totalUsers}`);
  console.log(`📝 New Registrations: ${stats.newRegistrations}`);
  console.log(`✅ Currently Signed In: ${stats.currentlySignedIn}`);
  console.log('\n📋 Users by Role:');
  console.log(`   👨‍💼 Admins: ${stats.byRole.admin}`);
  console.log(`   🎓 Students: ${stats.byRole.student}`);
  console.log(`   🏢 Employers: ${stats.byRole.employer}`);
  console.log(`   👔 Placement Officers: ${stats.byRole.placement_officer}`);
  
  if (stats.currentUser) {
    console.log('\n🔐 Current Session:');
    console.log(`   Name: ${stats.currentUser.full_name}`);
    console.log(`   Email: ${stats.currentUser.email}`);
    console.log(`   Role: ${stats.currentUser.role}`);
  } else {
    console.log('\n🔓 No active session');
  }
  console.log('═══════════════════════════════════════════\n');

  return stats;
};

// Get list of all users with details
export const listAllUsers = () => {
  if (!isDemoMode) {
    console.log('User list only available in demo mode');
    return [];
  }

  const users = loadMockUsers();
  
  console.log('\n═══════════════════════════════════════════');
  console.log('📋 ALL REGISTERED USERS');
  console.log('═══════════════════════════════════════════');
  
  users.forEach((user, index) => {
    const isDefault = defaultMockUsers.some(du => du.id === user.id);
    const marker = isDefault ? '🔹' : '🆕';
    console.log(`\n${marker} User ${index + 1}:`);
    console.log(`   Name: ${user.full_name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role: ${user.role}`);
    console.log(`   Type: ${isDefault ? 'Default' : 'New Registration'}`);
  });
  
  console.log('\n═══════════════════════════════════════════\n');
  
  return users;
};

// Export all users to JSON (for backup/analysis)
export const exportUsers = () => {
  if (!isDemoMode) {
    console.log('Export only available in demo mode');
    return null;
  }

  const users = loadMockUsers();
  const exportData = {
    exportDate: new Date().toISOString(),
    totalUsers: users.length,
    users: users.map(u => ({
      id: u.id,
      email: u.email,
      full_name: u.full_name,
      role: u.role
    }))
  };

  console.log('📦 User data exported:', exportData);
  console.log('💾 Copy the object above to save user data');
  
  return exportData;
};
