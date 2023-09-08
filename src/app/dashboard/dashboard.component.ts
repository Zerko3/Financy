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
import { Expense } from 'src/interfaces/expense.interface';
import { Investing } from 'src/interfaces/investing.interface';
import { OverviewExpense } from 'src/interfaces/overviewExpenses.interface';
import { Saveings } from 'src/interfaces/saveings.interface';
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

  overviewExpenses: [OverviewExpense, OverviewExpense] = [
    { typeOfExpense: 'positive', val: 0 },
    { typeOfExpense: 'negative', val: 0 },
  ];

  private destroy: Subscription;
  bankCardSubscribe: Subscription;
  expenseSubscription: Subscription;
  saveingSubscription: Subscription;

  constructor(
    private state: State,
    private expenseService: ExpenseService,
    private saveingService: SaveingsService,
    private investingService: InvestingService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('The init started - DASHBOARD');

    this.username = this.loginService.getUsername();

    // get cards for DOM
    this.bankCardsArray = this.state.getBankCard();
    // get expense data for DOM
    this.expenseData = this.state.getExpenseData();

    // get subscription data for DOM
    this.subscriptionArray = this.state.getSubscriptionData();

    // get saveings data for DOM
    this.savingsData = this.state.getSaveingsData();

    // get investing data for DOM
    this.investingData = this.state.getInvestingData();

    // overwrite the val in obj -> used to display the graph on DOM
    this.investedMoney += this.investingService.totalInvestment;
    this.savedMoney += this.saveingService.totalMoneySaved;
    this.positiveMoney = this.investedMoney + this.savedMoney;

    // 0 is positive
    this.overviewExpenses[0].val = this.positiveMoney;

    // 1 is negative
    this.overviewExpenses[1].val += this.expenseService.totalExpense;

    // get cards as soon as user creates the cards -> pass to array to display on DOM
    this.bankCardSubscribe = this.state.bankCardSubscribe.subscribe((data) => {
      this.bankCardsArray.push(data);

      return this.bankCardsArray;
    });
  }

  ngOnDestroy(): void {
    console.log('UNSUBSCRIBE - DASHBOARD');
    this.bankCardSubscribe.unsubscribe();
  }

  onUserNavigate(e) {
    console.log(e.target.textContent);
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
    console.log(e);
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

        break;
      }
    }

    this.state.overwriteBankCardsArray(this.bankCardsArray);
    return this.bankCardsArray;
  }
}
