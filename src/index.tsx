import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/App/App';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;
const rootNode = createRoot(rootElement);

rootNode.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
