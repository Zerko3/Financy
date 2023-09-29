import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Expense } from 'src/interfaces/userMoneySpending.interface';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit, OnDestroy {
  allowedPageSizes = [10, 'all'];
  displayMode = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  expenseServiceSubscribable: Subscription;
  expenses: Expense[] = [];
  columns = ['Date', 'Money', 'Expanses', 'Name', 'Status', 'Account'];
  subscriptionMoney: number = 0;
  billMoney: number = 0;
  restaurantMoney: number = 0;
  randomMoney: number = 0;
  clothesMoney: number = 0;
  totalMoneyExpense: number = 0;

  constructor(private state: State, private router: Router) {}

  ngOnInit(): void {
    // this gets called only when i come back to the component
    this.expenses = this.state.getExpenseDataForExpenseComponent();

    for (const expense of this.expenses) {
      if (expense.expenseType === 'Subscription') {
        this.subscriptionMoney += expense.money;
      } else if (expense.expenseType === 'Bills') {
        this.billMoney += expense.money;
      } else if (expense.expenseType === 'Restaurants') {
        this.restaurantMoney += expense.money;
      } else if (expense.expenseType === 'Random') {
        this.randomMoney += expense.money;
      } else if (expense.expenseType === 'Clothes') {
        this.clothesMoney += expense.money;
      }

      this.totalMoneyExpense =
        this.subscriptionMoney +
        this.billMoney +
        this.restaurantMoney +
        this.randomMoney +
        this.clothesMoney;
    }

    this.expenseServiceSubscribable = this.state.dataSubject.subscribe(
      (data) => {
        this.expenses.push(data);

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

        this.totalMoneyExpense =
          this.subscriptionMoney +
          this.billMoney +
          this.restaurantMoney +
          this.randomMoney +
          this.clothesMoney;
      }
    );
  }

  ngOnDestroy(): void {
    this.expenseServiceSubscribable.unsubscribe();
  }

  userFormNavigation() {
    this.router.navigate(['expense/expenseForm']);
  }

  // TODO:
  // 1. Get valid row
  // 2. Get valid data and pass on the color
  // 3. Add multiple color options for paid unpaid subscription food ,....
  cellStyle(e) {
    if (e.rowType === 'data' && e.column.dataField === 'billStatus') {
      e.cellElement.classList.add('test');
    }
  }
}
