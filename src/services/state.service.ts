import { Injectable } from '@angular/core';
import { BankAccount } from 'src/interfaces/bankAccount.interface';
import { Expense } from 'src/interfaces/expense.interface';
import { Investing } from 'src/interfaces/investing.interface';
import { Saveings } from 'src/interfaces/saveings.interface';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class State {
  // arrays
  bankCardsArray: BankAccount[] = [];
  expenseData: Expense[] = [];
  savingsData: Saveings[] = [];
  investingData: Investing[] = [];
  subscriptionArray: Expense[] = [];
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

  constructor() {}

  checkMoneyStatus(userInput: Expense | Saveings) {
    let newMoney = 0;
    for (const card of this.bankCardsArray) {
      if (card.bankAccountName === 'Spending') {
        if (card.bankMoneyStatus <= 0) {
          console.log('The money in the card is 0 or less');

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
          console.log('The money in the card is less than 0');

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

  // TODO:
  // 1. Check if money is -1 and if so then aither delete or say "cannot spend money on this card".
  // 2. Saveing card can have 0 money to start with
  getMoneyChange(userInput: Expense | Saveings) {
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

    // calc for total balance
    this.totalMoneyInBankAccount =
      this.totalMoneyInSaveingAccounts + this.totalMoneyInSpendingAccounts;

    // return the data

    return this.bankCardsArray;
  }

  // subscribe methods

  // testing for now
  storeSubscribeForDataSubject(data: Expense) {
    this.dataSubject.next(data);
  }

  // testing for now
  storeSubscribeForInvesting(data: Investing) {
    this.investingSubscribe.next(data);
  }

  // testing for now
  storeSubscribeForSaveing(data: Saveings) {
    this.saveing.next(data);
  }

  // Store Data

  storeBankCard(data: BankAccount) {
    this.bankCardSubscribe.next(data);

    this.bankCardsArray.push(data);
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

    // test return
    return this.bankCardsArray;
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

  storeExpenseDataInState(data: Expense) {
    //  push to the subscription array for DOM display
    if (data.expenseType === 'Subscription') {
      this.subscriptionArray.push(data);
    }

    this.expenseData.push(data);
  }

  storeInvestingDataInState(data: Investing) {
    this.investingData.push(data);
  }

  storeSaveingsDataInState(data: Saveings) {
    this.savingsData.push(data);
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
