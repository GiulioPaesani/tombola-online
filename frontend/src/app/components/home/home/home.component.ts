import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGamePopupComponent } from '../create-game-popup/create-game-popup.component';
import { GameOptions } from '../../../types';
import { EventEmitter } from 'stream';
import { WebSocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CreateGamePopupComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isCreateGamePopupVisible = false;

  openCreateGamePopup() {
    this.isCreateGamePopupVisible = true;
  }
}
