import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { GameOptions } from '../../../types';
import { WebSocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-create-game-popup',
  standalone: true,
  imports: [],
  templateUrl: './create-game-popup.component.html',
  styleUrl: './create-game-popup.component.css',
})
export class CreateGamePopupComponent {
  createGameResponse = '';

  constructor(public webSocketService: WebSocketService) {}

  onClickCreateGame() {
    this.webSocketService.createGame({});
  }
}
