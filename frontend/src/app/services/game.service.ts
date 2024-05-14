import { Injectable } from '@angular/core';
import { WebSocketEvent } from '../../../../types/websocket';
import CONSTANTS from '../../assets/CONSTANTS';
import { io, Socket } from 'socket.io-client';

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

  public socket: Socket | null = null;

  // private isBrowser: boolean = isPlatformBrowser(this.platformId);

  // constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  //   if (this.isBrowser) {
  // console.log('connection...');
  // this.socket = io(CONSTANTS.WEBSOCKET_URL);
  // socket.on('connect', () => {
  //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  // });
  // this.socket = webSocket({
  //   url: CONSTANTS.WEBSOCKET_URL,
  //   deserializer: (msg) => msg.data,
  //   openObserver: {
  //     next: () => {
  //       console.log('[Frontend] Connessione WebSocket aperta.');
  //     },
  //   },
  //   closeObserver: {
  //     next: () => {
  //       console.log('[Frontend] Connessione WebSocket chiusa.');
  //     },
  //   },
  // });
  // this.socket.subscribe();
  // this.socket.subscribe(
  //   (msg) => console.log('[Frontend] Messaggio ricevuto:', msg),
  //   (err) =>
  //     console.log('[Frontend] Errore nella connessione WebSocket:', err),
  //   () => console.log('[Frontend] Connessione WebSocket completata.')
  // );
  // }
  // }

  connectWebSocket = () => {
    this.socket = io(CONSTANTS.WEBSOCKET_URL);

    this.socket.on('connect', () => {
      console.log('[Frontend] Connesso al socket', this.socket?.id);
    });

    this.socket.on('hostDisconnect', () => {
      this.state = 'home';
      this.gameCode = '';
      this.gameId = '';
    });
  };

  sendMessage = (event: WebSocketEvent) => {
    if (!this.socket) return;

    // this.socket.next(event);
  };

  getMessage = () => {
    if (!this.socket) return;

    // return this.socket.asObservable();
  };
}
