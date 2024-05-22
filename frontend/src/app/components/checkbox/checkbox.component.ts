import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
})
export class CheckboxComponent {
  @Input() label = '';
  @Input() checked = false;
  @Input() disabilitato = false;
  @Input() name = '';

  @Input() inputValue: (event: Event, name: string) => void = () => {};
}
