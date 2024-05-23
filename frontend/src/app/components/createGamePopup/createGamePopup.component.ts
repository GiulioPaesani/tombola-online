import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import axios from 'axios';
import CONSTANTS from '../../../assets/CONSTANTS';
import { GameService } from '../../services/game.service';
import { EventType } from '../../types';
import { InputComponent } from '../input/input.component';
import { LabelComponent } from '../label/label.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-create-game-popup',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    LabelComponent,
    CheckboxComponent,
  ],
  templateUrl: './createGamePopup.component.html',
})
export class CreateGamePopupComponent {
  @Input() isVisible = false;
  username = '';
  selectedAvatar = 1;
  winCases = {
    ambo: false,
    terno: false,
    quaterna: false,
    cinquina: true,
    decina: true,
    tombola: true,
  };
  maxPlayers = 25;
  minCards = 1;
  maxCards = 8;

  buttonLoading = false;

  @Input() closePopup = () => {};

  constructor(public gameService: GameService) {}

  inputWinCases = (event: Event, name: string) => {
    this.winCases[name as keyof typeof this.winCases] = (
      event.target as HTMLInputElement
    ).checked;
  };

  inputMaxPlayer = (event: Event) => {
    this.maxPlayers = parseInt((event.target as HTMLInputElement).value) || 1;
  };

  inputMinCards = (event: Event) => {
    this.minCards = parseInt((event.target as HTMLInputElement).value) || 1;
  };

  inputMaxCards = (event: Event) => {
    this.maxCards = parseInt((event.target as HTMLInputElement).value) || 1;
  };

  inputUsername = (event: Event) => {
    this.username = (event.target as HTMLInputElement).value;
  };

  createGame = async () => {
    if (this.maxPlayers <= 0 || this.maxPlayers > 1000) {
      this.gameService.showToast({
        type: 'error',
        text: 'Il numero massimo di giocatori deve essere compreso tra 1 e 1000',
      });
      return;
    }

    if (this.minCards <= 0 || this.minCards > 8) {
      this.gameService.showToast({
        type: 'error',
        text: 'Il numero minimo di cartelle per giocatore deve essere compreso tra 1 e 8',
      });
      return;
    }

    if (this.maxCards <= 0 || this.maxCards > 8) {
      this.gameService.showToast({
        type: 'error',
        text: 'Il numero massimo di cartelle per giocatore deve essere compreso tra 1 e 8',
      });
      return;
    }

    if (this.maxCards < this.minCards) {
      this.gameService.showToast({
        type: 'error',
        text: 'Il numero massimo di cartelle è maggiore del numero minimo',
      });
      return;
    }

    if (!this.username) {
      this.gameService.showToast({
        type: 'error',
        text: `Inserisci un nickname da usare nella partita`,
      });
      return;
    }

    this.buttonLoading = true;
    await axios
      .post(`${CONSTANTS.API_BASE_URL}/create-game`, {
        winCases: this.winCases,
        maxPlayers: this.maxPlayers,
        minCards: this.minCards,
        maxCards: this.maxCards,
      })
      .then((respose) => {
        this.gameService.connectWebSocket();

        this.gameService.socket?.off(EventType.Connect);
        this.gameService.socket?.on(EventType.Connect, async () => {
          await axios
            .post(`${CONSTANTS.API_BASE_URL}/add-player-to-game`, {
              gameId: respose.data.gameId,
              socketId: this.gameService.socket?.id,
              username: this.username,
              avatarNum: this.selectedAvatar,
            })
            .then(() => {
              this.gameService.gameId = respose.data.gameId;
              this.gameService.gameCode = respose.data.gameCode;
              this.gameService.gameOptions = {
                winCases: this.winCases,
                maxPlayers: this.maxPlayers,
                minCards: this.minCards,
                maxCards: this.maxCards,
              };
              this.buttonLoading = false;
              this.gameService.view = 'lobby-host';
            });
        });
      });
  };
}
