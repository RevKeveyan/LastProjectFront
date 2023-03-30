import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './authContext/AuthContext';
import { PostProvider } from './postContext/postContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <PostProvider>
          <App />
      </PostProvider>
    </AuthProvider>
  </BrowserRouter>
);

