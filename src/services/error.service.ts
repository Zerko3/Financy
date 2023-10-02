import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  errorStatus: boolean = false;
  constructor() {}
  // set error
  setError() {}

  // get error
  getError() {}
}
