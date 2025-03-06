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
import { ChartInformationRate } from '../../models/chart-information-rate';
import { interval, shareReplay, Subject, switchMap, takeUntil } from 'rxjs';
import { ChartProtocol } from '../../models/chart-protocol';

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
  protocolName = input.required<string>();
  recordsLimit = input<number>(20);
  recordsInterval = signal<number>(1);
  protocolHistory = signal<ChartProtocol[]>([]);
  data = computed(() => {
    const protocols = this.protocolHistory();
    if (!protocols) return;
    console.log(protocols);
    return {
      labels: this.getFrameLabels().map(date => date.toLocaleTimeString()),
      datasets: [
        {
          label: 'Bytes',
          data: protocols.map(protocol => protocol.bytes),
          yAxisId: 'y',
          tension: 0.4,
          borderColor: '#4464e3',
        },
        // @todo: fix Y1 axis
        {
          label: 'Packets',
          data: protocols.map(protocol => protocol.packets),
          yAxisId: 'y1',
          tension: 0.4,
          borderColor: '#61aa48',
        },
      ],
    };
  });

  options = {
    animation: {
      duration: 0,
    },
    stacked: false,
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

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

  private getFrameLabels(): Date[] {
    const labelsNumber = this.protocolHistory().length;
    const now = new Date().getTime();
    return Array.from(
      { length: labelsNumber },
      (_, index) =>
        new Date(now - (labelsNumber - index) * 1000 * this.recordsInterval())
    );
  }
}
