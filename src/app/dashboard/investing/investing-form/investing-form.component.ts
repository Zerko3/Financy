import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Investing } from 'src/interfaces/investing.interface';
import { InvestingService } from 'src/services/investing.service';

@Component({
  selector: 'app-investing-form',
  templateUrl: './investing-form.component.html',
  styleUrls: ['./investing-form.component.scss'],
})
export class InvestingFormComponent {
  investingData: Investing = {
    investingName: '',
    investingAmountOfMoney: 0,
    investingDate: new Date().toLocaleDateString(),
    account: '',
    typeOfInvesting: '',
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
  constructor(
    private investingDataService: InvestingService,
    private router: Router
  ) {}

  onUserCloseForm() {
    this.router.navigate(['investing']);
  }

  onSubmitForm(e) {
    let data = this.investingData;
    this.investingDataService.storeInvestingData(data);
  }
}
