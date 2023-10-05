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
  private userToken: string;

  constructor(private http: HttpClient) {}

  // TODO:
  // 1. Pass the user token into the fetch req in data-storage to auth it!

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

          this.userLoggedIn = new User(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            experationDate
          );

          // pass on the user to the data-storage
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

          // set the user token
          this.userToken = responseData.idToken;

          // // pass on the user to the data-storage
          // this.userSubject.next(this.userLoggedIn);
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

  getUserToken() {
    return this.userToken;
  }
}
