import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import { EventType, Player } from '../../../types';
import { PlayersListComponent } from '../../../components/playersList/playersList.component';
import { TitleComponent } from '../../../components/title/title.component';
import { LabelComponent } from '../../../components/label/label.component';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-lobby-player',
  standalone: true,
  imports: [
    CommonModule,
    PlayersListComponent,
    TitleComponent,
    LabelComponent,
    ButtonComponent,
  ],
  templateUrl: './lobby-player.component.html',
})
export class LobbyPlayerComponent {
  players: Player[] = [];
  numCardsToSelect: number[] = [];
  numCards: number | null = null;

  constructor(public gameService: GameService) {
    axios
      .get(`${CONSTANTS.API_BASE_URL}/players/${this.gameService.gameId}`)
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

        this.gameService.socket?.on(
          EventType.PlayersUpdate,
          (socketIds, { event, socketId }) => {
            this.players = socketIds;

            if (
              event === 'PlayerKick' &&
              socketId === this.gameService.socket?.id
            ) {
              this.gameService.showToast({
                type: 'error',
                text: `Sei stato espulso dall'host della partita`,
              });

              this.gameService.restartGame();
            }
          }
        );
      });
  }

  numCardsSelect = async (numCards: number) => {
    this.numCards = numCards;

    await axios.post(`${CONSTANTS.API_BASE_URL}/select-num-cards`, {
      gameId: this.gameService.gameId,
      socketId: this.gameService.socket?.id,
      numCards,
    });
  };
}
