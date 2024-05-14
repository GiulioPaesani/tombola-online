import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { WebSocketEvent } from '../../../../types/websocket';
import { GameOptions } from '../../../../types/general';
import axios from 'axios';
import CONSTANTS from '../../assets/CONSTANTS';

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

  private socket: WebSocketSubject<WebSocketEvent> | null = null;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isBrowser) {
      this.socket = webSocket({
        url: CONSTANTS.WEBSOCKET_URL,
        deserializer: (msg) => msg.data,
      });
    }
  }

  // sendMessage = (event: WebSocketEvent) => {
  //   if (!this.socket) return;

  //   this.socket.next(WebSocketEvent);
  // };

  getMessage = () => {
    if (!this.socket) return;

    return this.socket.asObservable();
  };

  createGame = async (gameOptions: GameOptions) => {
    await axios
      .post(`${CONSTANTS.API_BASE_URL}/create-game`, gameOptions)
      .then((respose) => {
        this.gameId = respose.data.gameId;
        this.gameCode = respose.data.gameCode;

        if (respose.status === 200) this.state = 'lobby-host';
      });
  };
}
