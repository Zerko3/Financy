import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Expense } from 'src/interfaces/expense.interface';
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

  moneyStatusOnCard: boolean = false;

  constructor(
    private state: State,
    private expenseService: ExpenseService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

    // check money status -> if false then allow other methods to run if true then show toast
    this.moneyStatusOnCard = this.state.checkMoneyStatus(data);
    console.log(this.moneyStatusOnCard);

    // AT THE BEGINNING I NEED TO PASS THE MONEY TO GETMONEYCHANGE TO SEE IF THE MONEY IS 0 OR LESS THAN 0 ON CARD

    // If money is less than 0 or 0 than show toast to signal we cant do this operation

    // else i can pass the data to the rest of the methods

    // should this be a sperate method

    // the method loops over and cheks money status and returns a boolean

    // inject this boolean here and if true allow other methods to be activated if not stop the process

    // pass data to expense service for expence component -> here we update the expense DOM numbers

    if (!this.moneyStatusOnCard) {
      console.log('started');
      this.expenseService.storeExpenseData(data);

      // pass data to state method for subject -> here we update the exense DOM table
      this.state.storeSubscribeForDataSubject(data);

      // pass data to state -> here we update the arrays in state
      this.state.storeExpenseDataInState(data);

      // pass data to state to array for DOM -> here we update the dahsboard DOM
      this.state.getMoneyChange(data);
    }

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
