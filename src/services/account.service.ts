import { Injectable } from '@angular/core';
import { Account } from 'src/models/account.model';

@Injectable({ providedIn: 'root' })
export class AccountService {
  accountsArray: Account[] = [];
  constructor() {}

  // store new acc
  getNewAccounts(account: Account) {
    this.accountsArray.push(account);
    console.log(this.accountsArray);
  }
}
