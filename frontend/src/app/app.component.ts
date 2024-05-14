import { Component } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home/home.component';
import { MasterLobbyComponent } from './components/master-lobby/master-lobby/master-lobby.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomeComponent, MasterLobbyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(public webSocketService: WebSocketService) {}
}
