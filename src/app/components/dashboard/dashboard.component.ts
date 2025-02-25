import { Component } from '@angular/core';
import { PageWrapperComponent } from '../page-wrapper/page-wrapper.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { DashboardStatisticsComponent } from '../dashboard-statistics/dashboard-statistics.component';
import { DashboardChartsComponent } from '../dashboard-charts/dashboard-charts.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatExpansionModule,
    MatIcon,
    PageWrapperComponent,
    MatFabButton,
    DashboardStatisticsComponent,
    DashboardChartsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  openSettings() {}
}
