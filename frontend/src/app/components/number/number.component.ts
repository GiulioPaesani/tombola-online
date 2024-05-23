import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './number.component.html',
})
export class NumberComponent {
  @Input() number = 1;
  @Input() selected = false;
}
