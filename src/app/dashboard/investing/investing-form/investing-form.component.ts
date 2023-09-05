import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Investing } from 'src/interfaces/investing.interface';
import { BankCardService } from 'src/services/bankCard.service';
import { InvestingService } from 'src/services/investing.service';

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
    private investingDataService: InvestingService,
    private bankCardService: BankCardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accounts = this.bankCardService.getAccountNames();
    this.positionEditorOptions.items = this.bankCardService.getAccountNames();
  }

  onUserCloseForm() {
    this.router.navigate(['investing']);
  }

  onSubmitForm() {
    let data = this.investingData;
    this.investingDataService.storeInvestingData(data);

    if (this.form.status === 'VALID') {
      this.isVisibleToast = true;
      this.message = `Investment added: ${data.investingName} with ${data.investingAmountOfMoney} dolars.`;
    }
  }
}
