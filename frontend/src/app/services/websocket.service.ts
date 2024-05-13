import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  test = 'ciaoooo';
  private socket: WebSocketSubject<{ text: string }> | null = null;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (this.isBrowser) {
      console.log(platformId);
      this.socket = webSocket({
        url: 'ws://localhost:8080',
        deserializer: (msg) => msg.data,
      });
    }
  }

  sendMessage = ({ text }: { text: string }) => {
    if (!this.socket) return;

    this.socket.next({ text });
  };

  getMessage = () => {
    if (!this.socket) return;

    return this.socket.asObservable();
  };
}
