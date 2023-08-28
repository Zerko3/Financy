import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BankAccount } from 'src/interfaces/bankAccount.interface';

@Injectable({ providedIn: 'root' })
export class BankCardService {
  bankCardArray: BankAccount[] = [];
  bankCardSubscribe = new Subject<BankAccount>();
  constructor() {}
  // store bankacc
  storeBankCard(data: BankAccount) {
    this.bankCardArray.push(data);

    this.bankCardSubscribe.next(data);
  }

  // get bankacc
  getBankCard() {
    return this.bankCardArray.slice();
  }
}
