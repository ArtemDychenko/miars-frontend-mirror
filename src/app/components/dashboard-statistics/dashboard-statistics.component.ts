import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';
import { AsyncPipe, NgIf } from '@angular/common';
import { DashboardApi } from '../../api/dashboard.api';

import { interval, shareReplay, switchMap } from 'rxjs';
import { ProtocolStatistics } from '../../models/dashboard-statistics';
import { TimePipe } from '../../pipes/time.pipe';
import { DecimalPipe } from '../../pipes/decimal.pipe';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SettingsService } from '../../service/settings.service';

@Component({
  selector: 'app-dashboard-statistics',
  imports: [
    NgxSkeletonLoaderComponent,
    AsyncPipe,
    TimePipe,
    DecimalPipe,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './dashboard-statistics.component.html',
  styleUrl: './dashboard-statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStatisticsComponent implements OnInit {
  dashboardApi = inject(DashboardApi);
  settings: any;

  private settingsService = inject(SettingsService);

  ngOnInit() {
    this.settingsService.settings$.subscribe(settings => {
      this.settings = settings;
      console.log('Settings received in Dashboard:', this.settings);
    });
  }

  dashboardStatistics = interval(1000).pipe(
    switchMap(() => this.dashboardApi.fetchStatistics()),
    shareReplay(1)
  );

  get showETHSetting() {
    return this.settings.value.statisticsRowsAndCharts.showETH;
  }

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
