import { Injectable } from '@angular/core';
import { Subject, share } from 'rxjs';

import { Expense } from 'src/interfaces/expense.interface';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  // expanseFromArray: Expense[] = [];
  // expenseSubscrptionArray: Expense[] = [];
  subscriptionMoney: number = 0;
  billMoney: number = 0;
  restaurantMoney: number = 0;
  randomMoney: number = 0;
  clothesMoney: number = 0;
  totalExpense: number = 0;
  // dataSubject = new Subject<Expense>();

  constructor() {}

  // store data
  storeExpenseData(data: Expense) {
    console.log('fire');
    // this.dataSubject.next(data); //this gets fired onec so its correct here ->the bug is in dashboard potentialy
    this.totalExpense += data.money;

    if (data.expenseType === 'Subscription') {
      this.subscriptionMoney += data.money;
      // push to the subscription array for DOM display
      // this.expenseSubscrptionArray.push(data);
    } else if (data.expenseType === 'Bills') {
      this.billMoney += data.money;
    } else if (data.expenseType === 'Restaurants') {
      this.restaurantMoney += data.money;
    } else if (data.expenseType === 'Random') {
      this.randomMoney += data.money;
    } else if (data.expenseType === 'Clothes') {
      this.clothesMoney += data.money;
    }
    // this.expanseFromArray.push(data);
  }

  // get subscription data
  // getSubscriptionData() {
  //   return this.expenseSubscrptionArray.slice();
  // }

  // // get data and display it in overview
  // getExpenseData() {
  //   return this.expanseFromArray.slice();
  // }
}
