import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { MantineProvider, createEmotionCache } from '@mantine/core';
import { BrowserRouter } from "react-router-dom"
import App from './app/app';
import { Notifications } from '@mantine/notifications';

const myCache = createEmotionCache({
  key: 'mantine',
  prepend: false
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MantineProvider emotionCache={myCache}>
    <BrowserRouter>
      <Notifications />
      <App />
    </BrowserRouter>
  </MantineProvider>
);
