import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';
import { urls } from './interceptor';

export const MockInterceptor: HttpInterceptorFn = (req, next) => {
  const { url, method } = req;

  for (const element of urls) {
    if (url.includes(element.url)) {
      console.log('Loaded from json for url: ' + url, element.json);
      return of(
        new HttpResponse({ status: 200, body: (element.json as any).default })
      ).pipe(delay(300));
    }
  }
  return next(req);
};
