import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BankAccount } from 'src/interfaces/bankAccount.interface';
import { OverviewExpense } from 'src/interfaces/overviewExpenses.interface';
import {
  Expense,
  Saveings,
  Investing,
} from 'src/interfaces/userMoneySpending.interface';
import { DataStorage } from 'src/services/data-storage.service';
import { LoginService } from 'src/services/login.service';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('navigation') addCards: ElementRef;
  @ViewChild('hideBalance') hideBalance: ElementRef;

  bankCardsArray: BankAccount[] = [];
  expenseData: Expense[] = [];
  savingsData: Saveings[] = [];
  investingData: Investing[] = [];
  subscriptionArray: Expense[] = [];

  negativeMoney: number = 0;
  positiveMoney: number = 0;

  clickOnNavigation: boolean = false;
  clickedOnDeleteButton: boolean = false;
  hideBalanceStatus: boolean = false;
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
    private loginService: LoginService,
    private router: Router
  ) {}

  // TODO:
  // 1. Refactor this code in ngoninit since everytime its called all the arrays are activated with the correct methods -> try to trim this calls for better performance

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
          this.negativeMoney = this.state.getTotalMoneyInSpendingAccount();
          this.positiveMoney = this.state.getTotalMoneyInBankAccount();
          this.overviewExpenses[0].val = this.positiveMoney;
          this.overviewExpenses[1].val += this.negativeMoney;
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

    this.positiveMoney = this.state.getTotalMoneyInBankAccount();
    this.negativeMoney = this.state.getTotalMoneyInSpendingAccount();

    // 0 is positive
    this.overviewExpenses[0].val = this.positiveMoney;

    // 1 is negative
    this.overviewExpenses[1].val += this.negativeMoney;
  }

  ngOnDestroy(): void {
    console.log('UNSUBSCRIBE - DASHBOARD');
    this.bankCardSubscribe.unsubscribe();
    this.firebaseSubscribe.unsubscribe();
  }

  onUserNavigate(e): void {
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

  onClickForDelete(e: any): void {
    this.clickedOnDeleteButton = !this.clickedOnDeleteButton;

    this.correctCard = e;
  }

  onCardClick(e): BankAccount[] {
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

  hideMoneyBalanceOnCard(e: any): void {
    console.log(e.target.textContent);

    if (e.target.textContent === 'Hide balance') {
      // 1. set boolean value to true or false
      this.hideBalanceStatus = !this.hideBalanceStatus;
    }
  }
}
