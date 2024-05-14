import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { GameOptions } from '../types';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  state:
    | 'home'
    | 'create'
    | 'join'
    | 'lobby-host'
    | 'lobby-player'
    | 'game-host'
    | 'game-player' = 'home';

  private socket: WebSocketSubject<string> | null = null;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isBrowser) {
      this.socket = webSocket({
        url: 'ws://localhost:3000',
        deserializer: (msg) => msg.data,
      });
      console.log('inizio websocket');
    }
  }

  sendMessage = (text: string) => {
    if (!this.socket) return;

    this.socket.next(text);
  };

  getMessage = () => {
    if (!this.socket) return;

    return this.socket.asObservable();
  };

  createGame = (gameOptions: GameOptions) => {
    console.log('ciao');
    this.state = 'lobby-host';
  };
}
