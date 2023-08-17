import { Injectable } from '@angular/core';
import { Account } from 'src/models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  accountsArray: Account[] = [];
  constructor() {}

  // TODO:
  // POST, GET from Firebase
  // Token validation -> will just do new Date and add some timer for logout

  // store new acc
  getNewAccounts(account: Account) {
    this.accountsArray.push(account);
    console.log(this.accountsArray);
  }
}
