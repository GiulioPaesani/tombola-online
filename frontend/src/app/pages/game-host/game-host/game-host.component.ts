import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import { EventType, Player, Wins } from '../../../types';

@Component({
  selector: 'app-game-host',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-host.component.html',
})
export class GameHostComponent {
  players: Player[] = [];
  allBoardNumbers = new Array(90).fill(0).map((x, index) => index + 1);
  gameEnded = false;

  constructor(public gameService: GameService) {
    axios
      .get(`${CONSTANTS.API_BASE_URL}/players/${this.gameService.gameId}`)
      .then((response) => {
        this.players = response.data;

        this.gameService.socket?.on(EventType.PlayersUpdate, (socketIds) => {
          this.players = socketIds;
        });
      });

    this.gameService.socket?.on(EventType.Wins, (wins: Wins) => {
      this.gameService.showToast({
        type: 'success',
        text: `${wins.winners
          .map((player) => player.username)
          .join(', ')} ha/hanno fatto ${wins.type}!!!`,
      });

      if (wins.type === 'tombola') this.gameEnded = true;
    });

    this.gameService.socket?.on(EventType.ReturnToLobby, () => {
      this.gameEnded = false;
      this.gameService.extractedNumbers = [];
      this.gameService.view = 'lobby-host';
    });
  }

  kickPlayer = async (socketId: string) => {
    await axios.post(`${CONSTANTS.API_BASE_URL}/kick-player`, {
      gameId: this.gameService.gameId,
      socketId,
    });
  };

  extractNumber = async () => {
    await axios
      .post(`${CONSTANTS.API_BASE_URL}/extract-number`, {
        gameId: this.gameService.gameId,
      })
      .then((response) => {
        if (!response.data) return;

        const randomNumber = parseInt(response.data.randomNumber);

        this.gameService.extractedNumbers.push(randomNumber);

        this.gameService.showToast({
          type: 'success',
          text: randomNumber.toString(),
        });
      });
  };

  returnToLobby = async () => {
    await axios.post(`${CONSTANTS.API_BASE_URL}/return-to-lobby`, {
      gameId: this.gameService.gameId,
    });
  };
}
