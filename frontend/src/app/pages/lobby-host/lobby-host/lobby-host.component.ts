import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';
import axios from 'axios';
import CONSTANTS from '../../../../assets/CONSTANTS';
import { EventType, Player } from '../../../types';
import { PlayersListComponent } from '../../../components/playersList/playersList.component';
import { TitleComponent } from '../../../components/title/title.component';

@Component({
  selector: 'app-lobby-host',
  standalone: true,
  imports: [CommonModule, PlayersListComponent, TitleComponent],
  templateUrl: './lobby-host.component.html',
})
export class LobbyHostComponent {
  players: Player[] = [
    {
      socketId: '',
      username: 'Usernames',
      avatarNum: 1,
      numCards: 2,
      cards: [],
      formattedCards: [],
    },
    {
      socketId: '',
      username: 'Username 2 sksbndkfjg skd fjgsdfgdjf lgskdjfnl',
      avatarNum: 4,
      numCards: 2,
      cards: [],
      formattedCards: [],
    },
    {
      socketId: '',
      username: 'Username 2',
      avatarNum: 2,
      numCards: 2,
      cards: [],
      formattedCards: [],
    },
    {
      socketId: '',
      username: 'Usernames',
      avatarNum: 1,
      numCards: 2,
      cards: [],
      formattedCards: [],
    },
    {
      socketId: '',
      username: 'Username 2 sksbndkfjg skd fjgsdfgdjf lgskdjfnl',
      avatarNum: 4,
      numCards: 2,
      cards: [],
      formattedCards: [],
    },
    {
      socketId: '',
      username: 'Username 2',
      avatarNum: 2,
      numCards: 2,
      cards: [],
      formattedCards: [],
    },
    {
      socketId: '',
      username: 'Usernames',
      avatarNum: 1,
      numCards: 2,
      cards: [],
      formattedCards: [],
    },
    {
      socketId: '',
      username: 'Username 2 sksbndkfjg skd fjgsdfgdjf lgskdjfnl',
      avatarNum: 4,
      numCards: 2,
      cards: [],
      formattedCards: [],
    },
    {
      socketId: '',
      username: 'Username 2',
      avatarNum: 2,
      numCards: 2,
      cards: [],
      formattedCards: [],
    },
    {
      socketId: '',
      username: 'Usernames',
      avatarNum: 1,
      numCards: 2,
      cards: [],
      formattedCards: [],
    },
    {
      socketId: '',
      username: 'Username 2 sksbndkfjg skd fjgsdfgdjf lgskdjfnl',
      avatarNum: 4,
      numCards: 2,
      cards: [],
      formattedCards: [],
    },
    // {
    //   socketId: '',
    //   username: 'Username 2',
    //   avatarNum: 2,
    //   numCards: 2,
    //   cards: [],
    //   formattedCards: [],
    // },
    // {
    //   socketId: '',
    //   username: 'Usernames',
    //   avatarNum: 1,
    //   numCards: 2,
    //   cards: [],
    //   formattedCards: [],
    // },
    // {
    //   socketId: '',
    //   username: 'Username 2 sksbndkfjg skd fjgsdfgdjf lgskdjfnl',
    //   avatarNum: 4,
    //   numCards: 2,
    //   cards: [],
    //   formattedCards: [],
    // },
    // {
    //   socketId: '',
    //   username: 'Username 2',
    //   avatarNum: 2,
    //   numCards: 2,
    //   cards: [],
    //   formattedCards: [],
    // },
    // {
    //   socketId: '',
    //   username: 'Usernames',
    //   avatarNum: 1,
    //   numCards: 2,
    //   cards: [],
    //   formattedCards: [],
    // },
    // {
    //   socketId: '',
    //   username: 'Username 2 sksbndkfjg skd fjgsdfgdjf lgskdjfnl',
    //   avatarNum: 4,
    //   numCards: 2,
    //   cards: [],
    //   formattedCards: [],
    // },
    // {
    //   socketId: '',
    //   username: 'Username 2',
    //   avatarNum: 2,
    //   numCards: 2,
    //   cards: [],
    //   formattedCards: [],
    // },
    // {
    //   socketId: '',
    //   username: 'Usernames',
    //   avatarNum: 1,
    //   numCards: 2,
    //   cards: [],
    //   formattedCards: [],
    // },
    // {
    //   socketId: '',
    //   username: 'Username 2 sksbndkfjg skd fjgsdfgdjf lgskdjfnl',
    //   avatarNum: 4,
    //   numCards: 2,
    //   cards: [],
    //   formattedCards: [],
    // },
    // {
    //   socketId: '',
    //   username: 'Username 2',
    //   avatarNum: 2,
    //   numCards: 2,
    //   cards: [],
    //   formattedCards: [],
    // },
  ]; //!
  readyToStart = false;

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

  regenerateGameCode = async () => {
    await axios
      .post(`${CONSTANTS.API_BASE_URL}/rigenerate-game-code`, {
        gameId: this.gameService.gameId,
      })
      .then((respose) => {
        this.gameService.gameCode = respose.data.gameCode;
      });
  };

  startGame = async () => {
    await axios.post(`${CONSTANTS.API_BASE_URL}/start-game`, {
      gameId: this.gameService.gameId,
    });
  };
}
