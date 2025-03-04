import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import {
  DashboardStatistics,
  DashboardStatisticsDto,
  dtoToDashboardStatistics,
} from '../models/dashboard-statistics';
import { ApiResponse } from '../models/api-response';

export const DASHBOARD_API_URL = '/api/v1/dashboard/statistics';

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
}
