// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import './index.css'; 


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ChatProvider } from './context/ChatContext'; // ✅ Import the context provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatProvider> {/* ✅ Wrap App with ChatProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChatProvider>
  </React.StrictMode>
);
