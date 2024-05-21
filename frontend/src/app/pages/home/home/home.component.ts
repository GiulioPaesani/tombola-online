import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGamePopupComponent } from '../create-game-popup/create-game-popup.component';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import { GameService } from '../../../services/game.service';
import { EventType } from '../../../types';
import { TitleComponent } from '../../../components/title/title.component';
import { SubtitleComponent } from '../../../components/subtitle/subtitle.component';
import { LabelComponent } from '../../../components/label/label.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CreateGamePopupComponent,
    TitleComponent,
    SubtitleComponent,
    LabelComponent,
    ButtonComponent,
    InputComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  gameCode = '';

  isCreateGamePopupVisible = false;

  constructor(public gameService: GameService) {}

  inputGameCode = (event: Event) => {
    console.log((event.target as HTMLInputElement).value);
    this.gameCode = (event.target as HTMLInputElement).value;
  };

  openCreateGamePopup = () => {
    this.isCreateGamePopupVisible = true;
  };

  joinGame = async () => {
    const playerUsername =
      (document.getElementById('playerUsername') as HTMLInputElement)?.value ??
      '';

    await axios
      .post(`${CONSTANTS.API_BASE_URL}/is-game-code-correct`, {
        gameCode: this.gameCode,
      })
      .then((respose) => {
        if (respose.data === 'Invalid code') {
          this.gameService.showToast({
            type: 'error',
            text: `Codice della partita non valido`,
          });
        } else if (respose.data === 'Max players reached') {
          this.gameService.showToast({
            type: 'warning',
            text: `Giocatori massimi raggiunti`,
          });
        } else if (respose.data === 'Game in progress') {
          this.gameService.showToast({
            type: 'warning',
            text: `Partita già in corso`,
          });
        } else {
          this.gameService.connectWebSocket();

          this.gameService.socket?.on(EventType.Connect, async () => {
            await axios.post(`${CONSTANTS.API_BASE_URL}/add-player-to-game`, {
              gameId: respose.data.gameId,
              socketId: this.gameService.socket?.id,
              username: playerUsername,
            });

            this.gameService.gameId = respose.data.gameId;
            this.gameService.gameOptions = {
              winCases: respose.data.winCases,
              maxPlayers: respose.data.maxPlayers,
              minCards: respose.data.minCards,
              maxCards: respose.data.maxCards,
            };
            this.gameService.view = 'lobby-player';
          });
        }
      });
  };
}
