import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Expense } from 'src/interfaces/expense.interface';
import { BankCardService } from 'src/services/bankCard.service';
import { ExpenseService } from 'src/services/expense.service';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  accounts: string[] = [];
  status = ['paid', 'pending'];
  expense = ['Subscription', 'Bills', 'Restaurants', 'Random', 'Clothes'];
  expenseData: Expense = {
    expenseType: '',
    date: new Date(),
    money: 0,
    companyName: '',
    billStatus: '',
    account: '',
    ID: '',
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
  isVisibleToast: boolean = false;
  type: string = 'success';
  message: string = '';

  constructor(
    private state: State,
    private expenseService: ExpenseService,
    private router: Router,
    private bankCardService: BankCardService
  ) {}

  ngOnInit(): void {
    // this.accounts = this.bankCardService.getAccountNames();
    // this.positionEditorOptions.items = this.bankCardService.getAccountNames();

    this.accounts = this.state.getAccountNames();
    this.positionEditorOptions.items = this.accounts;
  }

  onUserCloseForm() {
    this.router.navigate(['expense']);
  }

  // get data from form and pass to serive
  onSubmitForm() {
    this.expenseData.ID = this.expenseData.account;
    let data = this.expenseData;
    console.log(data);
    this.expenseService.storeExpenseData(data);

    // pass data to state
    this.state.storeExpenseDataInState(data);

    if (this.form.status === 'VALID') {
      this.isVisibleToast = true;
      this.message = `The expense: ${data.expenseType} with ${data.money} dolars was added.`;
    }
  }
}
