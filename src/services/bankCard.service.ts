import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BankAccount } from 'src/interfaces/bankAccount.interface';

@Injectable({ providedIn: 'root' })
export class BankCardService {
  bankCardArray: BankAccount[] = [];
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
    }

    if (data.bankAccountName === 'Spending') {
      this.bankCardSpendingTypeArray.push(data);
    }
    // call the valid array later on
  }

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
