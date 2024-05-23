import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import { Card, EventType, FormattedCard, Player, Wins } from '../../../types';
import { TitleComponent } from '../../../components/title/title.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { LabelComponent } from '../../../components/label/label.component';
import { PlayersListComponent } from '../../../components/playersList/playersList.component';
import { NumberComponent } from '../../../components/number/number.component';
import { CheckboxComponent } from '../../../components/checkbox/checkbox.component';

@Component({
  selector: 'app-game-player',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    ButtonComponent,
    LabelComponent,
    PlayersListComponent,
    NumberComponent,
    CheckboxComponent,
  ],
  templateUrl: './game-player.component.html',
})
export class GamePlayerComponent {
  players: Player[] = [];
  cards: Card[] = [];
  formattedCards: FormattedCard[] = [];
  automaticInsert = true;
  numbersCheck = true;
  lastExtractedNumber: number | null = null;

  constructor(public gameService: GameService) {
    axios
      .get(`${CONSTANTS.API_BASE_URL}/players/${this.gameService.gameId}`)
      .then((response) => {
        this.players = response.data;
      });

    axios
      .get(
        `${CONSTANTS.API_BASE_URL}/cards/${this.gameService.gameId}/${this.gameService.socket?.id}`
      )
      .then((response) => {
        this.cards = response.data.cards;
        this.formattedCards = response.data.formattedCards;
      });

    this.gameService.socket?.off(EventType.ExtractedNumber);
    this.gameService.socket?.on(
      EventType.ExtractedNumber,
      (randomNumber: number) => {
        this.lastExtractedNumber = randomNumber;
        setTimeout(() => {
          this.lastExtractedNumber = null;
        }, 2000);

        this.gameService.extractedNumbers.push(randomNumber);
        this.gameService.lastExtractedNumbers = [
          randomNumber,
          ...this.gameService.lastExtractedNumbers.slice(0, 3),
        ];

        if (this.automaticInsert) {
          for (let i = 0; i < this.cards.length; i++) {
            if (randomNumber.toString() in this.cards[i]) {
              this.cards[i][randomNumber] = true;
            }
          }
        }
      }
    );

    this.gameService.socket?.off(EventType.Wins);
    this.gameService.socket?.on(EventType.Wins, (wins: Wins) => {
      this.gameService.showToast({
        type: 'party',
        text: wins.winners.find(
          (x) => x.socketId === this.gameService.socket?.id
        )
          ? `Complimenti! Hai fatto ${wins.type}`
          : `${wins.winners.map((player) => player.username).join(', ')} ${
              wins.winners.length === 1 ? 'ha' : 'hanno'
            } fatto ${wins.type}`,
      });
    });

    this.gameService.socket?.off(EventType.ReturnToLobby);
    this.gameService.socket?.on(EventType.ReturnToLobby, () => {
      this.gameService.extractedNumbers = [];
      this.gameService.lastExtractedNumbers = [];
      this.gameService.view = 'lobby-player';
    });
  }

  toggleGameOptions = (event: Event, name: string) => {
    if (name === 'autoInsert') {
      this.automaticInsert = (event.target as HTMLInputElement).checked;
    } else {
      this.numbersCheck = (event.target as HTMLInputElement).checked;
    }
  };

  toggleNumber = (cardIndex: number, number: number) => {
    if (number === 0) return;

    this.cards[cardIndex][number] = !this.cards[cardIndex][number];
  };
}
