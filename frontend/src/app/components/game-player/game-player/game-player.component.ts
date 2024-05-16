import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import {
  Card,
  EventType,
  FormattedCard,
  Player,
  Wins,
} from '../../../../../../types';

@Component({
  selector: 'app-game-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-player.component.html',
})
export class GamePlayerComponent {
  players: Player[] = [];
  cards: Card[] = [];
  formattedCards: FormattedCard[] = [];
  automaticInsert = false;
  numbersCheck = true;

  constructor(public gameService: GameService) {
    axios
      .post(`${CONSTANTS.API_BASE_URL}/players`, {
        gameId: this.gameService.gameId,
      })
      .then((response) => {
        this.players = response.data;
      });

    axios
      .post(`${CONSTANTS.API_BASE_URL}/cards`, {
        gameId: this.gameService.gameId,
        socketId: this.gameService.socket?.id,
      })
      .then((response) => {
        this.cards = response.data.cards;
        this.formattedCards = response.data.formattedCards;
      });

    this.gameService.socket?.on(
      EventType.ExtractedNumber,
      (randomNumber: number) => {
        this.gameService.showToast({
          type: 'success',
          text: randomNumber.toString(),
        });

        this.gameService.extractedNumbers.push(randomNumber);

        if (this.automaticInsert) {
          for (let i = 0; i < this.cards.length; i++) {
            if (randomNumber.toString() in this.cards[i]) {
              this.cards[i][randomNumber] = true;
            }
          }
        }
      }
    );

    this.gameService.socket?.on(EventType.Wins, (wins: Wins) => {
      this.gameService.showToast({
        type: 'success',
        text: `${wins.winners
          .map((player) => player.username)
          .join(', ')} ha/hanno fatto ${wins.type}!!!`,
      });
    });
  }

  toggleGameOptions = () => {
    this.automaticInsert = (
      document.getElementById('automaticInsert') as HTMLInputElement
    ).checked;
    this.numbersCheck = (
      document.getElementById('numbersCheck') as HTMLInputElement
    ).checked;
  };

  toggleNumber = (cardIndex: number, number: number) => {
    if (number === 0) return;

    this.cards[cardIndex][number] = !this.cards[cardIndex][number];
  };
}
