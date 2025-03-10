import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-page-wrapper',
  imports: [MatDivider],
  templateUrl: './page-wrapper.component.html',
  styleUrl: './page-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageWrapperComponent {}
