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
        this.players = response.data;

        this.gameService.socket?.on('playersUpdate', (socketIds) => {
          this.players = socketIds;
        });

        this.gameService.socket?.on('playerKick', (playerInfo) => {
          this.players = this.players.filter(
            (player) => player.socketId !== playerInfo.socketId
          );
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

  kickPlayer = async (socketId: string) => {
    await axios.post(`${CONSTANTS.API_BASE_URL}/kick-player`, {
      gameId: this.gameService.gameId,
      socketId,
    });
  };

  startGame = async () => {};
}
