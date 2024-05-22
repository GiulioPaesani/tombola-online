import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LabelComponent],
  templateUrl: './player.component.html',
})
export class PlayerComponent {
  @Input() username = '';
  @Input() avatarNum = 1;
  @Input() hostPermission = false;
}
