import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getCookie } from '../../../utils/GetTokenCookie.utils';

@Injectable()
export class HttpInterceptorAuth implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const ACCESS_TOKEN =
      getCookie('ACCESS_TOKEN') || localStorage.getItem('ACCESS_TOKEN');
    console.log(ACCESS_TOKEN);
    const requestUrl = request.url.split('/');
    console.log(requestUrl);

    // if have token (logged in)
    if (ACCESS_TOKEN) {
      // if you like bypass use requestUrl.includes('PART_OF_REQUEST')

      // if request is refresh token
      request = request.clone({
        setHeaders: { Authorization: ACCESS_TOKEN },
      });
    }

    // if not have token (not Logged in)
    return next.handle(request);
  }
}
