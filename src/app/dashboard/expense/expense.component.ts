import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Expense } from 'src/interfaces/expense.interface';
import { ExpenseService } from 'src/services/expense.service';

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

  constructor(private router: Router, private expenseService: ExpenseService) {}

  ngOnInit(): void {
    // this gets called only when i come back to the component
    this.expenses = this.expenseService.getExpenseData();

    // add the same for money as i did for table
    this.billMoney = this.expenseService.billMoney;
    this.restaurantMoney = this.expenseService.restaurantMoney;
    this.randomMoney = this.expenseService.randomMoney;
    this.clothesMoney = this.expenseService.clothesMoney;
    this.subscriptionMoney = this.expenseService.subscriptionMoney;

    // this gets called all the time since its an observable
    this.expenseServiceSubscribable = this.expenseService.dataSubject.subscribe(
      (data) => {
        console.log(data);
        this.expenses.push(data);
        console.log(this.expenses);

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
    );
  }

  ngOnDestroy(): void {
    console.log('UNSUBSCRIBED');
    this.expenseServiceSubscribable.unsubscribe();
  }

  // TODO:
  // 1. Connect form to component
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
