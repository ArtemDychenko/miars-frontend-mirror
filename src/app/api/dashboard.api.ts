import { ApiResponse } from '../models/api-response';
import { ChartFrames } from '../models/chart-frames';
import { filter, map, Observable } from 'rxjs';
import { ChartInformationRate } from '../models/chart-information-rate';
import { ChartProtocol } from '../models/chart-protocol';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  DashboardStatistics,
  DashboardStatisticsDto,
  dtoToDashboardStatistics,
} from '../models/dashboard-statistics';

export const DASHBOARD_API_URL = '/api/statistics';

@Injectable({
  providedIn: 'root',
})
export class DashboardApi {
  private readonly httpClient = inject(HttpClient);

  fetchStatistics(): Observable<DashboardStatistics> {
    return this.httpClient
      .get<DashboardStatisticsDto>(DASHBOARD_API_URL)
      .pipe(map(dto => dtoToDashboardStatistics(dto)));
  }

  fetchFramesHistory(interval: number): Observable<ChartFrames[]> {
    return this.httpClient
      .get<ChartFrames[]>(`${DASHBOARD_API_URL}/frames/historical`, {
        params: {
          interval: interval.toString(),
        },
      })
      .pipe(map(response => response));
  }

  fetchFrames(): Observable<ChartFrames> {
    return this.httpClient
      .get<ChartFrames>(`${DASHBOARD_API_URL}/frames/current`)
      .pipe(map(response => response));
  }

  fetchInformationRateHistory(
    interval: number
  ): Observable<ChartInformationRate[]> {
    return this.httpClient
      .get<ChartInformationRate[]>(
        `${DASHBOARD_API_URL}/information-rate/historical`,
        {
          params: {
            interval: interval.toString(),
          },
        }
      )
      .pipe(map(response => response));
  }

  fetchInformationRate(): Observable<ChartInformationRate> {
    return this.httpClient
      .get<ChartInformationRate>(
        `${DASHBOARD_API_URL}/information-rate/current`
      )
      .pipe(map(response => response));
  }

  fetchProtocolHistory(
    protocolName: string,
    interval: number
  ): Observable<ChartProtocol[]> {
    return this.httpClient
      .get<ChartProtocol[]>(`${DASHBOARD_API_URL}/${protocolName}/historical`, {
        params: {
          interval: interval.toString(),
        },
      })
      .pipe(map(response => response));
  }

  fetchProtocol(protocolName: string): Observable<ChartProtocol> {
    return this.httpClient
      .get<ChartProtocol>(`${DASHBOARD_API_URL}/${protocolName}/current`)
      .pipe(
        map((response): ChartProtocol => response),
        filter(d => d.packets !== undefined && d.bytes !== undefined) // for some reason, the HTTP client returns object of type Settings instead of ChartProtocol
      );
  }
}
