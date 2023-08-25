import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Expense } from 'src/interfaces/expanse.interface';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  expanseFromArray: Expense[] = [];
  dataSubject = new Subject<Expense>();
  constructor() {}

  // store data
  storeExpenseData(data: Expense) {
    this.expanseFromArray.push(data);
    console.log(this.expanseFromArray);

    //when data is captured give it to the form
    this.dataSubject.next(data);
  }

  // get data and display it in overview
  getExpenseData() {
    return this.expanseFromArray.slice();
  }
}
