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
    console.log(bankCards);
    if (bankCards.length === 0) {
      this.totalMoneyInSaveingAccounts = 0;
      this.totalMoneyInSpendingAccounts = 0;
      this.totalMoneyInBankAccount = 0;
    }

    // 1. loop over array to see what is saveings card and spending
    this.bankCardSpendingTypeArray = [];
    this.bankCardSaveingTypeArray = [];
    let savedMoney: number = 0;
    let spendingMoney: number = 0;

    // When the last card is deleted the function gets passed "null" so it wont activate the storedMoney and overwrite the totalMoneyInSaveingAccounts
    for (const card of bankCards) {
      if (card.bankAccountName === 'Saveings') {
        this.bankCardSaveingTypeArray.push(card);

        savedMoney += card.bankMoneyStatus;
        console.log(savedMoney);
        this.totalMoneyInSaveingAccounts = savedMoney;
      }

      if (card.bankAccountName === 'Spending') {
        this.bankCardSpendingTypeArray.push(card);

        spendingMoney += card.bankMoneyStatus;
        console.log(spendingMoney);
        this.totalMoneyInSpendingAccounts = spendingMoney;
      }

      if (this.bankCardSaveingTypeArray.length === 0) {
        console.log('zero in saveings');
        this.totalMoneyInSaveingAccounts = 0;
      }

      if (this.bankCardSpendingTypeArray.length === 0) {
        console.log('zero in spending');
        this.totalMoneyInSpendingAccounts = 0;
      }
    }

    this.totalMoneyInBankAccount =
      this.totalMoneyInSaveingAccounts + this.totalMoneyInSpendingAccounts;

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
