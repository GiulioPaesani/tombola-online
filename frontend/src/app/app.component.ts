import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home/home.component';
import { LobbyHostComponent } from './components/lobby-host/lobby-host/lobby-host.component';
import { LobbyPlayerComponent } from './components/lobby-player/lobby-player/lobby-player.component';
import { ToastComponent } from './components/global/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ToastComponent,
    HomeComponent,
    LobbyHostComponent,
    LobbyPlayerComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(public gameService: GameService) {}
}
