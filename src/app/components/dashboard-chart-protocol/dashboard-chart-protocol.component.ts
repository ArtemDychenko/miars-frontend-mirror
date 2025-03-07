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
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardApi } from '../../api/dashboard.api';
import { ChartProtocol } from '../../models/chart-protocol';
import { interval, shareReplay, Subject, switchMap, takeUntil } from 'rxjs';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: 'app-dashboard-chart-protocol',
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
  templateUrl: './dashboard-chart-protocol.component.html',
  styleUrl: './dashboard-chart-protocol.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartProtocolComponent {
  readonly #dashboardApi = inject(DashboardApi);
  readonly #chartService = inject(ChartService);
  protocolName = input.required<string>();
  recordsLimit = input<number>(60);
  recordsInterval = signal<number>(1);
  protocolHistory = signal<ChartProtocol[]>([]);
  data = computed(() => {
    const protocols = this.protocolHistory();
    if (!protocols) return;
    return this.#chartService.getProtocolChartDataConfig(
      protocols,
      this.recordsInterval()
    );
  });

  readonly options = this.#chartService.getMultipleYAxesChartOptions();

  private stopFetching = new Subject();

  constructor() {
    effect(() => {
      this.stopFetching.next(undefined);

      this.#dashboardApi
        .fetchProtocolHistory(this.protocolName(), this.recordsInterval())
        .subscribe(response => this.protocolHistory.set(response));

      interval(this.recordsInterval() * 1000)
        .pipe(
          takeUntil(this.stopFetching),
          switchMap(() =>
            this.#dashboardApi.fetchProtocol(this.protocolName())
          ),
          shareReplay(1)
        )
        .subscribe(ir => {
          this.protocolHistory.update(protocols => {
            if (protocols.length < this.recordsLimit())
              return [...protocols, ir];
            return [...protocols.splice(1), ir];
          });
        });
    });
  }
}
