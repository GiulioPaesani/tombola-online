import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label.component.html',
})
export class LabelComponent {
  @Input() text = '';
  @Input() color = 'white';
  @Input() position = 'center';
  @Input() size = 'big';
}
