import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { UIChart } from 'primeng/chart';

@Component({
  selector: 'app-dashboard-chart-protocol',
  imports: [UIChart],
  templateUrl: './dashboard-chart-protocol.component.html',
  styleUrl: './dashboard-chart-protocol.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardChartProtocolComponent {
  protocol = input.required<string>();
  data: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);

    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--p-orange-500'),
        },
        {
          label: 'Third Dataset',
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: documentStyle.getPropertyValue('--p-gray-500'),
          tension: 0.4,
          backgroundColor: 'rgba(107, 114, 128, 0.2)',
        },
      ],
    };
  }
}
