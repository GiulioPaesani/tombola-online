import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import { EventType, Player } from '../../../types';

@Component({
  selector: 'app-lobby-host',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lobby-host.component.html',
})
export class LobbyHostComponent {
  players: Player[] = [];
  readyToStart = false;

  constructor(public gameService: GameService) {
    axios
      .post(`${CONSTANTS.API_BASE_URL}/players`, {
        gameId: this.gameService.gameId,
      })
      .then((response) => {
        this.players = response.data;
        this.readyToStart =
            this.players.length > 1 &&
            this.players.slice(1).every((x) => x.numCards);

        this.gameService.socket?.on(EventType.PlayersUpdate, (socketIds) => {
          this.players = socketIds;

          this.readyToStart =
            this.players.length > 1 &&
            this.players.slice(1).every((x) => x.numCards);
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

  startGame = async () => {
    await axios.post(`${CONSTANTS.API_BASE_URL}/start-game`, {
      gameId: this.gameService.gameId,
    });
  };
}
