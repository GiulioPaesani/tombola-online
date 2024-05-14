import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-master-lobby',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './master-lobby.component.html',
  styleUrl: './master-lobby.component.css',
})
export class MasterLobbyComponent {
  gameCode = '';
  players: string[] = [];

  constructor(public webSocketService: WebSocketService) {
    this.webSocketService.getMessage()?.subscribe((message) => {
      this.players.push(message);
      console.log('[frontend] messaggio ricevuto:', message);
    });
  }
}
