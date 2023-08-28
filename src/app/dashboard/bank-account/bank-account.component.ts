import { Component } from '@angular/core';
import { BankAccount } from 'src/interfaces/bankAccount.interface';
import { BankCardService } from 'src/services/bankCard.service';

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
  constructor(private bankCardService: BankCardService) {}

  onSubmitForm(e) {
    console.log(e);

    let data = this.bankAccountData;
    this.bankCardService.storeBankCard(data);
  }
}
