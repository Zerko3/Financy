import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BankAccount } from 'src/interfaces/bankAccount.interface';
import { Expense } from 'src/interfaces/expense.interface';
import { Investing } from 'src/interfaces/investing.interface';
import { OverviewExpense } from 'src/interfaces/overviewExpenses.interface';
import { Saveings } from 'src/interfaces/saveings.interface';
import { BankCardService } from 'src/services/bankCard.service';
import { ExpenseService } from 'src/services/expense.service';
import { InvestingService } from 'src/services/investing.service';
import { SaveingsService } from 'src/services/saveings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  bankCardsArray: BankAccount[] = [];
  expenseData: Expense[] = [];
  savingsData: Saveings[] = [];
  investingData: Investing[] = [];
  subscriptionArray: Expense[] = [];
  investedMoney: number = 0;
  savedMoney: number = 0;
  positiveMoney: number = 0;
  bankCardSubscribe: Subscription;
  clickOnNavigation: boolean = false;
  deductedMoney: number = 0;
  addedSaveings: number = 0;

  overviewExpenses: [OverviewExpense, OverviewExpense] = [
    { typeOfExpense: 'positive', val: 0 },
    { typeOfExpense: 'negative', val: 0 },
  ];

  constructor(
    private expenseService: ExpenseService,
    private saveingService: SaveingsService,
    private investingService: InvestingService,
    private bankCardService: BankCardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bankCardsArray = this.bankCardService.getBankCard();
    this.expenseData = this.expenseService.getExpenseData();
    console.log(this.expenseData);
    console.log(this.expenseData.length);
    this.subscriptionArray = this.expenseService.getSubscriptionData();

    this.savingsData = this.saveingService.getSaveingsData();
    console.log(this.savingsData);
    console.log(this.savingsData.length);
    this.investingData = this.investingService.getInvestingData();
    console.log(this.investingData);

    // get deducted money to change the account number
    this.deductedMoney = this.expenseService.getMoneyDeducted();
    this.addedSaveings = this.saveingService.getMoneySaved();

    // overwrite the val in obj
    this.investedMoney += this.investingService.totalInvestment;
    this.savedMoney += this.saveingService.totalMoneySaved;
    this.positiveMoney = this.investedMoney + this.savedMoney;

    // 0 is positive
    this.overviewExpenses[0].val = this.positiveMoney;

    // 1 is negative
    this.overviewExpenses[1].val += this.expenseService.totalExpense;

    // create card
    this.bankCardSubscribe = this.bankCardService.bankCardSubscribe.subscribe(
      (data) => {
        console.log(data);
        this.bankCardsArray.push(data);
      }
    );
  }

  ngOnDestroy(): void {
    console.log('UNSUBSCRIBE - DASHBOARD');
    this.bankCardSubscribe.unsubscribe();
  }

  onUserNavigate() {
    this.clickOnNavigation = !this.clickOnNavigation;

    if (this.clickOnNavigation) {
      this.router.navigate(['dashboard/createCard']);
    } else {
      this.router.navigate(['dashboard']);
    }
  }

  // TODO:
  // BUG -> The data does return if you leve the component and come back
  // BUG -> Data does not sync upon deletion
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

      // get this new array into the serviceCard array and mutate it so it will display the correct value
    }
    console.log(this.bankCardsArray);
    return this.bankCardsArray;
    // 3. Later -> remove money of this card from account
  }
}
