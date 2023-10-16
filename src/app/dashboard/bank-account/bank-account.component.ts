import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BankAccount } from 'src/interfaces/bankAccount.interface';
import { LoginService } from 'src/services/login.service';
import { RegisterService } from 'src/services/register.service';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
})
export class BankAccountComponent {
  @ViewChild('form') form: NgForm;
  isVisibleToast: boolean = false;
  type: string = '';
  message: string = '';
  cards = ['Visa', 'Mastercard'];
  cardGoal = ['Savings', 'Spending'];
  loggedInUsername: string = this.loginService.username
    ? this.loginService.username
    : this.registerService.username;
  bankAccountData: BankAccount = {
    userOfBankAccount: this.loggedInUsername,
    bankMoneyStatus: 0,
    bankAccountValidDate: new Date(),
    bankAccountCard: '',
    bankAccountName: '',
    bankAccountCustomName: '',
    ID: new Date().valueOf().toLocaleString(),
    expenseOnCard: [],
  };

  submitButtonOptions = {
    text: 'Submit',
    type: 'normal',
    useSubmitBehavior: true,
  };

  positionEditorOptionsCardGoal = {
    items: this.cardGoal,
    searchEnabled: true,
    value: '',
  };

  positionEditorOptionsCardType = {
    items: this.cards,
    searchEnabled: true,
    value: '',
  };

  isCardAmmountReached: boolean = false;

  constructor(
    private state: State,
    private router: Router,
    private loginService: LoginService,
    private registerService: RegisterService
  ) {}

  // allows user to navigate via router.
  onUserCloseForm() {
    this.router.navigate(['dashboard']);
  }

  // user submit form
  // 1. get valid data from form via devextreme
  // 2. pass it into state
  onSubmitForm() {
    let data = this.bankAccountData;

    // pass data to state subject
    this.state.storeSubscribeForCardCreation(data);

    // here is where i need to get the lenght of the array in boolean
    this.isCardAmmountReached = this.state.getToastSignal();

    // only run this code if the form is valid
    if (this.form.status === 'VALID') {
      this.isVisibleToast = true;
      // this is activated if we have reched the max card amount
      if (this.isCardAmmountReached) {
        this.isCardAmmountReached = true;
        console.log(this.isCardAmmountReached);
      }

      // display toast ui
      this.type = this.isCardAmmountReached ? 'error' : 'success';

      // display toast message
      this.message = this.isCardAmmountReached
        ? `The maximum number of cards has been added.`
        : `The card named: ${data.bankAccountCustomName} was created.`;
    }
  }
}
