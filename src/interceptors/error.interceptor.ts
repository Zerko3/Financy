import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from 'src/services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';

        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.message}`;
        } else {
          errorMsg = `Error code: ${error.status}, message: ${error.message}. This is in interceptor!`;
        }

        // Send the error message to the ErrorService
        this.errorService.setError(error);

        return throwError(errorMsg);
      })
    );
  }
}
