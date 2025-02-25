import { Component } from '@angular/core';
import { PageWrapperComponent } from '../page-wrapper/page-wrapper.component';
import { Skeleton } from 'primeng/skeleton';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [
    Skeleton,
    MatExpansionModule,
    MatIcon,
    PageWrapperComponent,
    MatFabButton,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  openSettings() {}
}
