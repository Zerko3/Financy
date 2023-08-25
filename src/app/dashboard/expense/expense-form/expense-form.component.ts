import { Component } from '@angular/core';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent {
  companys = ['Test1', 'Test2'];
  accounts = ['Account 1', 'Account 2'];
  status = ['paid', 'pending'];
  expense = ['Subscription', 'Bills', 'Restaurants', 'Random', 'Clothes'];
  formData: {
    expanse: string;
    date: Date;
    company: string;
    status: string;
    account: string[];
    money: number;
  } = {
    expanse: '',
    date: new Date(),
    company: '',
    account: this.accounts,
    status: '',
    money: 0,
  };

  submitButtonOptions = {
    text: 'Submit',
    type: 'default',
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
}
