import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Expense } from 'src/interfaces/expanse.interface';
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
  // TODO:
  // 1. model or interface?
  // 2. service to store the data for now
  // 3. later on call the data from firebase
  // 4. Service will get and post this valid data
  // 5. give or recive data from service

  expenseServiceSubscribable: Subscription;
  expenses: Expense[] = [];
  columns = ['Date', 'Money', 'Expanses', 'Name', 'Status', 'Account'];
  formClickStatus: boolean = false;
  constructor(private router: Router, private expenseService: ExpenseService) {}

  ngOnInit(): void {
    // this gets called only when i come back to the component
    this.expenses = this.expenseService.getExpenseData();

    // this gets called all the time since its an observable
    this.expenseServiceSubscribable = this.expenseService.dataSubject.subscribe(
      (data) => {
        console.log(data);
        this.expenses.push(data);
        console.log(this.expenses);
        console.log('yo');
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
    this.formClickStatus = !this.formClickStatus;
    if (this.formClickStatus) {
      this.router.navigate(['expense/expenseForm']);
    } else {
      this.router.navigate(['expense']);
    }
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
