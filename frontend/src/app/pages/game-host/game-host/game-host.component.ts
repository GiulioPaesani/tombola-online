import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import { EventType, Player, Wins } from '../../../types';
import { TitleComponent } from '../../../components/title/title.component';
import { LabelComponent } from '../../../components/label/label.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { PlayersListComponent } from '../../../components/playersList/playersList.component';
import { NumberComponent } from '../../../components/number/number.component';

@Component({
  selector: 'app-game-host',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    LabelComponent,
    ButtonComponent,
    PlayersListComponent,
    NumberComponent,
  ],
  templateUrl: './game-host.component.html',
  styleUrl: './game-host.component.css',
})
export class GameHostComponent {
  players: Player[] = [];
  allBoardNumbers = new Array(90).fill(0).map((x, index) => index + 1);
  gameEnded = false;

  extractedNumberPopup = 0;

  extracting = false;
  buttonLoading1 = false;
  buttonLoading2 = false;

  constructor(public gameService: GameService) {
    axios
      .get(`${CONSTANTS.API_BASE_URL}/players/${this.gameService.gameId}`)
      .then((response) => {
        this.players = response.data;

        this.gameService.socket?.off(EventType.PlayersUpdate);
        this.gameService.socket?.on(EventType.PlayersUpdate, (socketIds) => {
          this.players = socketIds;
        });
      });

    this.gameService.socket?.off(EventType.Wins);
    this.gameService.socket?.on(EventType.Wins, (wins: Wins) => {
      this.gameService.showToast({
        type: 'party',
        text: `${wins.winners.map((player) => player.username).join(', ')} ${
          wins.winners.length === 1 ? 'ha' : 'hanno'
        } fatto ${wins.type}`,
      });

      if (wins.type === 'tombola') this.gameEnded = true;
    });

    this.gameService.socket?.off(EventType.ReturnToLobby);
    this.gameService.socket?.on(EventType.ReturnToLobby, () => {
      this.gameEnded = false;
      this.gameService.extractedNumbers = [];
      this.gameService.lastExtractedNumbers = [];
      this.gameService.view = 'lobby-host';
    });
  }

  kickPlayer = async (socketId: string) => {
    await axios.post(`${CONSTANTS.API_BASE_URL}/kick-player`, {
      gameId: this.gameService.gameId,
      socketId,
    });
  };

  sleep = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  extractNumber = async () => {
    this.buttonLoading1 = true;
    this.extracting = true;

    await axios
      .post(`${CONSTANTS.API_BASE_URL}/extract-number`, {
        gameId: this.gameService.gameId,
      })
      .then(async (response) => {
        if (!response.data) {
          this.buttonLoading1 = false;
          this.extracting = false;
        }

        const randomNumber = parseInt(response.data.randomNumber);

        const randomNumbers = new Array(15)
          .fill(0)
          .map(() => Math.floor(Math.random() * 90) + 1);

        randomNumbers.push(randomNumber);

        let index = 0;
        for (const number of randomNumbers) {
          this.extractedNumberPopup = number;

          if (index < 15) {
            await this.sleep(100);
          } else {
            this.extracting = false;
            await this.sleep(1500);
          }

          index++;
        }

        this.gameService.extractedNumbers.push(randomNumber);
        this.gameService.lastExtractedNumbers = [
          randomNumber,
          ...this.gameService.lastExtractedNumbers.slice(0, 3),
        ];

        this.buttonLoading1 = false;
      });
  };

  returnToLobby = async () => {
    this.buttonLoading2 = true;
    await axios.post(`${CONSTANTS.API_BASE_URL}/return-to-lobby`, {
      gameId: this.gameService.gameId,
    });
    this.buttonLoading2 = false;
  };
}
