import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { AsyncPipe } from '@angular/common';
import { DashboardApi } from '../../api/dashboard.api';

import { interval, shareReplay, switchMap } from 'rxjs';
import { ProtocolStatistics } from '../../models/dashboard-statistics';
import { TimePipe } from '../../pipes/time.pipe';
import { DecimalPipe } from '../../pipes/decimal.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from '../../service/settings.service';
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
export class DashboardStatisticsComponent implements OnInit {
  dashboardApi = inject(DashboardApi);
  settings!: Settings;

  settingsService = inject(SettingsService);

  ngOnInit() {
    this.settingsService.settingsObserver$.subscribe(settings => {
      this.settings = settings;
      console.log('Settings received in Dashboard:', this.settings);
    });
  }

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

  get showAnyStatisticsColumn(): boolean {
    const cols = this.settings;
    return (
      cols?.showBytesPerSec ||
      cols?.showPacketsPerSec ||
      cols?.showTotalBytes ||
      cols?.showTotalPackets
    );
  }

  get showStatisticsRowsAndCharts(): boolean {
    const rows = this.settings;
    return rows?.showETH || rows?.showIPv4 || rows?.showIPv6 || rows?.showTCP;
  }

  get showInformationRate(): boolean {
    const ir = this.settings;
    return ir?.showMinValue || ir?.showMaxValue || ir?.showCurrentValue;
  }

  showProtocolRow(protocolName: string): boolean {
    const rows = this.settings;
    return (
      (rows?.showIPv4 && protocolName === 'IPv4') ||
      (rows?.showIPv6 && protocolName === 'IPv6') ||
      (rows?.showTCP && protocolName === 'TCP')
    );
  }
}
