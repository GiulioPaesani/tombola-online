import { isDevMode } from '@angular/core';

const CONSTANTS = isDevMode()
  ? {
      WEBSOCKET_URL: 'ws://localhost:3030',
      API_BASE_URL: 'http://localhost:5050',
    }
  : {
      WEBSOCKET_URL: 'wss://wss.tombola-online.it',
      API_BASE_URL: 'https://api.tombola-online.it',
    };

export default CONSTANTS;
