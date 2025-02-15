import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable, of } from 'rxjs';
import {
  Configuration,
  configurationMock,
  configurationToDto,
  dtoToConfiguration,
} from '../models/configuration';

export const CONFIGURATION_API_URL = '/api/v1/configuration';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationApi {
  private readonly httpClient = inject(HttpClient);

  fetch(): Observable<Configuration> {
    // return this.httpClient
    //   .get<Configuration>(CONFIGURATION_API_URL)
    //   .pipe(map(dto => dtoToConfiguration(dto)));
    return of(configurationMock).pipe(delay(500));
  }

  save(configuration: Configuration): Observable<Configuration> {
    return this.httpClient
      .put<Configuration>(
        CONFIGURATION_API_URL,
        configurationToDto(configuration)
      )
      .pipe(map(dto => dtoToConfiguration(dto)));
  }
}
