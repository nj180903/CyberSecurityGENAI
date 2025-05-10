
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { setupMockApi } from './api/endpoints.ts';

// Setup mock API for development purposes
// In a production environment, this would be replaced with a real backend
setupMockApi();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
