import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-dashboard-statistics',
  imports: [NgxSkeletonLoaderComponent],
  templateUrl: './dashboard-statistics.component.html',
  styleUrl: './dashboard-statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStatisticsComponent {}
