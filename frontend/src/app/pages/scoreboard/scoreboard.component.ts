import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { TitleComponent } from '../../components/title/title.component';
import { LabelComponent } from '../../components/label/label.component';
import { ButtonComponent } from '../../components/button/button.component';
import { NumberComponent } from '../../components/number/number.component';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    LabelComponent,
    ButtonComponent,
    NumberComponent,
  ],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css',
})
export class ScoreboardComponent {
  allBoardNumbers = new Array(90).fill(0).map((x, index) => index + 1);

  extractedNumberPopup = 0;

  extracting = false;
  buttonLoading1 = false;

  constructor(public gameService: GameService) {}

  sleep = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  extractNumber = async () => {
    this.buttonLoading1 = true;
    this.extracting = true;

    const notExtractedNumbers = new Array(90)
      .fill(0)
      .map((x, index) => index + 1)
      .filter((number) => !this.gameService.extractedNumbers.includes(number));

    const randomNumber =
      notExtractedNumbers[
        Math.floor(Math.random() * notExtractedNumbers.length)
      ];

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
    this.extractedNumberPopup = 0;
  };

  restartScoreboard = async () => {
    this.gameService.extractedNumbers = [];
    this.gameService.lastExtractedNumbers = [];
  };
}
