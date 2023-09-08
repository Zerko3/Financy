import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterService } from './register.service';

@Injectable({ providedIn: 'root' })
export class DataStorage {
  constructor(
    private http: HttpClient,
    private registerService: RegisterService
  ) {}

  // TODO:
  // store user when he creates an account

  // 1. GET user data from register service in here
  // 2. Pass valid user data to my backend to store it
}
