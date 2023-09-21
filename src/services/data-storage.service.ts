import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankAccount } from 'src/interfaces/bankAccount.interface';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorage {
  cardsArraySubject = new Subject<BankAccount[]>();
  cacheData: BankAccount[] | null = null;
  user: string = '';
  userRegistered: boolean = false;
  userLoggedIn: boolean = false;
  constructor(private http: HttpClient) {}

  getCorrectUser(user: string) {
    this.user = user;
  }

  userIsRegistered(register: boolean) {
    // if we get a user in here that means we are registered
    this.userRegistered = register;
  }

  userIsLoggedInButNoDataOnDom(loggedIn: boolean) {
    this.userLoggedIn = loggedIn;
  }

  // store data in Firebase
  storeValidUserDataInFirebase(data: BankAccount[]) {
    this.http
      .put(
        `https://angular---financy-default-rtdb.europe-west1.firebasedatabase.app/users/${this.user}/cards.json`,
        data
      )
      .subscribe((response: BankAccount[]) => {
        console.log(response);
      });
  }

  // get data from Firebase

  getValidUserDataFromFirebase() {
    // if i have data on DOM then do NOT call this HTTP request
    if (this.cacheData !== null || this.userRegistered || this.userLoggedIn) {
      console.log('PRESENT DATA ON DOM OR USER REGISTERED.');
      return this.cacheData;
    }

    return (
      this.http
        .get<BankAccount[] | null>(
          `https://angular---financy-default-rtdb.europe-west1.firebasedatabase.app/users/${this.user}/cards.json`
        )
        .subscribe((data: BankAccount[] | null) => {
          // if i get null return
          if (data === null) return;

          this.cacheData = data;

          // pass this data so it will be visible on the DOM
          this.cardsArraySubject.next(data);
        }),
      (error) => {
        console.log(error);
      }
    );
  }

  // Delete valid data from account

  deleteCardFromFirebase(card: number) {
    this.http
      .delete(
        `https://angular---financy-default-rtdb.europe-west1.firebasedatabase.app/users/${this.user}/cards/${card}.json`
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
