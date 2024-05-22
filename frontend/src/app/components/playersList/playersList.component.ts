import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import axios from 'axios';
import CONSTANTS from '../../../assets/CONSTANTS';
import { GameService } from '../../services/game.service';
import { EventType, Player } from '../../types';
import { InputComponent } from '../input/input.component';
import { LabelComponent } from '../label/label.component';
import { PlayerComponent } from './player.component';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LabelComponent, PlayerComponent],
  templateUrl: './playersList.component.html',
  styleUrl: './playersList.component.css',
})
export class PlayersListComponent {
  @Input() isOpen = true;

  @Input() players: Player[] = [];
  @Input() hostPermission = false;

  constructor(public gameService: GameService) {}

  windowResize = () => {
    if (window?.innerWidth < 1536) this.isOpen = false;
    else this.isOpen = true;
  };
}
