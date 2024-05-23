import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './number.component.html',
  styleUrl: './number.component.css',
})
export class NumberComponent {
  @Input() number = 1;
  @Input() selected = false;
  @Input() error = false;
}
