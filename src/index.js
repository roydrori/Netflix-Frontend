import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './auth/authContext';
import axios from 'axios';

axios.defaults.baseURL = 'https://netflix-backend-qdjy.onrender.com/api/';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
reportWebVitals();
