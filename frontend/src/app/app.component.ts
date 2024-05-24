import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { LobbyHostComponent } from './pages/lobby-host/lobby-host.component';
import { LobbyPlayerComponent } from './pages/lobby-player/lobby-player.component';
import { ToastComponent } from './components/toast/toast.component';
import { GameHostComponent } from './pages/game-host/game-host.component';
import { GamePlayerComponent } from './pages/game-player/game-player.component';
import { ScoreboardComponent } from './pages/scoreboard/scoreboard.component';
import { CardsComponent } from './pages/cards/cards.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ToastComponent,
    HomeComponent,
    LobbyHostComponent,
    LobbyPlayerComponent,
    GameHostComponent,
    GamePlayerComponent,
    ScoreboardComponent,
    CardsComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public gameService: GameService) {}
}
