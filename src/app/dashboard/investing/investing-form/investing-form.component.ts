import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Investing } from 'src/interfaces/userMoneySpending.interface';

import { InvestingService } from 'src/services/investing.service';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-investing-form',
  templateUrl: './investing-form.component.html',
  styleUrls: ['./investing-form.component.scss'],
})
export class InvestingFormComponent implements OnInit {
  investingData: Investing = {
    investingName: '',
    money: 0,
    date: new Date().toLocaleDateString(),
    account: '',
    typeOfInvesting: '',
    expenseType: 'Investing',
    ID: '',
  };

  accounts: string[] = [];
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

  @ViewChild('form') form: NgForm;
  isVisibleToast: boolean = false;
  type: string = 'success';
  message: string = '';

  // TODO:
  // 1. delnice
  constructor(
    private state: State,
    private investingDataService: InvestingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accounts = this.state.getAccountNames();
    this.positionEditorOptions.items = this.state.getAccountNames();
  }

  onUserCloseForm() {
    this.router.navigate(['investing']);
  }

  onSubmitForm() {
    this.investingData.ID = this.investingData.account;
    let data = this.investingData;

    // pass data to service
    this.investingDataService.storeInvestingData(data);

    // pass data to state and to store in firebase
    // this.state.storeInvestingDataInState(data);

    // pass data to state to array for DOM -> here we update the dahsboard DOM cards
    this.state.getMoneyChangeAndUpdateFirebase(data);

    if (this.form.status === 'VALID') {
      this.isVisibleToast = true;
      this.message = `Investment added: ${data.investingName} with ${data.money} dolars.`;
    }
  }
}
