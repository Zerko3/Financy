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

    // loop over the expenses array and for each expense (object) call renderExpenseOnDOM()
    for (const expense of this.expenses) {
      this.renderExpenseOnDOM(expense);
    }

    // subscribe to form so when the user inputs and submits data the valid data gets renderd on DOM.
    this.expenseServiceSubscribable = this.state.dataSubject.subscribe(
      (data: Expense) => {
        this.expenses.push(data);

        this.renderExpenseOnDOM(data);
      }
    );
  }

  ngOnDestroy(): void {
    this.expenseServiceSubscribable.unsubscribe();
  }

  // render valid numbers on DOM
  renderExpenseOnDOM(data: Expense) {
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

    // pass the total amount into the service to update the DOM
    this.state.setTotalExpenseNumber(this.totalMoneyExpense);
  }

  // allows user to navigate via navigate
  userFormNavigation() {
    this.router.navigate(['/expense/expenseForm']);
  }

  cellStyle(e) {
    if (e.rowType === 'data') {
      if (e.column.dataField === 'billStatus' && e.data.billStatus === 'paid') {
        e.cellElement.style.cssText = 'color: green';
      }
    }
  }
}
