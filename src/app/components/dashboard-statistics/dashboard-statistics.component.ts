import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { AsyncPipe } from '@angular/common';
import { DashboardApi } from '../../api/dashboard.api';

import { interval, shareReplay, switchMap } from 'rxjs';
import { ProtocolStatistics } from '../../models/dashboard-statistics';
import { TimePipe } from '../../pipes/time.pipe';
import { DecimalPipe } from '../../pipes/decimal.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { Settings } from '../../models/settings';

@Component({
  selector: 'app-dashboard-statistics',
  imports: [
    NgxSkeletonLoaderComponent,
    AsyncPipe,
    TimePipe,
    DecimalPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard-statistics.component.html',
  styleUrl: './dashboard-statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStatisticsComponent {
  dashboardApi = inject(DashboardApi);
  settings = input.required<Settings>();

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

  showAnyStatisticsColumn(settings: Settings): boolean {
    return (
      settings.showBytesPerSec ||
      settings.showPacketsPerSec ||
      settings.showTotalBytes ||
      settings.showTotalPackets
    );
  }

  showStatisticsRowsAndCharts(settings: Settings): boolean {
    return settings.showETH || Object.values(settings.protocols).some(v => v);
  }

  showInformationRate(settings: Settings): boolean {
    return (
      settings.showMinValue ||
      settings.showMaxValue ||
      settings.showCurrentValue
    );
  }
}
