import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatboxWidget from './ChatboxWidget';
import './index.css';

const root = document.createElement('div');
document.body.appendChild(root);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ChatboxWidget />
  </React.StrictMode>
);
