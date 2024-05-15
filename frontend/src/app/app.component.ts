import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home/home.component';
import { LobbyHostComponent } from './components/lobby-host/lobby-host/lobby-host.component';
import { LobbyPlayerComponent } from './components/lobby-player/lobby-player/lobby-player.component';
import { ToastComponent } from './components/global/toast.component';
import { GameHostComponent } from './components/game-host/game-host/game-host.component';
import { GamePlayerComponent } from './components/game-player/game-player/game-player.component';

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
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public gameService: GameService) {}
}
