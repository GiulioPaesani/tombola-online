import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-create-game-popup',
  standalone: true,
  imports: [],
  templateUrl: './create-game-popup.component.html',
  styleUrl: './create-game-popup.component.css',
})
export class CreateGamePopupComponent {
  createGameResponse = '';

  constructor(public gameService: GameService) {}

  onClickCreateGame() {
    const winCases = {
      ambo: (document.getElementById('ambo') as HTMLInputElement).checked,
      terno: (document.getElementById('terno') as HTMLInputElement).checked,
      cinquina: (document.getElementById('cinquina') as HTMLInputElement)
        .checked,
      decina: (document.getElementById('decina') as HTMLInputElement).checked,
      tombola: (document.getElementById('tombola') as HTMLInputElement).checked,
    };

    const maxPlayers =
      parseInt(
        (document.getElementById('maxPlayers') as HTMLInputElement).value
      ) ?? 0;

    const minCards =
      parseInt(
        (document.getElementById('minCardsPerPlayer') as HTMLInputElement).value
      ) ?? 1;
    const maxCards =
      parseInt(
        (document.getElementById('maxCardsPerPlayer') as HTMLInputElement).value
      ) ?? 1;

    this.gameService.createGame({
      winCases,
      maxPlayers,
      minCards,
      maxCards,
    });
  }
}
