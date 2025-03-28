import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    RouterLink,
    Button,
    NgClass,
    MatIcon,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  router = inject(Router);
  currentPage = signal<string>('');

  drawer = viewChild<MatDrawer>('drawer');

  constructor() {
    afterNextRender(() => {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.currentPage.set(event.urlAfterRedirects);
        }
      });
      this.drawer()?.open();
    });
  }
}
