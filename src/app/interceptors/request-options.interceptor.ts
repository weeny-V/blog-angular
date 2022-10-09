import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class RequestOptionsInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userReq = request.clone({
      setHeaders: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
      },
    });

    return next.handle(userReq);
  }
}
