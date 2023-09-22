import { Injectable } from '@angular/core';
import { BankAccount } from 'src/interfaces/bankAccount.interface';

import { Subject } from 'rxjs';
import { DataStorage } from './data-storage.service';
import {
  Expense,
  Saveings,
  Investing,
  UserMoneySpending,
} from 'src/interfaces/userMoneySpending.interface';

@Injectable({ providedIn: 'root' })
export class State {
  // arrays
  bankCardsArray: BankAccount[] = [];
  expenseData: UserMoneySpending[] = [];
  savingsData: Saveings[] = [];
  investingData: Investing[] = [];
  subscriptionArray: Expense[] = [];
  expenseDataForTable: Expense[] = [];
  cardNames: string[] = [];
  bankCardSaveingTypeArray: BankAccount[] = [];
  bankCardSpendingTypeArray: BankAccount[] = [];

  // money numbers
  totalMoneyInBankAccount: number = 0;
  totalMoneyInSpendingAccounts: number = 0;
  totalMoneyInSaveingAccounts: number = 0;

  // Subjects
  bankCardSubscribe = new Subject<BankAccount>();
  dataSubject = new Subject<Expense>();
  investingSubscribe = new Subject<Investing>();
  saveing = new Subject<Saveings>();
  saveingMoneySubject = new Subject<Saveings>();

  // boolean values
  toastSignal: boolean = false;

  constructor(private dataStorage: DataStorage) {}

  // TODO:
  // 1. refactor interface for investing expense saveing into one and extend it
  // 2. add all of this into expense array and only use that in the recent transaction

  // finish investing logic
  // When all the logic is done, refactor the code. A few methods can be joined together or shortened!
  // check if saveingstypearray logic can be shortened (it can be)

  // BUG:
  // 1. When there is no data the first insert of data is displayed 2 times
  // 2. The saveings array has some present bug -> when i add a saveing it get appended 2 times: 1 time from expense and 1 time from saveing (we get saveings from expense) -> so it append to expense first then add savrings to saveings and appends again

  getBankCardsArrayDataFromFirebase(data: BankAccount[]) {
    for (const card of data) {
      // get card names
      this.cardNames.push(card.bankAccountCustomName);

      // get expenses
      if (card.expenseOnCard.length > 0) {
        for (const expese of card.expenseOnCard) {
          this.expenseData.push(expese);
          console.log(this.expenseData);

          if (expese.expenseType === 'Subscription') {
            this.subscriptionArray.push(expese);
          }
          if (expese.expenseType === 'Investing') {
            this.investingData.push(expese);
          }
        }
      }

      // Store valid card based on the type into its array
      if (card.bankAccountName === 'Saveings') {
        this.bankCardSaveingTypeArray.push(card);

        // calc for saveings account
        this.totalMoneyInSaveingAccounts += card.bankMoneyStatus;

        // loop over the arrays inside saveings cards
        for (const expense of card.expenseOnCard) {
          this.savingsData.push(expense);
        }
      }

      if (card.bankAccountName === 'Spending') {
        this.bankCardSpendingTypeArray.push(card);

        // calc for spending account number
        this.totalMoneyInSpendingAccounts += card.bankMoneyStatus;

        for (const expense of card.expenseOnCard) {
          // push only expenses in expense card into this array to display it on expese component

          if (expense.expenseType !== 'Investing') {
            this.expenseDataForTable.push(expense);
          }
        }
      }
    }

    // calc for total balance
    this.totalMoneyInBankAccount =
      this.totalMoneyInSaveingAccounts + this.totalMoneyInSpendingAccounts;

    // overwrite data in array
    this.bankCardsArray = data;
    return this.bankCardsArray;
  }

  checkMoneyStatus(userInput: Expense | Saveings) {
    let newMoney = 0;
    for (const card of this.bankCardsArray) {
      if (card.bankAccountName === 'Spending') {
        if (card.bankMoneyStatus <= 0) {
          this.toastSignal = true;
        } else {
          this.toastSignal = false;
        }

        // calculate before doeing GUI stuff -> logic for less or 0
        if (card.bankAccountCustomName === userInput.ID) {
          newMoney = card.bankMoneyStatus - userInput.money;

          if (newMoney < 0) {
            this.toastSignal = true;
          } else if (newMoney === 0) {
            this.toastSignal = false;
          } else {
            this.toastSignal = false;
          }

          break;
        }
      }

      if (card.bankAccountName === 'Saveings') {
        if (card.bankMoneyStatus < 0) {
          this.toastSignal = true;
        } else {
          this.toastSignal = false;
        }

        // calculate before doeing GUI stuff -> logic for less or 0
        if (card.bankAccountCustomName === userInput.ID) {
          newMoney = card.bankMoneyStatus + userInput.money;

          if (newMoney < 0) {
            this.toastSignal = true;
          } else {
            this.toastSignal = false;
          }

          break;
        }
      }
    }

    return this.toastSignal;
  }

