import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from 'src/interfaces/authResponse.interface';
import { Login } from 'src/interfaces/login.interface';
import { Account } from 'src/models/account.model';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, take, tap } from 'rxjs';
import { User } from 'src/models/user.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  userLoggedIn: User;
  API_KEY: string = environment._API_KEY;
  private userID: string;

  constructor(private http: HttpClient) {}

  singupUser(newUser: Account) {
    // store the data in the backend
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
        {
          email: newUser.email,
          password: newUser.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        tap((responseData) => {
          const experationDate = new Date(
            new Date().getTime() + +responseData.expiresIn * 1000
          );

          const user = new User(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            experationDate
          );
        })
      );
  }

  // login user
  loginUser(newUser: Login) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
        {
          email: newUser.email,
          password: newUser.password,
          returnSecureToken: true,
        }
      )
      .pipe(
        take(1),
        tap((responseData: AuthResponseData) => {
          const experationDate = new Date(
            new Date().getTime() + +responseData.expiresIn * 1000
          );

          // get user information and pass it on
          this.userLoggedIn = new User(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            experationDate
          );

          // set user ID
          this.userID = responseData.localId;
        })
      );
  }

  // logout
  logout(setStatus: null) {
    this.userLoggedIn = setStatus;
  }

  getUserId() {
    return this.userID;
  }
}
