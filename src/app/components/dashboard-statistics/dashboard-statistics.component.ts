import {
  afterNextRender,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { NgTemplateOutlet } from '@angular/common';
import { DashboardApi } from '../../api/dashboard.api';
import { map, Observable, tap } from 'rxjs';
import { DashboardStatistics } from '../../models/dashboard-statistics';
import { PillComponent } from '../pill/pill.component';

@Component({
  selector: 'app-dashboard-statistics',
  imports: [NgxSkeletonLoaderComponent, NgTemplateOutlet, PillComponent],
  templateUrl: './dashboard-statistics.component.html',
  styleUrl: './dashboard-statistics.component.scss',
})
export class DashboardStatisticsComponent {
  dashboardApi = inject(DashboardApi);

  isLoading = signal<boolean>(false);
  dashboardStatistic = signal<DashboardStatistics | undefined>(undefined);

  constructor() {
    effect(() => {
      this.isLoading.set(true);

      this.dashboardApi.fetch().subscribe(data => {
        this.isLoading.set(false);
        this.dashboardStatistic.set(data);
      });
    });
  }

  private fetchConfigurationOptions(): Observable<DashboardStatistics> {
    this.isLoading.set(true);
    return this.dashboardApi.fetch().pipe(
      map(dashboardStatistics => {
        return {
          total_time: dashboardStatistics.total_time,
          protocols: dashboardStatistics.protocols,
          information_rate: dashboardStatistics.information_rate,
        };
      }),
      tap(() => this.isLoading.set(false))
    );
  }
}
