import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';

@Component({
  selector: 'app-master-lobby',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './master-lobby.component.html',
  styleUrl: './master-lobby.component.css',
})
export class MasterLobbyComponent {
  players: string[] = [];

  constructor(public gameService: GameService) {
    // this.gameService.getMessage()?.subscribe((message) => {
    //   this.players.push(message);
    //   console.log('[frontend] messaggio ricevuto:', message);
    // });
  }

  regenerateGameCode = async () => {
    await axios
      .post(`${CONSTANTS.API_BASE_URL}/rigenerate-game-code`, {
        gameId: this.gameService.gameId,
      })
      .then((respose) => {
        this.gameService.gameCode = respose.data.gameCode;
      });
  };
}
