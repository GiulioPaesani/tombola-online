import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() size: 'big' | 'small' = 'big';
  @Input() fixedWidth = true;
  @Input() label = '';
  @Input() icon: string | undefined;
  @Input() disabilitato = false;
}
