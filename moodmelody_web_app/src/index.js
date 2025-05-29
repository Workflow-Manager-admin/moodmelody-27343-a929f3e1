import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Set global background image using public/assets path so it's not parsed by webpack
document.body.style.background = "url('/assets/20250529_142231_img2.jpg') no-repeat center center fixed";
document.body.style.backgroundSize = "cover";
document.body.style.backgroundAttachment = "fixed";
document.body.style.backgroundBlendMode = "darken";
document.body.style.color = ""; // keep normal color

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
