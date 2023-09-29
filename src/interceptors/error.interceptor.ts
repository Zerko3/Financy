import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('INTERCEPTOR START');
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
          console.log('Error 1');
        } else {
          errorMsg = `Error code: ${error.status}, message: ${error.error.message}`;
          console.log('ERROR 2');
        }

        return throwError(errorMsg);
      })
    );
  }
}
