

import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

import App from './src/App';
import './src/index.css';
import { ChatProvider } from './src/context/ChatContext'; // ✅ Import the context provider


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ChatProvider>
  </React.StrictMode>
);

