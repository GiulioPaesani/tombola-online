import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  constructor(public gameService: GameService) {}

  deleteToast = (toastId: string) => {
    this.gameService.toasts = this.gameService.toasts.filter(
      (x) => x.toastId !== toastId
    );
  };
}
