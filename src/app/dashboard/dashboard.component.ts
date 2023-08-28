import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/interfaces/expense.interface';
import { Investing } from 'src/interfaces/investing.interface';
import { OverviewExpense } from 'src/interfaces/overviewExpenses.interface';
import { Saveings } from 'src/interfaces/saveings.interface';
import { ExpenseService } from 'src/services/expense.service';
import { InvestingService } from 'src/services/investing.service';
import { SaveingsService } from 'src/services/saveings.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  expenseData: Expense[] = [];
  savingsData: Saveings[] = [];
  investingData: Investing[] = [];
  subscriptionArray: Expense[] = [];
  investedMoney: number = 0;
  savedMoney: number = 0;
  positiveMoney: number = 0;

  overviewExpenses: [OverviewExpense, OverviewExpense] = [
    { typeOfExpense: 'positive', val: 0 },
    { typeOfExpense: 'negative', val: 0 },
  ];

  constructor(
    private expenseService: ExpenseService,
    private saveingService: SaveingsService,
    private investingService: InvestingService
  ) {}

  ngOnInit(): void {
    this.expenseData = this.expenseService.getExpenseData();
    this.subscriptionArray = this.expenseService.getSubscriptionData();

    this.savingsData = this.saveingService.getSaveingsData();
    this.investingData = this.investingService.getInvestingData();

    // overwrite the val in obj
    this.investedMoney += this.investingService.totalInvestment;
    this.savedMoney += this.saveingService.totalMoneySaved;
    this.positiveMoney = this.investedMoney + this.savedMoney;

    // 0 is positive
    this.overviewExpenses[0].val = this.positiveMoney;
    console.log(this.overviewExpenses[0].val);

    // 1 is negative
    this.overviewExpenses[1].val += this.expenseService.totalExpense;
    console.log(this.overviewExpenses[1].val);
  }
}
