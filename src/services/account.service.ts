import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from 'src/models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  // accountsArray: Account[] = [];
  user: Account;
  constructor(private http: HttpClient) {}

  // TODO:
  // POST, GET from Firebase
  // Token validation -> will just do new Date and add some timer for logout

  storeUserData(account: Account) {
    // get the data
    this.user = account;
    // store the data in the backend

    this.http
      .put(
        'https://angular---financy-default-rtdb.europe-west1.firebasedatabase.app/users.json',
        this.user
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
