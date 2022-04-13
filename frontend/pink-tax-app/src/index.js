/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOMClient from 'react-dom/client';

import './index.css';
import App from './App';

const container = document.getElementById('root');
// Create a root.
const root = ReactDOMClient.createRoot(container);
root.render(
  <App />,
);