  getMoneyChangeAndUpdateFirebase(
    userInput: UserMoneySpending | Expense | Saveings | Investing
  ) {
    // update the expense array
    this.expenseData.push(userInput);

    // update the subscription array
    if (userInput.expenseType === 'Subscription') {
      this.subscriptionArray.push(userInput);
    }

    // update money in the card and show on DOM
    let newMoney = 0;
    for (const card of this.bankCardsArray) {
      if (card.bankAccountName === 'Saveings') {
        if (card.bankAccountCustomName === userInput.ID) {
          newMoney = card.bankMoneyStatus + userInput.money;
          card.bankMoneyStatus = newMoney;

          // calc for saveings account
          this.totalMoneyInSaveingAccounts += userInput.money;
          break;
        }
      }

      if (card.bankAccountName === 'Spending') {
        if (card.bankAccountCustomName === userInput.ID) {
          newMoney = card.bankMoneyStatus - userInput.money;
          card.bankMoneyStatus = newMoney;

          // calc for spending account number
          this.totalMoneyInSpendingAccounts -= userInput.money;
          break;
        }
      }
    }

    // push the expense | inesting | saveings into the valid card
    for (const card of this.bankCardsArray) {
      if (userInput.ID === card.bankAccountCustomName) {
        card.expenseOnCard.push(userInput);
      }
    }

    // calc for total balance
    this.totalMoneyInBankAccount =
      this.totalMoneyInSaveingAccounts + this.totalMoneyInSpendingAccounts;

    // store new money updates in firebase
    this.dataStorage.storeValidUserDataInFirebase(this.bankCardsArray);

    // return the data ->overrite the array
    return this.bankCardsArray;
  }

  // subscribe methods

  storeSubscribeForDataSubject(data: Expense) {
    this.dataSubject.next(data);
  }

  storeSubscribeForInvesting(data: Investing) {
    this.investingSubscribe.next(data);
  }

  storeSubscribeForSaveing(data: Saveings) {
    this.saveing.next(data);
  }

  storeSubscribeForCardCreation(data: BankAccount) {
    this.bankCardSubscribe.next(data);
  }

  // Store Data

  passBankCardToState(data: BankAccount) {
    this.cardNames.push(data.bankAccountCustomName);

    this.bankCardsArray.push(data);

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

        this.totalMoneyInSaveingAccounts = savedMoney;
      }

      if (card.bankAccountName === 'Spending') {
        this.bankCardSpendingTypeArray.push(card);

        spendingMoney += card.bankMoneyStatus;

        this.totalMoneyInSpendingAccounts = spendingMoney;
      }

      if (this.bankCardSaveingTypeArray.length === 0) {
        this.totalMoneyInSaveingAccounts = 0;
      }

      if (this.bankCardSpendingTypeArray.length === 0) {
        this.totalMoneyInSpendingAccounts = 0;
      }
    }

    this.totalMoneyInBankAccount =
      this.totalMoneyInSaveingAccounts + this.totalMoneyInSpendingAccounts;

    // overwrite the array
    this.bankCardsArray = bankCards;
    return this.bankCardsArray;
  }

  // Get Data

  // get investing data
  getInvestingData() {
    return this.investingData.slice();
  }

  // get expense data
  getExpenseData() {
    return this.expenseData.slice();
  }

  // get expense data for expense component
  getExpenseDataForExpenseComponent() {
    return this.expenseDataForTable.slice();
  }

  // get subscription data
  getSubscriptionData() {
    return this.subscriptionArray.slice();
  }

  // get bankacc cards
  getBankCard() {
    return this.bankCardsArray.slice();
  }

  getSaveingsCards() {
    return this.bankCardSaveingTypeArray.slice();
  }

  // get saveings data
  getSaveingsData() {
    return this.savingsData.slice();
  }

  getSpendingCards() {
    return this.bankCardSpendingTypeArray.slice();
  }

  getAccountNames() {
    return this.cardNames.slice();
  }
}
