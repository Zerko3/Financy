import { Component } from '@angular/core';
import { BankAccount } from 'src/interfaces/bankAccount.interface';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
})
export class BankAccountComponent {
  cards = ['Visa', 'Mastercard'];
  bankAccountData: BankAccount = {
    bankMoneyStatus: 0,
    bankAccountValidDate: new Date(),
    bankAccountCard: '',
    bankAccountName: '',
  };

  submitButtonOptions = {
    text: 'Submit',
    type: 'normal',
    useSubmitBehavior: true,
  };

  positionEditorOptionsCardType = {
    items: this.cards,
    searchEnabled: true,
    value: '',
  };
  constructor() {}

  onSubmitForm(e) {
    console.log(e);
    console.log(this.bankAccountData);
  }
}
