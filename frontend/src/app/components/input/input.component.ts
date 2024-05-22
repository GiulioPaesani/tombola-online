import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() placeholder = '';
  @Input() maxLength = 0;
  @Input() defaultValue = '';
  @Input() inputType = 'text';
  @Input() minValue = 0;
  @Input() maxValue = 0;
  @Input() size = 'big';

  @Input() inputValue: (event: Event) => void = () => {};
}
