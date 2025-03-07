import { Injectable } from '@angular/core';
import { ChartInformationRate } from '../models/chart-information-rate';
import { ChartFrames } from '../models/chart-frames';
import { ChartProtocol } from '../models/chart-protocol';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  getChartLabels(
    labelsNumber: number,
    labelTimeInterval: number,
    labelsStep: number = 5
  ): string[] {
    const now = new Date().getTime();
    return Array.from({ length: labelsNumber }, (_, index) => {
      if (index % labelsStep && index != 0 && index != labelsNumber - 1) {
        return '';
      }
      return new Date(
        now - (labelsNumber - index) * 1000 * labelTimeInterval
      ).toLocaleTimeString();
    });
  }

  getIRChartDataConfig(
    informationRates: ChartInformationRate[],
    recordsInterval: number
  ) {
    return {
      labels: this.getChartLabels(informationRates.length, recordsInterval),
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
  }

  getFramesChartDataConfig(frames: ChartFrames[], recordsInterval: number) {
    return {
      labels: this.getChartLabels(frames.length, recordsInterval),
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
  }

  getProtocolChartDataConfig(
    protocols: ChartProtocol[],
    recordsInterval: number
  ) {
    return {
      labels: this.getChartLabels(protocols.length, recordsInterval),
      datasets: [
        {
          label: 'Bytes',
          fill: false,
          yAxisID: 'y',
          tension: 0.4,
          data: protocols.map(protocol => protocol.bytes),
        },
        {
          label: 'Packets',
          fill: false,
          yAxisID: 'y1',
          tension: 0.4,
          data: protocols.map(protocol => protocol.packets),
        },
      ],
    };
  }

  getDefaultChartOptions() {
    return {
      animation: {
        duration: 0,
      },
    };
  }

  getMultipleYAxesChartOptions() {
    return {
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
  }
}
