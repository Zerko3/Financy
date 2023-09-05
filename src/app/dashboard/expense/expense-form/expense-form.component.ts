import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Expense } from 'src/interfaces/expense.interface';
import { BankCardService } from 'src/services/bankCard.service';
import { ExpenseService } from 'src/services/expense.service';

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
    private expenseService: ExpenseService,
    private router: Router,
    private bankCardService: BankCardService
  ) {}

  ngOnInit(): void {
    this.accounts = this.bankCardService.getAccountNames();
    this.positionEditorOptions.items = this.bankCardService.getAccountNames();
  }

  onUserCloseForm() {
    this.router.navigate(['expense']);
  }

  // get data from form and pass to serive
  onSubmitForm() {
    let data = this.expenseData;
    this.expenseService.storeExpenseData(data);
    console.log(data);

    if (this.form.status === 'VALID') {
      this.isVisibleToast = true;
      this.message = `The expense: ${data.expenseType} with ${data.money} dolars was added.`;
    }
  }
}
