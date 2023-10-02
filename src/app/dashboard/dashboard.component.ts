import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { BankAccount } from 'src/interfaces/bankAccount.interface';
import { OverviewExpense } from 'src/interfaces/overviewExpenses.interface';
import {
  Expense,
  Saveings,
  Investing,
} from 'src/interfaces/userMoneySpending.interface';
import { DataStorage } from 'src/services/data-storage.service';
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
  errorSubscribe: Subscription;
  cardDeleteSubscribe: Subscription;
  cardUpdate: Subscription;

  calledFirebase: boolean = false;
  toastSignal: boolean = false;
  cardDeleted: boolean = false;

  isVisibleToast: boolean = false;
  type: string = '';
  message: string = '';

  constructor(
    private state: State,
    private dataStorage: DataStorage,
    private router: Router
  ) {}

  // TODO:
  // 1. Refactor this code in ngoninit since everytime its called all the arrays are activated with the correct methods -> try to trim this calls for better performance

  ngOnInit(): void {
    this.cardUpdate = this.dataStorage.updatedArray.subscribe((data) => {
      this.expenseData = this.state.getExpenseData();
      this.subscriptionArray = this.state.getSubscriptionData();
      this.savingsData = this.state.getSaveingsData();
      this.investingData = this.state.getInvestingData();

      // TODO:
      this.negativeMoney = this.state.getTotalMoneyInSpendingAccount();
      this.positiveMoney = this.state.getTotalMoneyInBankAccount();
      this.overviewExpenses[0].val += this.positiveMoney;
      this.overviewExpenses[1].val += this.negativeMoney;
      console.log((this.overviewExpenses[0].val += this.positiveMoney));
      console.log((this.overviewExpenses[1].val += this.negativeMoney));
    });

    // only call the backend Firebase if bankCardsArray.length is 0.
    if (this.bankCardsArray.length === 0) {
      this.dataStorage.getValidUserDataFromFirebase();
    }

    // error handling subject
    this.errorSubscribe = this.dataStorage.errorSubject
      .pipe(take(1))
      .subscribe((data) => {
        this.isVisibleToast = true;
        this.type = 'error';
        this.message = `Error: ${data.status}. Unable to retrive user data.`;
      });

    // card delete subject
    this.cardDeleteSubscribe = this.dataStorage.cardDeletedSubject.subscribe(
      (response: boolean) => {
        console.log(response);
        this.cardDeleted = response;
        this.isVisibleToast = true;
        this.type = 'success';
        this.message = 'Card was deleted.';
      }
    );

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
          this.overviewExpenses[0].val += this.positiveMoney;
          this.overviewExpenses[1].val += this.negativeMoney;
          console.log((this.overviewExpenses[0].val += this.positiveMoney));
          console.log((this.overviewExpenses[1].val += this.negativeMoney));
        } else return;
      }
    );

    // get cards as soon as user creates the cards -> pass to array to display on DOM
    this.bankCardSubscribe = this.state.bankCardSubscribe.subscribe((data) => {
      console.log('DATA IS IN DASHBOARD');
      // pass data to state
      this.state.passBankCardToState(data);

      // as soon as the data is passed into state call the return function on the array
      this.bankCardsArray = this.state.getBankCard();
    });
  }

  ngOnDestroy(): void {
    this.bankCardSubscribe.unsubscribe();
    this.firebaseSubscribe.unsubscribe();
    this.errorSubscribe.unsubscribe();
    this.cardDeleteSubscribe.unsubscribe();
    this.cardUpdate.unsubscribe();
  }

  onUserNavigate(e): void {
    if (e.target.textContent === 'Add cards') {
      this.router.navigate(['dashboard/createCard']);
    }

    if (e.target.textContent === 'Add subscription') {
      this.router.navigate(['dashboard/expense/expenseForm']);
    }

    if (e.target.textContent === 'Add transaction') {
      this.router.navigate(['dashboard/expense/expenseForm']);
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
