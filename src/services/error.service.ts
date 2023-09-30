import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  errorMessage = new BehaviorSubject<HttpErrorResponse>(null);
  constructor() {}
  // set error
  setError(error: HttpErrorResponse) {
    this.errorMessage.next(error);
  }
}
