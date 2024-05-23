import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import { EventType, Player } from '../../../types';
import { PlayersListComponent } from '../../../components/playersList/playersList.component';
import { TitleComponent } from '../../../components/title/title.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { LabelComponent } from '../../../components/label/label.component';

@Component({
  selector: 'app-lobby-host',
  standalone: true,
  imports: [
    CommonModule,
    PlayersListComponent,
    TitleComponent,
    ButtonComponent,
    LabelComponent,
  ],
  templateUrl: './lobby-host.component.html',
})
export class LobbyHostComponent {
  players: Player[] = [];
  isGameCodeVisible = false;

  readyToStart = false;

  buttonLoading = false;

  constructor(public gameService: GameService) {
    axios
      .get(`${CONSTANTS.API_BASE_URL}/players/${this.gameService.gameId}`)
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

  copyGameCode = () => {
    navigator.clipboard.writeText(this.gameService.gameCode);

    this.gameService.showToast({
      type: 'success',
      text: 'Codice per entrare copiato',
    });
  };

  startGame = async () => {
    if (!this.readyToStart) return;

    this.buttonLoading = true;
    await axios.post(`${CONSTANTS.API_BASE_URL}/start-game`, {
      gameId: this.gameService.gameId,
    });

    this.buttonLoading = false;
  };
}
