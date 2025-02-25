import { Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pill',
  imports: [MatIcon],
  templateUrl: './pill.component.html',
  styleUrl: './pill.component.scss',
})
export class PillComponent {
  removable = input<boolean | null>(null);
  clickRemove = output<void>();
}
