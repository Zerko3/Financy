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
  totalNegativeMoney: number = 0;

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
  // 1. Responsive design is not 100% complete fix it.
  // 2. App is slow (could be faster). Somehow fix this.
  // 3. Add spinners
  // 4. router links do not work like they should in the live version. on refresh i get netlify error page not found.
  // 5. imgs load slow, so add a lower resolution
  // 6. username not displayed

  // THIS NEEDS REFACTORING TO MANY FORLOOPS
  getBankCardsArrayDataFromFirebase(data: BankAccount[]): BankAccount[] {
    for (const card of data) {
      // get card names
      this.cardNames.push(card.bankAccountCustomName);

      // get expenses
      if (card.expenseOnCard.length > 0) {
        for (const expense of card.expenseOnCard) {
          this.expenseData.push(expense);

          // push only expenses in expense card into this array to display it on expese component
          if (
            expense.expenseType !== 'Investing' ||
            expense.expenseType !== 'Saveing'
          ) {
            this.totalNegativeMoney += expense.money;
            this.expenseDataForTable.push(expense);
          }

          // push to subscription array
          if (expense.expenseType === 'Subscription') {
            this.subscriptionArray.push(expense);
          }

          // push to investing array
          if (expense.expenseType === 'Investing') {
            this.investingData.push(expense);
          }

          // push to saveings array
          if (expense.expenseType === 'Saveing') {
            this.savingsData.push(expense);
          }
        }
      }

      // Store valid card based on the type into its array
      if (card.bankAccountName === 'Saveings') {
        this.bankCardSaveingTypeArray.push(card);

        // calc for saveings account
        this.totalMoneyInSaveingAccounts += card.bankMoneyStatus;
      }

      if (card.bankAccountName === 'Spending') {
        this.bankCardSpendingTypeArray.push(card);

        // calc for spending account number
        this.totalMoneyInSpendingAccounts += card.bankMoneyStatus;
      }
    }

    // calc for total balance
    this.totalMoneyInBankAccount =
      this.totalMoneyInSaveingAccounts + this.totalMoneyInSpendingAccounts;

    // overwrite data in array
    this.bankCardsArray = data;

    return this.bankCardsArray;
  }

  checkMoneyStatus(userInput: Expense | Saveings): boolean {
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

  setTotalExpenseNumber(expenseNumber: number): void {
    this.totalNegativeMoney += expenseNumber;
  }

  // refector this
  getMoneyChangeAndUpdateFirebase(
    userInput: UserMoneySpending | Expense | Saveings | Investing
  ): BankAccount[] {
    // update the expense array -> need this for the dashboard DOM
    this.expenseData.push(userInput);

    // update the subscription array
    if (userInput.expenseType === 'Subscription') {
      this.subscriptionArray.push(userInput);
    }

    // update money in the card and show on DOM
    let newMoney = 0;
    for (const card of this.bankCardsArray) {
      if (userInput.ID === card.bankAccountCustomName) {
        card.expenseOnCard.push(userInput);
      }

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
        // update the expense array for expense component DOM
        if (
          userInput.expenseType !== 'Saveings' &&
          userInput.expenseType !== 'Investing'
        ) {
          this.expenseDataForTable.push(userInput);
        }

        if (card.bankAccountCustomName === userInput.ID) {
          newMoney = card.bankMoneyStatus - userInput.money;
          card.bankMoneyStatus = newMoney;

          // calc for spending account number
          this.totalMoneyInSpendingAccounts -= userInput.money;

          break;
        }
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

  passBankCardToState(data: BankAccount): void {
    // guard clause check
    if (this.bankCardsArray.length < 4) {
      // push the card into the array to display it on the DOM
      this.bankCardsArray.push(data);
      // get the cards names for the forms to allow the user to get the correct card data later
      this.cardNames.push(data.bankAccountCustomName);

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

      // store updates in firebase
      this.dataStorage.storeValidUserDataInFirebase(this.bankCardsArray);
    } else {
      // logic for toast here
      this.toastSignal = true;
    }
  }

  overwriteBankCardsArray(bankCards: BankAccount[]): BankAccount[] {
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

  getTotalMoneyInSaveingAccount(): number {
    return this.totalMoneyInSaveingAccounts;
  }

  getTotalMoneyInSpendingAccount(): number {
    return this.totalNegativeMoney;
  }

  getAccountBalance(): number {
    return this.totalMoneyInSpendingAccounts;
  }

  // get total money in bank account
  getTotalMoneyInBankAccount(): number {
    return this.totalMoneyInBankAccount;
  }

  // get investing data
  getInvestingData(): Investing[] {
    return this.investingData.slice();
  }

  // get expense data
  getExpenseData(): Expense[] {
    return this.expenseData.slice();
  }

  // get expense data for expense component
  getExpenseDataForExpenseComponent(): Expense[] {
    return this.expenseDataForTable.slice();
  }

  // get subscription data
  getSubscriptionData(): Expense[] {
    return this.subscriptionArray.slice();
  }

  // get bankacc cards
  getBankCard(): BankAccount[] {
    return this.bankCardsArray.slice();
  }

  getSaveingsCards(): BankAccount[] {
    return this.bankCardSaveingTypeArray.slice();
  }

  // get saveings data
  getSaveingsData(): Saveings[] {
    return this.savingsData.slice();
  }

  getSpendingCards(): BankAccount[] {
    return this.bankCardSpendingTypeArray.slice();
  }

  getAccountNames(): string[] {
    return this.cardNames.slice();
  }

  getToastSignal(): boolean {
    return this.toastSignal;
  }
}
