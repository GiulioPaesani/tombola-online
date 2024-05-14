import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import { Player } from '../../../../../../types/general';

@Component({
  selector: 'app-lobby-host',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lobby-host.component.html',
})
export class LobbyHostComponent {
  players: Player[] = [];

  constructor(public gameService: GameService) {
    axios
      .post(`${CONSTANTS.API_BASE_URL}/players`, {
        gameId: this.gameService.gameId,
      })
      .then((response) => {
        this.players.push(...response.data);

        this.gameService.socket?.on('playerJoin', (playerInfo) => {
          this.players.push(playerInfo);
        });
      });
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
