import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() id = '';
  @Input() placeholder = '';

  @Input() inputValue: (event: Event) => void = () => {};
}
