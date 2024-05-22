import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGamePopupComponent } from '../../../components/createGamePopup/createGamePopup.component';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import { GameService } from '../../../services/game.service';
import { EventType } from '../../../types';
import { TitleComponent } from '../../../components/title/title.component';
import { SubtitleComponent } from '../../../components/subtitle/subtitle.component';
import { LabelComponent } from '../../../components/label/label.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { JoinPopupComponent } from '../../../components/joinPopup/joinPopup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TitleComponent,
    SubtitleComponent,
    LabelComponent,
    ButtonComponent,
    InputComponent,
    JoinPopupComponent,
    CreateGamePopupComponent,
    CommonModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  gameCode = '';

  isJoinPopupVisible = true;
  isCreateGamePopupVisible = false;

  constructor(public gameService: GameService) {}

  inputGameCode = (event: Event) => {
    this.gameCode = (event.target as HTMLInputElement).value;
  };

  openCreateGamePopup = () => {
    this.isCreateGamePopupVisible = true;
  };

  closeCreateGamePopup = () => {
    this.isCreateGamePopupVisible = false;
  };

  openJoinPopup = async () => {
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
          this.isJoinPopupVisible = true;
        }
      });
  };
}
