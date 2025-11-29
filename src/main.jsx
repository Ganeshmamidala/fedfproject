import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { getData } from './lib/mockData';
import { ensureMockUsersLoaded } from './lib/supabase';

// Initialize data on app start
console.log('🚀 PlacementHub starting...');
console.log('📍 Current domain:', window.location.hostname);
console.log('📍 Current URL:', window.location.href);

// Force data initialization
const users = ensureMockUsersLoaded();
const initialData = getData();

console.log('📊 Data initialized:', {
  users: users.length,
  jobs: initialData.jobs?.length || 0,
  applications: initialData.applications?.length || 0,
  placements: initialData.placements?.length || 0
});

console.log('✅ PlacementHub ready!');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
