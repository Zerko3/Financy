import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Expense } from 'src/interfaces/userMoneySpending.interface';

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

  moneyStatusOnCard: boolean = false;

  constructor(private state: State, private router: Router) {}

  ngOnInit(): void {
    // get account names for form
    this.accounts = this.state.getAccountNames();

    // add them into the form
    this.positionEditorOptions.items = this.accounts;
  }

  // allows user to navigate via router
  onUserCloseForm() {
    this.router.navigate(['/expense']);
  }

  // get data from form and pass to serive
  onSubmitForm() {
    this.expenseData.ID = this.expenseData.account;
    let data = this.expenseData;

    // check money status -> if false then allow other methods to run if true then show toast
    this.moneyStatusOnCard = this.state.checkMoneyStatus(data);

    // if moneystatus is false the we can continue (false -> we have money on card or we can afford the expense)
    if (!this.moneyStatusOnCard) {
      console.log('MONEY IS VALID AND NOW WE ARE IN EXPENSE FORM');
      // pass data to state method for subject -> here we update the exense DOM table
      this.state.storeSubscribeForDataSubject(data);

      // pass data to state to array for DOM -> here we update the dahsboard DOM cards
      this.state.getMoneyChangeAndUpdateFirebase(data);
    }

    // if form is valid then show toast for better UX
    if (this.form.status === 'VALID') {
      this.isVisibleToast = true;
      this.message = `The expense: ${data.expenseType} with ${data.money} dolars was added.`;
    }

    if (this.moneyStatusOnCard) {
      this.isVisibleToast = true;
      this.message = `Money status on card: ${data.ID} is negative. Choose another card.`;
      this.type = 'error';
    }
  }
}
