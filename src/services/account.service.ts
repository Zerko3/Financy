import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from 'src/interfaces/authResponse.interface';
import { Login } from 'src/interfaces/login.interface';
import { Account } from 'src/models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  user: Account;
  API_KEY: string = 'AIzaSyCf3BIrBUhY0z162tcEbA7slwckvyG8jVQ';
  constructor(private http: HttpClient) {}

  singupUser(newUser: Account) {
    // store the data in the backend
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
      {
        email: newUser.email,
        password: newUser.password,
        returnSecureToken: true,
      }
    );
  }

  // login user
  loginUser(newUser: Login) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
      {
        email: newUser.email,
        password: newUser.password,
        returnSecureToken: true,
      }
    );
  }
}
