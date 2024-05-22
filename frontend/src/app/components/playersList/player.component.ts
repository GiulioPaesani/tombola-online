import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { LabelComponent } from '../label/label.component';
import axios from 'axios';
import CONSTANTS from '../../../assets/CONSTANTS';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LabelComponent],
  templateUrl: './player.component.html',
})
export class PlayerComponent {
  @Input() index = 0;
  @Input() socketId = '';
  @Input() username = '';
  @Input() avatarNum = 1;
  @Input() hostPermission = false;

  constructor(public gameService: GameService) {}

  kickPlayer = async (socketId: string) => {
    if (!this.hostPermission) return;

    await axios.post(`${CONSTANTS.API_BASE_URL}/kick-player`, {
      gameId: this.gameService.gameId,
      socketId,
    });
  };
}
