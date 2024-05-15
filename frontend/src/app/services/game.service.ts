import { Injectable } from '@angular/core';
import CONSTANTS from '../../assets/CONSTANTS';
import { io, Socket } from 'socket.io-client';
import { Toast } from '../types';
import { GameOptions } from '../../../../types/general';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  gameId = '';
  gameCode = '';
  state:
    | 'home'
    | 'create'
    | 'join'
    | 'lobby-host'
    | 'lobby-player'
    | 'game-host'
    | 'game-player' = 'home';
  toasts: Toast[] = [];
  gameOptions: GameOptions | null = null;

  public socket: Socket | null = null;

  connectWebSocket = () => {
    this.socket = io(CONSTANTS.WEBSOCKET_URL);

    this.socket.on('connect', () => {
      console.log('[Frontend] Connesso al socket', this.socket?.id);
    });

    this.socket.on('hostDisconnect', () => {
      this.showToast({
        type: 'error',
        text: `L'host della partita si è disconnesso`,
      });
      this.restartGame();
    });
  };

  restartGame = () => {
    this.state = 'home';
    this.gameCode = '';
    this.gameId = '';
    this.gameOptions = null;
  };

  showToast = (toast: Omit<Toast, 'toastId'>) => {
    const toastId = new Date().getTime().toString();
    this.toasts.push({
      toastId,
      ...toast,
    });

    setTimeout(() => {
      this.toasts = this.toasts.filter((toast) => toast.toastId !== toastId);
    }, 3000);
  };
}
