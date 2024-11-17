import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Polyfill global pour react-native-web
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.global = window;
}

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);