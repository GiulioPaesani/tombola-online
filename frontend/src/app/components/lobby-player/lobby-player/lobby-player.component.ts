import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import { Player } from '../../../../../../types/general';

@Component({
  selector: 'app-lobby-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lobby-player.component.html',
})
export class LobbyPlayerComponent {
  players: Player[] = [];
  numCardsToSelect: number[] = [];

  constructor(public gameService: GameService) {
    axios
      .post(`${CONSTANTS.API_BASE_URL}/players`, {
        gameId: this.gameService.gameId,
      })
      .then((response) => {
        this.players = response.data;

        this.numCardsToSelect = new Array(
          (this.gameService.gameOptions?.maxCards ?? 1) -
            (this.gameService.gameOptions?.minCards ?? 1) +
            1
        )
          .fill(0)
          .map(
            (x, index) => (this.gameService.gameOptions?.minCards ?? 1) + index
          );

        this.gameService.socket?.on('playersUpdate', (socketIds) => {
          this.players = socketIds;
        });

        this.gameService.socket?.on('playerKick', (playerInfo) => {
          this.players = this.players.filter(
            (player) => player.socketId !== playerInfo.socketId
          );

          if (playerInfo.socketId === this.gameService.socket?.id) {
            this.gameService.showToast({
              type: 'error',
              text: `Sei stato espulso dall'host della partita`,
            });

            this.gameService.restartGame();
          }
        });
      });
  }

  numCardsSelect = async (numCards: number) => {
    await axios.post(
      `${CONSTANTS.API_BASE_URL}/num-cards-select/?numCards=${numCards}`,
      {
        gameId: this.gameService.gameId,
        socketId: this.gameService.socket?.id,
      }
    );
  };
}
