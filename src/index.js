import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // ← This MUST be here and FIRST
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);