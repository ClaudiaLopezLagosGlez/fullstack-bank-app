import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
  
);

