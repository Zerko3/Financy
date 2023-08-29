import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BankAccount } from 'src/interfaces/bankAccount.interface';

@Injectable({ providedIn: 'root' })
export class BankCardService {
  bankCardArray: BankAccount[] = [];
  totalMoneyInBankAccount: number = 0;
  totalMoneyInSpendingAccounts: number = 0;
  totalMoneyInSaveingAccounts: number = 0;
  bankCardSaveingTypeArray: BankAccount[] = [];
  bankCardSpendingTypeArray: BankAccount[] = [];
  bankCardSubscribe = new Subject<BankAccount>();
  constructor() {}
  // store bankacc
  storeBankCard(data: BankAccount) {
    this.bankCardArray.push(data);

    this.bankCardSubscribe.next(data);

    // Store valid card based on the type into its array
    if (data.bankAccountName === 'Saveings') {
      this.bankCardSaveingTypeArray.push(data);

      // calc for saveings account
      this.totalMoneyInSaveingAccounts += data.bankMoneyStatus;
    }

    if (data.bankAccountName === 'Spending') {
      this.bankCardSpendingTypeArray.push(data);

      // calc for spending account number
      this.totalMoneyInSpendingAccounts += data.bankMoneyStatus;
    }

    // calc for total balance
    this.totalMoneyInBankAccount =
      this.totalMoneyInSaveingAccounts + this.totalMoneyInSpendingAccounts;
  }

  getMoneyInBankAccount() {}

  // get bankacc
  getBankCard() {
    return this.bankCardArray.slice();
  }

  getSaveingsCards() {
    return this.bankCardSaveingTypeArray.slice();
  }

  getSpendingCards() {
    return this.bankCardSpendingTypeArray.slice();
  }
}
