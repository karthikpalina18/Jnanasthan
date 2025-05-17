import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { ChatProvider } from './context/ChatContext';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ChatProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </ChatProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found!');
}
