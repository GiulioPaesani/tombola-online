import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import { EventType, Player } from '../../../../../../types';

@Component({
  selector: 'app-game-host',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-host.component.html',
})
export class GameHostComponent {
  players: Player[] = [];
  allBoardNumbers = new Array(90).fill(0).map((x, index) => index + 1);

  constructor(public gameService: GameService) {
    axios
      .post(`${CONSTANTS.API_BASE_URL}/players`, {
        gameId: this.gameService.gameId,
      })
      .then((response) => {
        this.players = response.data;

        this.gameService.socket?.on(EventType.PlayersUpdate, (socketIds) => {
          this.players = socketIds;
        });
      });
  }

  kickPlayer = async (socketId: string) => {
    await axios.post(`${CONSTANTS.API_BASE_URL}/kick-player`, {
      gameId: this.gameService.gameId,
      socketId,
    });
  };
}
