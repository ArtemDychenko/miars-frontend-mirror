import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { DashboardChartFramesComponent } from '../dashboard-chart-frames/dashboard-chart-frames.component';
import { DashboardChartInformationRateComponent } from '../dashboard-chart-information-rate/dashboard-chart-information-rate.component';
import { DashboardChartProtocolComponent } from '../dashboard-chart-protocol/dashboard-chart-protocol.component';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { Skeleton } from 'primeng/skeleton';
import { Settings } from '../../models/settings';
import { SettingsService } from '../../service/settings.service';

@Component({
  selector: 'app-dashboard-charts',
  imports: [
    MatTabGroup,
    MatTab,
    DashboardChartFramesComponent,
    DashboardChartInformationRateComponent,
    DashboardChartProtocolComponent,
    SliderModule,
    FormsModule,
    Skeleton,
  ],
  templateUrl: './dashboard-charts.component.html',
  styleUrl: './dashboard-charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartsComponent {
  protocols = input.required<string[]>();
  settings!: Settings;

  private settingsService = inject(SettingsService);

  constructor() {
    this.settingsService.settingsObserver$.subscribe(settings => {
      this.settings = settings;
    });
  }

  showProtocolChart(protocolName: string): boolean {
    const rows = this.settings;
    return (
      (rows?.showIPv4 && protocolName === 'ipv4') ||
      (rows?.showIPv6 && protocolName === 'ipv6') ||
      (rows?.showTCP && protocolName === 'tcp')
    );
  }
}
