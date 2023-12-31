import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankAccount } from 'src/interfaces/bankAccount.interface';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorage {
  cardsArraySubject = new Subject<BankAccount[]>();
  errorSubject = new Subject<HttpErrorResponse>();
  cardDeletedSubject = new Subject<unknown>();
  updatedArray = new Subject<BankAccount[]>();
  private cacheData: BankAccount[] | null = null;
  private userRegistered: boolean = false;
  private userLoggedIn: boolean = false;
  private cardDeleted: boolean = false;

  private user: string = '';
  private userToken: string;

  constructor(private http: HttpClient) {}

  // getCorrectUser(user: string) {
  //   this.user = user;
  // }

  userIsRegistered(register: boolean) {
    // if we get a user in here that means we are registered
    this.userRegistered = register;
  }

  userIsLoggedInButNoDataOnDom(loggedIn: boolean) {
    this.userLoggedIn = loggedIn;
  }

  // JWT

  // store data in Firebase
  storeValidUserDataInFirebase(data: BankAccount[]) {
    this.http
      .put(
        `https://angular---financy-default-rtdb.europe-west1.firebasedatabase.app/users/${this.user}/cards.json`,
        data,
        {
          params: new HttpParams().set('auth', this.userToken),
        }
      )
      .subscribe((response: BankAccount[]) => {
        this.updatedArray.next(response);

        // update cache
        this.cacheData = response;
      });
  }

  // get data from Firebase

  getValidUserDataFromFirebase(userID: string, userToken: string) {
    // set userID for the app
    this.user = userID;
    // set userToken for the app
    this.userToken = userToken;
    // if i have data on DOM then do NOT call this HTTP request
    if (this.cacheData !== null || this.userRegistered || this.userLoggedIn) {
      return this.cacheData;
    }

    return this.http
      .get<BankAccount[] | null>(
        `https://angular---financy-default-rtdb.europe-west1.firebasedatabase.app/users/${userID}/cards.json`,
        {
          params: new HttpParams().set('auth', userToken),
        }
      )
      .subscribe(
        (data: BankAccount[] | null) => {
          // if i get null return
          if (data === null) return;

          this.cacheData = data;

          // pass this data so it will be visible on the DOM
          this.cardsArraySubject.next(data);
        },
        (error: HttpErrorResponse) => {
          // pass the error into the subject
          this.errorSubject.next(error);
        }
      );
  }

  // Delete valid data from account

  deleteCardFromFirebase(card: number): void {
    this.http
      .delete(
        `https://angular---financy-default-rtdb.europe-west1.firebasedatabase.app/users/${this.user}/cards/${card}.json`,
        {
          params: new HttpParams().set('auth', this.userToken),
        }
      )
      .subscribe((response: null) => {
        // do logic for card deletion UX in here since its not an error but a response
        this.cardDeleted = true;
        this.cardDeletedSubject.next(this.cardDeleted);
      });
  }

  getCacheData(): BankAccount[] {
    return this.cacheData;
  }

  deleteCacheDataOnLogout() {
    this.cacheData = null;
    return this.cacheData;
  }
}
