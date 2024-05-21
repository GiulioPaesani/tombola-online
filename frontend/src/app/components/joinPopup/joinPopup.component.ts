import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import axios from 'axios';
import CONSTANTS from '../../../assets/CONSTANTS';
import { GameService } from '../../services/game.service';
import { EventType } from '../../types';
import { InputComponent } from '../input/input.component';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-join-popup',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent, LabelComponent],
  templateUrl: './joinPopup.component.html',
})
export class JoinPopupComponent {
  @Input() gameCode = '';
  @Input() isVisible = false;
  username = '';

  constructor(public gameService: GameService) {}

  inputUsername = (event: Event) => {
    this.username = (event.target as HTMLInputElement).value;
  };

  joinGame = async () => {
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
              username: this.username,
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
