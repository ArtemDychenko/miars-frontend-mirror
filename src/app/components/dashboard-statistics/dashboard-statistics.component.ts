import {
  afterNextRender,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { AsyncPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { DashboardApi } from '../../api/dashboard.api';
import { interval, map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { DashboardStatistics } from '../../models/dashboard-statistics';
import { PillComponent } from '../pill/pill.component';
import { TimePipe } from '../../pipes/time.pipe';

@Component({
  selector: 'app-dashboard-statistics',
  imports: [NgxSkeletonLoaderComponent, AsyncPipe, TimePipe, NgIf, NgForOf],
  templateUrl: './dashboard-statistics.component.html',
  styleUrl: './dashboard-statistics.component.scss',
})
export class DashboardStatisticsComponent {
  dashboardApi = inject(DashboardApi);

  isLoading = signal<boolean>(false);

  dashboardStatistics = interval(1000).pipe(
    switchMap(() => this.dashboardApi.fetchStatistics()),
    map(dashboardStatistics => ({
      ...dashboardStatistics,
      total_time: new Date(dashboardStatistics.total_time * 1000),
    })),
    shareReplay(1)
  );

  constructor() {
    effect(() => {
      this.isLoading.set(true);

      this.dashboardApi.fetchStatistics().subscribe(data => {
        this.isLoading.set(false);
        this.dashboardApi.fetchStatistics().subscribe(() => {
          this.isLoading.set(false);
        });
      });
    });
  }

  getPacketsPerSecond(protocolName: string): Observable<number> {
    return this.dashboardStatistics.pipe(
      map(dashboardStatistics => {
        const protocol = dashboardStatistics.protocols.find(
          protocol => protocol.name === protocolName
        );

        if (!protocol) {
          return 0;
        }

        if (protocol.total_packets == 0) {
          return 0;
        }

        const totalPackets = protocol.total_packets;
        const totalSeconds = dashboardStatistics.total_time.getTime() / 1000;
        return totalPackets / totalSeconds;
      })
    );
  }

  getBytesPerSecond(protocolName: string): Observable<number> {
    return this.dashboardStatistics.pipe(
      map(dashboardStatistics => {
        const protocol = dashboardStatistics.protocols.find(
          protocol => protocol.name === protocolName
        );

        if (!protocol) {
          return 0;
        }

        if (protocol.total_bytes == 0) {
          return 0;
        }

        const totalBytes = protocol.total_bytes;
        const totalSeconds = dashboardStatistics.total_time.getTime() / 1000;
        return totalBytes / totalSeconds;
      })
    );
  }

  getProtocolETH() {
    return this.dashboardStatistics.pipe(
      map(dashboardStatistics => {
        return dashboardStatistics.protocols.find(
          protocol => protocol.name === 'ETH'
        );
      })
    );
  }

  getProtocolOthers() {
    return this.dashboardStatistics.pipe(
      map(dashboardStatistics => {
        return dashboardStatistics.protocols.filter(
          protocol => protocol.name !== 'ETH'
        );
      })
    );
  }

  getIR() {
    return this.dashboardStatistics.pipe(
      map(dashboardStatistics => {
        return dashboardStatistics.information_rate;
      })
    );
  }
}
