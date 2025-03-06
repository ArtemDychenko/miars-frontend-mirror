import {
  afterNextRender,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { DashboardApi } from '../../api/dashboard.api';
import { interval, map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import {
  DashboardStatistics,
  ProtocolStatistics,
} from '../../models/dashboard-statistics';
import { PillComponent } from '../pill/pill.component';
import { TimePipe } from '../../pipes/time.pipe';
import { DecimalPipe } from '../../pipes/decimal.pipe';

@Component({
  selector: 'app-dashboard-statistics',
  imports: [NgxSkeletonLoaderComponent, AsyncPipe, TimePipe, DecimalPipe],
  templateUrl: './dashboard-statistics.component.html',
  styleUrl: './dashboard-statistics.component.scss',
})
export class DashboardStatisticsComponent {
  dashboardApi = inject(DashboardApi);

  dashboardStatistics = interval(1000).pipe(
    switchMap(() => this.dashboardApi.fetchStatistics()),
    shareReplay(1)
  );

  getPerSecond(value: number, time: Date): number {
    const totalSeconds = time.getTime() / 1000;
    return value / totalSeconds;
  }

  getETHStatistics(protocols: ProtocolStatistics[]): ProtocolStatistics {
    return protocols.find(protocol => protocol.name === 'ETH')!;
  }

  getProtocols(protocols: ProtocolStatistics[]): ProtocolStatistics[] {
    return protocols.filter(protocol => protocol.name !== 'ETH');
  }
}
