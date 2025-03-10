import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [MatButton, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  secondary = input<string | null>(null);
}
