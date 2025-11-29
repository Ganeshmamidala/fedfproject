import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { getData } from './lib/mockData';

// Initialize data on app start
console.log('🚀 PlacementHub starting...');
console.log('📍 Current domain:', window.location.hostname);
getData(); // This will initialize data if not present

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
