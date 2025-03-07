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
import { interval, shareReplay, Subject, switchMap, takeUntil } from 'rxjs';
import { ChartInformationRate } from '../../models/chart-information-rate';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartService } from '../../service/chart.service';

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
  readonly #chartService = inject(ChartService);
  recordsLimit = input<number>(60);
  recordsInterval = signal<number>(1);
  irHistory = signal<ChartInformationRate[]>([]);
  data = computed(() => {
    const informationRates = this.irHistory();
    if (!informationRates) return;
    return this.#chartService.getIRChartDataConfig(
      informationRates,
      this.recordsInterval()
    );
  });

  readonly options = this.#chartService.getDefaultChartOptions();

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
}
