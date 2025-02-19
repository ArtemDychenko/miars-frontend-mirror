import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import {
  Configuration,
  ConfigurationDto,
  configurationToDto,
  dtoToConfiguration,
} from '../models/configuration';
import { ApiResponse } from '../models/api-response';

export const CONFIGURATION_API_URL = '/api/v1/configuration';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationApi {
  private readonly httpClient = inject(HttpClient);

  fetch(): Observable<Configuration[]> {
    return this.httpClient
      .get<ApiResponse<ConfigurationDto[]>>(CONFIGURATION_API_URL)
      .pipe(map(dto => dto.data.map(dtoToConfiguration)));
  }

  find(configName: string): Observable<Configuration> {
    return this.httpClient
      .get<
        ApiResponse<ConfigurationDto>
      >(`${CONFIGURATION_API_URL}/${configName}`)
      .pipe(map(dto => dtoToConfiguration(dto.data)));
  }

  save(configuration: Configuration): Observable<Configuration> {
    return this.httpClient
      .put<
        ApiResponse<ConfigurationDto>
      >(CONFIGURATION_API_URL, configurationToDto(configuration))
      .pipe(map(dto => dtoToConfiguration(dto.data)));
  }
}
