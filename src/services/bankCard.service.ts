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

  overwriteBankCardsArray(bankCards: BankAccount[]) {
    // 1. loop over array to see what is saveings card and spending
    this.bankCardSpendingTypeArray = [];
    this.bankCardSaveingTypeArray = [];
    let storedMoney: number = 0;

    for (const card of bankCards) {
      if (card.bankAccountName === 'Saveings') {
        this.bankCardSaveingTypeArray.push(card);
        storedMoney += card.bankMoneyStatus;
        console.log(storedMoney);
        this.totalMoneyInSaveingAccounts = storedMoney;

        this.totalMoneyInBankAccount =
          this.totalMoneyInSaveingAccounts + this.totalMoneyInSpendingAccounts;
      }

      if (card.bankAccountName === 'Spending') {
        this.bankCardSpendingTypeArray.push(card);
        storedMoney += card.bankMoneyStatus;
        this.totalMoneyInSpendingAccounts = storedMoney;

        this.totalMoneyInBankAccount =
          this.totalMoneyInSaveingAccounts + this.totalMoneyInSpendingAccounts;
      }
    }

    // overwrite the array
    this.bankCardArray = bankCards;
    return this.bankCardArray;
  }

  // get bankacc cards
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
