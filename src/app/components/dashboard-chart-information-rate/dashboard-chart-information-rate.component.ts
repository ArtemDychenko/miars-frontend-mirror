import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { UIChart } from 'primeng/chart';
import { DashboardApi } from '../../api/dashboard.api';
import { ChartFrames } from '../../models/chart-frames';
import { interval, shareReplay, Subject, switchMap, takeUntil } from 'rxjs';
import { ChartInformationRate } from '../../models/chart-information-rate';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-chart-information-rate',
  imports: [
    UIChart,
    MatFormField,
    MatInput,
    MatLabel,
    MatSlider,
    MatSliderThumb,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './dashboard-chart-information-rate.component.html',
  styleUrl: './dashboard-chart-information-rate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartInformationRateComponent {
  readonly #dashboardApi = inject(DashboardApi);
  recordsLimit = input<number>(20);
  recordsInterval = signal<number>(1);
  irHistory = signal<ChartInformationRate[]>([]);
  data = computed(() => {
    const informationRates = this.irHistory();
    if (!informationRates) return;
    return {
      labels: this.getFrameLabels().map(date => date.toLocaleTimeString()),
      datasets: [
        {
          label: 'Current IR',
          data: informationRates.map(ir => ir.current),
          fill: true,
          backgroundColor: 'rgba(144,147,239,0.32)',
          tension: 0.4,
          borderColor: '#5b70f8',
        },
        {
          label: 'Average IR',
          data: informationRates.map(ir => ir.average),
          tension: 0.4,
          borderColor: '#535353',
        },
      ],
    };
  });

  options = {
    animation: {
      duration: 0,
    },
  };

  private stopFetching = new Subject();

  constructor() {
    effect(() => {
      this.stopFetching.next(undefined);

      this.#dashboardApi
        .fetchInformationRateHistory(this.recordsInterval())
        .subscribe(response => this.irHistory.set(response));

      interval(this.recordsInterval() * 1000)
        .pipe(
          takeUntil(this.stopFetching),
          switchMap(() => this.#dashboardApi.fetchInformationRate()),
          shareReplay(1)
        )
        .subscribe(ir => {
          this.irHistory.update(informationRates => {
            if (informationRates.length < this.recordsLimit())
              return [...informationRates, ir];
            return [...informationRates.splice(1), ir];
          });
        });
    });
  }

  private getFrameLabels(): Date[] {
    const labelsNumber = this.irHistory().length;
    const now = new Date().getTime();
    return Array.from(
      { length: labelsNumber },
      (_, index) =>
        new Date(now - (labelsNumber - index) * 1000 * this.recordsInterval())
    );
  }
}
