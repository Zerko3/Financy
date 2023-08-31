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

  // TODO:
  // 1. Create card
  // 2. Based on card change money later on
  // 3. If spending deductc money from card if i spend money
  // 4. If saveings add money to card if i add money to saveings

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
}
