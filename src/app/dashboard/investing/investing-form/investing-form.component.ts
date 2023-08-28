import { Component } from '@angular/core';
import { Investing } from 'src/interfaces/investing.interface';

@Component({
  selector: 'app-investing-form',
  templateUrl: './investing-form.component.html',
  styleUrls: ['./investing-form.component.scss'],
})
export class InvestingFormComponent {
  investingData: Investing = {
    investingName: '',
    investingAmountOfMoney: 0,
    investingDate: new Date(),
  };
  accounts = ['Account 1', 'Account 2'];
  investingTypes = ['Daily', 'Weekly', 'Monthly', 'Additional investment'];
  positionEditorOptions = {
    items: this.accounts,
    searchEnabled: true,
    value: '',
  };
  positionEditorOptionsTypeOfInvesting = {
    items: this.investingTypes,
    searchEnabled: true,
    value: '',
  };
  submitButtonOptions = {
    text: 'Submit',
    type: 'normal',
    useSubmitBehavior: true,
  };

  // TODO:
  // 1. delnice
  constructor() {}
  onSubmitForm(e) {
    console.log(e);
    console.log(this.investingData);
  }
}
