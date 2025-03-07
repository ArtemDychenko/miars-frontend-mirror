import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { DashboardApi } from '../../api/dashboard.api';
import { ChartFrames } from '../../models/chart-frames';
import { UIChart } from 'primeng/chart';
import { interval, shareReplay, Subject, switchMap, takeUntil } from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: 'app-dashboard-chart-frames',
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
  templateUrl: './dashboard-chart-frames.component.html',
  styleUrl: './dashboard-chart-frames.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartFramesComponent {
  readonly #dashboardApi = inject(DashboardApi);
  readonly #chartService = inject(ChartService);
  recordsLimit = input<number>(60);
  recordsInterval = signal<number>(1);
  framesHistory = signal<ChartFrames[]>([]);
  data = computed(() => {
    const frames = this.framesHistory();
    if (!frames) return;
    return this.#chartService.getFramesChartDataConfig(
      frames,
      this.recordsInterval()
    );
  });

  readonly options = this.#chartService.getDefaultChartOptions();

  private stopFetching = new Subject();

  constructor() {
    effect(() => {
      this.stopFetching.next(undefined);

      this.#dashboardApi
        .fetchFramesHistory(this.recordsInterval())
        .subscribe(response => this.framesHistory.set(response));

      interval(this.recordsInterval() * 1000)
        .pipe(
          takeUntil(this.stopFetching),
          switchMap(() => this.#dashboardApi.fetchFrames()),
          shareReplay(1)
        )
        .subscribe(frame => {
          this.framesHistory.update(frames => {
            if (frames.length < this.recordsLimit()) return [...frames, frame];
            return [...frames.splice(1), frame];
          });
        });
    });
  }
}
