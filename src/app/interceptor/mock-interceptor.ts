import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { urls } from './interceptor';
import { ChartFrames } from '../models/chart-frames';
import { DASHBOARD_API_URL } from '../api/dashboard.api';
import { ChartInformationRate } from '../models/chart-information-rate';

export const MockInterceptor: HttpInterceptorFn = (req, next) => {
  const { url, method } = req;

  for (const element of urls) {
    let body = (element.json() as any).default;

    if (url === DASHBOARD_API_URL + '/frames/current') {
      body = getRandomFrameRecord();
    } else if (url === DASHBOARD_API_URL + '/information-rate/current') {
      body = getRandomInformationRateRecord();
    }

    if (url.includes(element.url)) {
      return of(new HttpResponse({ status: 200, body: body })).pipe(delay(300));
    }
  }
  return next(req);
};

function getRandomFrameRecord(): { data: ChartFrames } {
  const validNumber = Math.floor(Math.random() * 5000) + 200;
  return {
    data: {
      valid: validNumber,
      invalid: Math.floor(Math.random() * validNumber * 0.3),
    },
  };
}

function getRandomInformationRateRecord(): { data: ChartInformationRate } {
  const current = Math.floor(Math.random() * 1000) + 30;
  return {
    data: {
      current: current,
      average: Math.floor(Math.random() * current * 0.3),
    },
  };
}
