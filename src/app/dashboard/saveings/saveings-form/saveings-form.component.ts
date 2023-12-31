import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Saveings } from 'src/interfaces/userMoneySpending.interface';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-saveings-form',
  templateUrl: './saveings-form.component.html',
  styleUrls: ['./saveings-form.component.scss'],
})
export class SaveingsFormComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  isVisibleToast: boolean = false;
  type: string = 'success';
  message: string = '';
  saveingsData: Saveings = {
    expenseType: 'Saving',
    money: 0,
    date: new Date(),
    typeOfSavings: '',
    account: '',
    ID: '',
  };

  account: string[] = [];
  typeOfSavings: string[] = [
    'Daily saving',
    'Weekly saving',
    'Monthly saving',
    'Additional saving',
  ];

  positionEditorOptions = {
    items: this.account,
    searchEnabled: true,
    value: '',
  };

  positionEditorOptionsTypeOfSaving = {
    items: this.typeOfSavings,
    searchEnabled: true,
    value: '',
  };

  submitButtonOptions = {
    text: 'Submit',
    type: 'normal',
    useSubmitBehavior: true,
  };
  constructor(private state: State, private router: Router) {}

  ngOnInit(): void {
    this.account = this.state.getAccountNames();
    this.positionEditorOptions.items = this.account;
  }

  onUserCloseForm() {
    this.router.navigate(['/savings']);
  }

  onSubmitForm() {
    this.saveingsData.ID = this.saveingsData.account;
    let data = this.saveingsData;

    // pass data to subject
    this.state.storeSubscribeForSaveing(data);

    // pass data to state for array and DOM
    this.state.getMoneyChangeAndUpdateFirebase(data);

    if (this.form.status === 'VALID') {
      this.isVisibleToast = true;
      this.message = `Saving added: ${data.typeOfSavings} with ${data.money} dolars.`;
    }
  }
}
