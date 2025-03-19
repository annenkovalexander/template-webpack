import React from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root') as HTMLElement;
const rootNode = createRoot(rootElement);

rootNode.render(
  <React.StrictMode>
    <h1>Hello world!</h1>
  </React.StrictMode>
);
