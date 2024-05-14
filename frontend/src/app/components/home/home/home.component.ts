import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGamePopupComponent } from '../create-game-popup/create-game-popup.component';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CreateGamePopupComponent, CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  isCreateGamePopupVisible = false;

  constructor(public gameService: GameService) {}

  openCreateGamePopup = () => {
    this.isCreateGamePopupVisible = true;
  };

  joinGame = async () => {
    const gameCode = (document.getElementById('gameCode') as HTMLInputElement)
      .value;

    const playerUsername = (
      document.getElementById('playerUsername') as HTMLInputElement
    ).value;

    await axios
      .post(`${CONSTANTS.API_BASE_URL}/is-game-code-correct`, { gameCode })
      .then((respose) => {
        const gameId = respose.data.gameId;
        if (gameId) {
          this.gameService.connectWebSocket();

          this.gameService.socket?.on('connect', async () => {
            await axios.post(`${CONSTANTS.API_BASE_URL}/add-player-to-game`, {
              gameId: gameId,
              socketId: this.gameService.socket?.id,
              username: playerUsername,
            });

            this.gameService.gameId = gameId;
            this.gameService.state = 'lobby-player';
          });
        } else {
          this.gameService.showToast({
            type: 'error',
            text: `Codice della partita non valido`,
          });
        }
      });
  };
}
