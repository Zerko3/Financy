import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BankAccount } from 'src/interfaces/bankAccount.interface';
import { BankCardService } from 'src/services/bankCard.service';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
})
export class BankAccountComponent {
  @ViewChild('form') form: NgForm;
  isVisibleToast: boolean = false;
  type: string = 'success';
  message: string = '';
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
    private state: State,
    private bankCardService: BankCardService,
    private router: Router
  ) {}

  onUserCloseForm() {
    this.router.navigate(['dashboard']);
  }

  onSubmitForm() {
    console.log(this.form);
    let data = this.bankAccountData;

    // pass data to state
    this.state.storeBankCard(data);

    // this.bankCardService.storeBankCard(data);

    if (this.form.status === 'VALID') {
      console.log('yo');
      this.message = `The card named: ${data.bankAccountCustomName} was created.`;
      this.isVisibleToast = true;
    }
  }
}
