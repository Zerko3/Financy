import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Investing } from 'src/interfaces/investing.interface';
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
    investingAmountOfMoney: 0,
    investingDate: new Date().toLocaleDateString(),
    account: '',
    typeOfInvesting: '',
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
    let data = this.investingData;
    this.investingDataService.storeInvestingData(data);

    this.state.storeInvestingDataInState(data);

    if (this.form.status === 'VALID') {
      this.isVisibleToast = true;
      this.message = `Investment added: ${data.investingName} with ${data.investingAmountOfMoney} dolars.`;
    }
  }
}
