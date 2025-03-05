import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { ChartFrames } from '../models/chart-frames';
import { map, Observable, tap } from 'rxjs';
import { ChartInformationRate } from '../models/chart-information-rate';
import { ChartProtocol } from '../models/chart-protocol';

export const DASHBOARD_API_URL = '/statistics';

@Injectable({
  providedIn: 'root',
})
export class DashboardApi {
  private readonly httpClient = inject(HttpClient);

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
      .pipe(
        map(response => response.data),
        tap(console.log)
      );
  }

  fetchFrames(): Observable<ChartFrames> {
    return this.httpClient
      .get<ApiResponse<ChartFrames>>(`${DASHBOARD_API_URL}/frames/current`)
      .pipe(map(response => response.data));
  }

  fetchInformationRateHistory(): Observable<ChartInformationRate[]> {
    return this.httpClient
      .get<
        ApiResponse<ChartInformationRate[]>
      >(`${DASHBOARD_API_URL}/information-rate/historical`)
      .pipe(map(response => response.data));
  }

  fetchInformationRate(): Observable<ChartInformationRate> {
    return this.httpClient
      .get<
        ApiResponse<ChartInformationRate>
      >(`${DASHBOARD_API_URL}/information-rate/current`)
      .pipe(map(response => response.data));
  }

  fetchProtocolHistory(): Observable<ChartProtocol[]> {
    return this.httpClient
      .get<
        ApiResponse<ChartProtocol[]>
      >(`${DASHBOARD_API_URL}/protocols/historical`)
      .pipe(map(response => response.data));
  }

  fetchProtocol(): Observable<ChartProtocol> {
    return this.httpClient
      .get<ApiResponse<ChartProtocol>>(`${DASHBOARD_API_URL}/protocols/current`)
      .pipe(map(response => response.data));
  }
}
