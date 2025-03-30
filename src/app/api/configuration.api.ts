import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, Observable } from 'rxjs';
import {
  Configuration,
  ConfigurationDto,
  configurationToDto,
  dtoToConfiguration,
} from '../models/configuration';
import { ApiResponse } from '../models/api-response';

export const CONFIGURATION_API_URL = '/api/configurations';

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

  fetchAppliedConfiguration(): Observable<Configuration> {
    return this.httpClient
      .get<ApiResponse<ConfigurationDto[]>>(CONFIGURATION_API_URL)
      .pipe(
        map(dto => dto.data),

        map(configurations => {
          const appliedConfiguration = configurations.find(
            dto => dto.is_applied
          );

          return appliedConfiguration!.id;
        }),

        mergeMap(appliedConfigId => {
          return this.httpClient
            .get<
              ApiResponse<ConfigurationDto>
            >(`${CONFIGURATION_API_URL}/${appliedConfigId}`)
            .pipe(map(dto => dtoToConfiguration(dto.data)));
        })
      );
  }

  find(configId: string): Observable<Configuration> {
    return this.httpClient
      .get<
        ApiResponse<ConfigurationDto>
      >(`${CONFIGURATION_API_URL}/${configId}`)
      .pipe(map(dto => dtoToConfiguration(dto.data)));
  }

  add(configuration: Configuration): Observable<Configuration> {
    return this.httpClient
      .post<
        ApiResponse<ConfigurationDto>
      >(CONFIGURATION_API_URL, configurationToDto(configuration))
      .pipe(map(dto => dtoToConfiguration(dto.data)));
  }

  save(configuration: Configuration): Observable<Configuration> {
    return this.httpClient
      .put<
        ApiResponse<ConfigurationDto>
      >(`${CONFIGURATION_API_URL}/${configuration.id}`, configurationToDto(configuration))
      .pipe(map(dto => dtoToConfiguration(dto.data)));
  }

  apply(configurationId: string): Observable<Configuration> {
    return this.httpClient
      .post<
        ApiResponse<ConfigurationDto>
      >(`${CONFIGURATION_API_URL}/${configurationId}/apply`, {})
      .pipe(map(dto => dtoToConfiguration(dto.data)));
  }

  delete(configurationId: string): Observable<void> {
    return this.httpClient.delete<void>(
      `${CONFIGURATION_API_URL}/${configurationId}`
    );
  }
}
