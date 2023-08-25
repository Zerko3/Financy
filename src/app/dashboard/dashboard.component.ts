import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/interfaces/expense.interface';
import { ExpenseService } from 'src/services/expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  expenseData: Expense[] = [];
  subscriptionArray: Expense[] = [];
  userMoney = [
    {
      region: 'Asia',
      val: 4119626293,
    },
    {
      region: 'Africa',
      val: 1012956064,
    },
    {
      region: 'Northern America',
      val: 344124520,
    },
    {
      region: 'Latin America and the Caribbean',
      val: 590946440,
    },
    {
      region: 'Europe',
      val: 727082222,
    },
    {
      region: 'Oceania',
      val: 35104756,
    },
  ];
  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseData = this.expenseService.getExpenseData();
    this.subscriptionArray = this.expenseService.getSubscriptionData();
  }
}
