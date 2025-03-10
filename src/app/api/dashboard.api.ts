import { ApiResponse } from '../models/api-response';
import { ChartFrames } from '../models/chart-frames';
import { map, Observable, tap } from 'rxjs';
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
      .get<ApiResponse<DashboardStatisticsDto>>(DASHBOARD_API_URL)
      .pipe(map(dto => dtoToDashboardStatistics(dto.data)));
  }

  fetchFramesHistory(interval: number): Observable<ChartFrames[]> {
    return this.httpClient
      .get<ApiResponse<ChartFrames[]>>(
        `${DASHBOARD_API_URL}/frames/historical`,
        {
          params: {
            interval: interval.toString(),
          },
        }
      )
      .pipe(map(response => response.data));
  }

  fetchFrames(): Observable<ChartFrames> {
    return this.httpClient
      .get<ApiResponse<ChartFrames>>(`${DASHBOARD_API_URL}/frames/current`)
      .pipe(map(response => response.data));
  }

  fetchInformationRateHistory(
    interval: number
  ): Observable<ChartInformationRate[]> {
    return this.httpClient
      .get<ApiResponse<ChartInformationRate[]>>(
        `${DASHBOARD_API_URL}/information-rate/historical`,
        {
          params: {
            interval: interval.toString(),
          },
        }
      )
      .pipe(map(response => response.data));
  }

  fetchInformationRate(): Observable<ChartInformationRate> {
    return this.httpClient
      .get<
        ApiResponse<ChartInformationRate>
      >(`${DASHBOARD_API_URL}/information-rate/current`)
      .pipe(map(response => response.data));
  }

  fetchProtocolHistory(
    protocolName: string,
    interval: number
  ): Observable<ChartProtocol[]> {
    return this.httpClient
      .get<ApiResponse<ChartProtocol[]>>(
        `${DASHBOARD_API_URL}/${protocolName}/historical`,
        {
          params: {
            interval: interval.toString(),
          },
        }
      )
      .pipe(map(response => response.data));
  }

  fetchProtocol(protocolName: string): Observable<ChartProtocol> {
    return this.httpClient
      .get<
        ApiResponse<ChartProtocol>
      >(`${DASHBOARD_API_URL}/${protocolName}/current`)
      .pipe(map(response => response.data));
  }
}
