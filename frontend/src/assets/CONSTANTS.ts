import { isDevMode } from '@angular/core';

const CONSTANTS = isDevMode()
  ? {
      WEBSOCKET_URL: 'ws://localhost:3000',
      API_BASE_URL: 'http://localhost:5000',
    }
  : {
      WEBSOCKET_URL: 'ws://backend:3000',
      API_BASE_URL: 'http://backend:5000',
    };

export default CONSTANTS;
