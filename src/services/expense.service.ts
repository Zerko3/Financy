import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Expense } from 'src/interfaces/expanse.interface';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  expanseFromArray: Expense[] = [];
  expenseSubscrptionArray: Expense[] = [];
  subscriptionMoney: number = 0;
  billMoney: number = 0;
  restaurantMoney: number = 0;
  randomMoney: number = 0;
  clothesMoney: number = 0;
  dataSubject = new Subject<Expense>();
  constructor() {}

  // store data
  storeExpenseData(data: Expense) {
    if (data.expenseType === 'Subscription') {
      this.subscriptionMoney += data.money;
      // push to the subscription array for DOM display
      this.expenseSubscrptionArray.push(data);
    } else if (data.expenseType === 'Bills') {
      this.billMoney += data.money;
    } else if (data.expenseType === 'Restaurants') {
      this.restaurantMoney += data.money;
    } else if (data.expenseType === 'Random') {
      this.randomMoney += data.money;
    } else if (data.expenseType === 'Clothes') {
      this.clothesMoney += data.money;
    }
    this.expanseFromArray.push(data);
    console.log(this.expanseFromArray);

    //when data is captured give it to the form
    this.dataSubject.next(data);
  }

  // get subscription data
  getSubscriptionData() {
    return this.expenseSubscrptionArray.slice();
  }

  // get data and display it in overview
  getExpenseData() {
    return this.expanseFromArray.slice();
  }
}
