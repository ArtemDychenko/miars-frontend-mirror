import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { DashboardChartFramesComponent } from '../dashboard-chart-frames/dashboard-chart-frames.component';
import { DashboardChartInformationRateComponent } from '../dashboard-chart-information-rate/dashboard-chart-information-rate.component';
import { DashboardChartProtocolComponent } from '../dashboard-chart-protocol/dashboard-chart-protocol.component';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { Skeleton } from 'primeng/skeleton';

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
}
