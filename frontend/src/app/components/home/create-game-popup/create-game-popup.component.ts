import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import { EventType } from '../../../../../../types';

@Component({
  selector: 'app-create-game-popup',
  standalone: true,
  imports: [],
  templateUrl: './create-game-popup.component.html',
})
export class CreateGamePopupComponent {
  constructor(public gameService: GameService) {}

  createGame = async () => {
    const winCases = {
      ambo: (document.getElementById('ambo') as HTMLInputElement).checked,
      terno: (document.getElementById('terno') as HTMLInputElement).checked,
      quaterna: (document.getElementById('quaterna') as HTMLInputElement)
        .checked,
      cinquina: (document.getElementById('cinquina') as HTMLInputElement)
        .checked,
      decina: (document.getElementById('decina') as HTMLInputElement).checked,
      tombola: (document.getElementById('tombola') as HTMLInputElement).checked,
    };

    const maxPlayers =
      parseInt(
        (document.getElementById('maxPlayers') as HTMLInputElement).value
      ) ?? 0;

    const minCards =
      parseInt(
        (document.getElementById('minCardsPerPlayer') as HTMLInputElement).value
      ) ?? 1;
    const maxCards =
      parseInt(
        (document.getElementById('maxCardsPerPlayer') as HTMLInputElement).value
      ) ?? 1;

    const hostUsername = (
      document.getElementById('hostUsername') as HTMLInputElement
    ).value;

    await axios
      .post(`${CONSTANTS.API_BASE_URL}/create-game`, {
        winCases,
        maxPlayers,
        minCards,
        maxCards,
      })
      .then((respose) => {
        this.gameService.connectWebSocket();

        this.gameService.socket?.on(EventType.Connect, async () => {
          await axios
            .post(`${CONSTANTS.API_BASE_URL}/add-player-to-game`, {
              gameId: respose.data.gameId,
              socketId: this.gameService.socket?.id,
              username: hostUsername,
            })
            .then(() => {
              this.gameService.gameId = respose.data.gameId;
              this.gameService.gameCode = respose.data.gameCode;
              this.gameService.gameOptions = {
                winCases,
                maxPlayers,
                minCards,
                maxCards,
              };
              this.gameService.view = 'lobby-host';
            });
        });
      });
  };
}
