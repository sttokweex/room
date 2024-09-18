import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import VenomConnectContextComponent from './components/context/VenomConnect.tsx';
import { RoomProvider } from './components/context/RoomProvider.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VenomConnectContextComponent>
      <RoomProvider>
        <App />
      </RoomProvider>
    </VenomConnectContextComponent>
  </React.StrictMode>,
);
