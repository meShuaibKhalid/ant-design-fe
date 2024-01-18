import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, tap, throwError } from 'rxjs';
import { Loader } from '../../shared/services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class HttpIntecept implements HttpInterceptor {
  constructor(private loader: Loader) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        this.loader.hide();
        return throwError(() => err);
      })
    );
  }
}
