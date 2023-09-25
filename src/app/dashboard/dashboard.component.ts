import { DecimalPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import DataSource from 'devextreme/data/data_source';
import { Subscription } from 'rxjs';
import { BankAccount } from 'src/interfaces/bankAccount.interface';

import { OverviewExpense } from 'src/interfaces/overviewExpenses.interface';
import {
  Expense,
  Saveings,
  Investing,
} from 'src/interfaces/userMoneySpending.interface';

import { DataStorage } from 'src/services/data-storage.service';
import { ExpenseService } from 'src/services/expense.service';
import { InvestingService } from 'src/services/investing.service';
import { LoginService } from 'src/services/login.service';
import { SaveingsService } from 'src/services/saveings.service';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('navigation') addCards: ElementRef;
  bankCardsArray: BankAccount[] = [];
  expenseData: Expense[] = [];
  savingsData: Saveings[] = [];
  investingData: Investing[] = [];
  subscriptionArray: Expense[] = [];

  investedMoney: number = 0;
  savedMoney: number = 0;
  positiveMoney: number = 0;

  clickOnNavigation: boolean = false;
  clickedOnDeleteButton: boolean = false;
  correctCard: string = '';
  username: string;

  // this is for pie
  overviewExpenses: [OverviewExpense, OverviewExpense] = [
    { typeOfExpense: 'positive', val: 0 },
    { typeOfExpense: 'negative', val: 0 },
  ];

  bankCardSubscribe: Subscription;
  firebaseSubscribe: Subscription;

  calledFirebase: boolean = false;

  constructor(
    private state: State,
    private dataStorage: DataStorage,
    private investingService: InvestingService,
    private saveingService: SaveingsService,
    private expenseService: ExpenseService,
    private loginService: LoginService,
    private router: Router
  ) {}

  // TODO:
  // 1. Refactor this code in ngoninit since everytime its called all the arrays are activated with the correct methods -> try to trim this calls for better performance

  // 2. Add "hide balance" to hide with ****
  // 3. Add object for chart -> needs positive money and negative money (should i add this to a srevice to trim down the code?)

  ngOnInit(): void {
    // only call the backend Firebase if bankCardsArray.length is 0.
    if (this.bankCardsArray.length === 0) {
      this.dataStorage.getValidUserDataFromFirebase();
    }

    this.firebaseSubscribe = this.dataStorage.cardsArraySubject.subscribe(
      (data) => {
        // set call to true
        this.calledFirebase = true;

        // give data to the array
        this.bankCardsArray = data;

        // pass the data into the state to manipultate other arrays with it
        if (this.bankCardsArray.length > 0) {
          this.state.getBankCardsArrayDataFromFirebase(data);
          this.expenseData = this.state.getExpenseData();
          this.subscriptionArray = this.state.getSubscriptionData();
          this.savingsData = this.state.getSaveingsData();
          this.investingData = this.state.getInvestingData();

          // get total account balance form firebase
          this.positiveMoney = this.state.totalMoneyInBankAccount;
          console.log(this.positiveMoney);
        } else return;
      }
    );

    // get cards as soon as user creates the cards -> pass to array to display on DOM
    this.bankCardSubscribe = this.state.bankCardSubscribe.subscribe((data) => {
      // pass data to state
      this.state.passBankCardToState(data);

      // as soon as the data is passed into state call the return function on the array
      this.bankCardsArray = this.state.getBankCard();
    });

    // get cards for DOM -> this is needed to display cards back when we come back to the view
    this.bankCardsArray = this.state.getBankCard();

    this.username = this.loginService.getUsername();

    // get expense data for DOM
    this.expenseData = this.state.getExpenseData();

    // get subscription data for DOM
    this.subscriptionArray = this.state.getSubscriptionData();

    // get investing data for DOM
    this.investingData = this.state.getInvestingData();

    // FIXME:
    // BUG -> when dipslaying money it now doesnt show at onec but later and gets appended 2x.
    // TODO:
    // 1. Use saveings component logic for money in here
    this.positiveMoney = this.state.getTotalMoneyInBankAccount();

    // 0 is positive
    this.overviewExpenses[0].val = this.positiveMoney;

    // 1 is negative
    this.overviewExpenses[1].val += this.expenseService.totalExpenseNumber;
  }

  ngOnDestroy(): void {
    console.log('UNSUBSCRIBE - DASHBOARD');
    this.bankCardSubscribe.unsubscribe();
    this.firebaseSubscribe.unsubscribe();
  }

  onUserNavigate(e) {
    if (e.target.textContent === 'Add cards') {
      this.router.navigate(['dashboard/createCard']);
    }

    if (e.target.textContent === 'Add subscription') {
      this.router.navigate(['expense/expenseForm']);
    }

    if (e.target.textContent === 'Add transaction') {
      this.router.navigate(['expense/expenseForm']);
    }
  }

  onClickForDelete(e: any) {
    this.clickedOnDeleteButton = !this.clickedOnDeleteButton;

    this.correctCard = e;
  }

  onCardClick(e) {
    // 1. Get the correct card
    const testData = e.target.offsetParent;
    // 2. Remove card from array
    for (const card of this.bankCardsArray) {
      if (testData.getAttribute('data-card-id') === card.ID) {
        let index = this.bankCardsArray.indexOf(card);
        this.bankCardsArray.splice(index, 1);

        // delete card from firebase
        this.dataStorage.deleteCardFromFirebase(index);
        break;
      }
    }

    this.state.overwriteBankCardsArray(this.bankCardsArray);
    return this.bankCardsArray;
  }

  // TODO:
  // 1. Get button
  // 2. If true hide ballance else show
  // 3. Hide with ***

  hideMoneyBalanceOnCard() {}
}
