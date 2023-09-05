import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BankAccount } from 'src/interfaces/bankAccount.interface';
import { BankCardService } from 'src/services/bankCard.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
})
export class BankAccountComponent {
  cards = ['Visa', 'Mastercard'];
  cardGoal = ['Saveings', 'Spending'];
  bankAccountData: BankAccount = {
    bankMoneyStatus: 0,
    bankAccountValidDate: new Date(),
    bankAccountCard: '',
    bankAccountName: '',
    bankAccountCustomName: '',
    ID: new Date().valueOf().toLocaleString(),
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

  constructor(
    private bankCardService: BankCardService,
    private router: Router
  ) {}

  onUserCloseForm() {
    this.router.navigate(['dashboard']);
  }

  onSubmitForm(e) {
    console.log(e);

    let data = this.bankAccountData;
    this.bankCardService.storeBankCard(data);
  }
}
