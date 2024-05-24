import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { GameService } from '../../services/game.service';
import { InputComponent } from '../input/input.component';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-num-cards-popup',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputComponent, LabelComponent],
  templateUrl: './numCardsPopup.component.html',
})
export class NumCardsPopupComponent {
  @Input() gameCode = '';
  @Input() isVisible = false;
  username = '';
  selectedAvatar = 1;

  @Input() numCardsSelect: (numCards: number) => void = () => {};

  constructor(public gameService: GameService) {}
}
