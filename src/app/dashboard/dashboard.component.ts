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
import { AccountService } from 'src/services/account.service';
import { DataStorage } from 'src/services/data-storage.service';
import { LoginService } from 'src/services/login.service';
import { RegisterService } from 'src/services/register.service';
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
  spinnerActive: boolean = false;
  correctCard: string = '';
  username: string = '';

  // this is for pie
  overviewExpenses: [OverviewExpense, OverviewExpense] = [
    { typeOfExpense: 'positive', val: 0 },
    { typeOfExpense: 'negative', val: 0 },
  ];

  bankCardSubscribe: Subscription;
  firebaseSubscribe: Subscription;
  errorSubscribe: Subscription;
  cardDeleteSubscribe: Subscription;

  toastSignal: boolean = false;
  cardDeleted: boolean = false;

  isVisibleToast: boolean = false;
  type: string = '';
  message: string = '';

  private userID: string;
  private userToken: string;

  constructor(
    private state: State,
    private dataStorage: DataStorage,
    private loginService: LoginService,
    private registerService: RegisterService,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // on load render valid data
    this.bankCardsArray = this.state.getBankCard();

    this.username = this.registerService.getUsername();

    // on load call state methods
    this.callStateMethods();

    // always render the username

    this.username = this.loginService.getUsername();

    // render spinner on DOM
    if (this.bankCardsArray.length < 1) {
      this.spinnerActive = true;

      setTimeout(() => {
        this.spinnerActive = false;
      }, 2000);
    }

    // get userID
    this.userID = this.accountService.getUserId();

    // get user token
    this.userToken = this.accountService.getUserToken();

    // Call Firebase for the first time here after login
    this.dataStorage.getValidUserDataFromFirebase(this.userID, this.userToken);

    // error handling subject for Firbease
    // 1. Takes 1 error call and unsubscribes from it.
    // 2. Render on DOM a toast for better UX.
    this.errorSubscribe = this.dataStorage.errorSubject
      .pipe(take(1))
      .subscribe((data) => {
        this.isVisibleToast = true;
        this.type = 'error';
        this.message = `Error: ${data.status}. Unable to retrive user data.`;
      });

    // card delete subject
    // 1. Subscribe to Firebase for .delete().
    // 2. When it returns a value (null) in state subsribe here
    // 3. Render toast for better UX
    // 4. Unsubscribe
    this.cardDeleteSubscribe = this.dataStorage.cardDeletedSubject.subscribe(
      (response: boolean) => {
        this.cardDeleted = response;
        this.isVisibleToast = true;
        this.type = 'success';
        this.message = 'Card was deleted.';
      }
    );

    // When application first starts call this method.
    // 1. Subscribe to Firbease to load the valid data on DOM when users logsin.
    this.firebaseSubscribe = this.dataStorage.cardsArraySubject.subscribe(
      (data) => {
        // give data to the array
        this.bankCardsArray = data;

        // pass the data into the state to manipultate other arrays with it
        if (this.bankCardsArray.length > 0) {
          this.state.getBankCardsArrayDataFromFirebase(data);

          this.callStateMethods();
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
  }

  // ubsubsribe to all subscriptions
  ngOnDestroy(): void {
    this.bankCardSubscribe.unsubscribe();
    this.firebaseSubscribe.unsubscribe();
    this.errorSubscribe.unsubscribe();
    this.cardDeleteSubscribe.unsubscribe();
  }

  // Allows the user to navigate via the router.
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

  // on click on the "X" DOM element the card will show options for deletion.
  onClickForDelete(e: any): void {
    this.clickedOnDeleteButton = !this.clickedOnDeleteButton;

    this.correctCard = e;
  }

  // If user wants to delete the card get its ID and pass it into the .splice method to delete it from the array and call the Firbase to update the data.
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

  // If user clicks on "hide balance" the money will be hidden and "***" shown.
  hideMoneyBalanceOnCard(e: any): void {
    if (e.target.textContent === 'Hide balance') {
      // 1. set boolean value to true or false
      this.hideBalanceStatus = !this.hideBalanceStatus;
    }
  }

  // call this method inside the subscribe
  callStateMethods() {
    this.expenseData = this.state.getExpenseData();
    this.subscriptionArray = this.state.getSubscriptionData();
    this.savingsData = this.state.getSaveingsData();
    this.investingData = this.state.getInvestingData();

    this.negativeMoney = this.state.getTotalMoneyInSpendingAccount();
    this.positiveMoney = this.state.getTotalMoneyInBankAccount();
    this.overviewExpenses[0].val += this.positiveMoney;
    this.overviewExpenses[1].val += this.negativeMoney;
  }
}
