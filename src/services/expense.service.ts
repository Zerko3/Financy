import { Injectable } from '@angular/core';
import { Subject, share } from 'rxjs';

import { Expense } from 'src/interfaces/expense.interface';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  subscriptionMoney: number = 0;
  billMoney: number = 0;
  restaurantMoney: number = 0;
  randomMoney: number = 0;
  clothesMoney: number = 0;
  totalExpense: number = 0;

  constructor() {}

  // store data
  storeExpenseData(data: Expense) {
    console.log('fire');

    this.totalExpense += data.money;

    if (data.expenseType === 'Subscription') {
      this.subscriptionMoney += data.money;
    } else if (data.expenseType === 'Bills') {
      this.billMoney += data.money;
    } else if (data.expenseType === 'Restaurants') {
      this.restaurantMoney += data.money;
    } else if (data.expenseType === 'Random') {
      this.randomMoney += data.money;
    } else if (data.expenseType === 'Clothes') {
      this.clothesMoney += data.money;
    }
  }
}
