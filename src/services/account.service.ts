import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from 'src/models/account.model';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  // accountsArray: Account[] = [];
  user: Account;
  API_KEY: string = 'AIzaSyCf3BIrBUhY0z162tcEbA7slwckvyG8jVQ';
  constructor(private http: HttpClient) {}

  // TODO:
  // POST, GET from Firebase
  // Token validation -> will just do new Date and add some timer for logout

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

  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  // login user
  loginUser(newUser) {
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
