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
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProtocolStatistics } from '../../models/dashboard-statistics';

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
    AsyncPipe,
  ],
  templateUrl: './dashboard-charts.component.html',
  styleUrl: './dashboard-charts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartsComponent {
  protocols = input.required<string[]>();
  private settingsService = inject(SettingsService);
  settings$: Observable<Settings> = this.settingsService.settings$;

  protocols$: Observable<string[]> = this.settingsService.settings$.pipe(
    map(settings =>
      Object.keys(settings.protocols || {})
        .filter(key => settings.protocols[key])
        .map(key => key.toLowerCase())
    )
  );
}
