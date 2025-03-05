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

@Component({
  selector: 'app-dashboard-chart-frames',
  imports: [UIChart],
  templateUrl: './dashboard-chart-frames.component.html',
  styleUrl: './dashboard-chart-frames.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartFramesComponent {
  readonly #dashboardApi = inject(DashboardApi);
  recordsInterval = input<number>(1);
  recordsLimit = input<number>(20);
  framesHistory = signal<ChartFrames[]>([]);
  data = computed(() => {
    const frames = this.framesHistory();
    if (!frames) return;
    return {
      labels: this.getFrameLabels().map(date => date.toLocaleTimeString()),
      datasets: [
        {
          label: 'Valid Frames',
          data: frames.map(frame => frame.valid),
          fill: true,
          backgroundColor: 'rgb(76, 175, 80, 0.2)',
          tension: 0.4,
          borderColor: '#4CAF50',
        },
        {
          label: 'Invalid Frames',
          data: frames.map(frame => frame.invalid),
          fill: true,
          tension: 0.4,
          borderColor: '#f34d52',
          backgroundColor: 'rgb(243, 77, 82, 0.2)',
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

  private getFrameLabels(): Date[] {
    const labelsNumber = this.framesHistory().length;
    const now = new Date().getTime();
    return Array.from(
      { length: labelsNumber },
      (_, index) =>
        new Date(now - (labelsNumber - index) * 1000 * this.recordsInterval())
    );
  }
}
