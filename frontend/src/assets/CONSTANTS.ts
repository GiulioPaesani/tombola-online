import { isDevMode } from '@angular/core';

const CONSTANTS = isDevMode()
  ? {
      WEBSOCKET_URL: 'ws://localhost:3000',
      API_BASE_URL: 'http://localhost:5000',
    }
  : {
      WEBSOCKET_URL: 'ws://host.docker.internal:3000',
      API_BASE_URL: 'http://host.docker.internal:5000',
    };

export default CONSTANTS;
