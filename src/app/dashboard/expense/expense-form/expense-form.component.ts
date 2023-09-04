import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/interfaces/expense.interface';
import { ExpenseService } from 'src/services/expense.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent {
  // TODO:
  // 1. Add dynamic accounts
  accounts = ['Account 1', 'Account 2'];
  status = ['paid', 'pending'];
  expense = ['Subscription', 'Bills', 'Restaurants', 'Random', 'Clothes'];

  expenseData: Expense = {
    expenseType: '',
    date: new Date(),
    money: 0,
    companyName: '',
    billStatus: '',
    account: '',
  };

  submitButtonOptions = {
    text: 'Submit',
    type: 'normal',
    useSubmitBehavior: true,
  };

  positionEditorOptions = {
    items: this.accounts,
    searchEnabled: true,
    value: '',
  };

  positionEditorOptionsStatus = {
    items: this.status,
    searchEnabled: true,
    value: '',
  };

  positionEditorOptionsExpense = {
    items: this.expense,
    searchEnabled: true,
    value: '',
  };

  e: any;

  constructor(private expenseService: ExpenseService, private router: Router) {}

  onUserCloseForm() {
    this.router.navigate(['expense']);
  }

  // get data from form and pass to serive
  onSubmitForm(e: any) {
    e.preventDefault();
    let data = this.expenseData;
    this.expenseService.storeExpenseData(data);
  }
}
