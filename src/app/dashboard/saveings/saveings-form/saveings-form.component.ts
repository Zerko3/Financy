import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Saveings } from 'src/interfaces/saveings.interface';
import { BankCardService } from 'src/services/bankCard.service';
import { SaveingsService } from 'src/services/saveings.service';

@Component({
  selector: 'app-saveings-form',
  templateUrl: './saveings-form.component.html',
  styleUrls: ['./saveings-form.component.scss'],
})
export class SaveingsFormComponent implements OnInit {
  saveingsData: Saveings = {
    amountOfMoneySaved: 0,
    dateOfSaveings: new Date(),
    typeOfSaveings: '',
    account: '',
  };

  account: string[] = [];
  typeOfSaveings: string[] = [
    'Daily saveing',
    'Weekly saveing',
    'Monthly saveing',
    'Additional saveing',
  ];

  positionEditorOptions = {
    items: this.account,
    searchEnabled: true,
    value: '',
  };

  positionEditorOptionsTypeOfSaveing = {
    items: this.typeOfSaveings,
    searchEnabled: true,
    value: '',
  };

  submitButtonOptions = {
    text: 'Submit',
    type: 'normal',
    useSubmitBehavior: true,
  };
  constructor(
    private saveingsService: SaveingsService,
    private bankCardService: BankCardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.account = this.bankCardService.getAccountNames();
    this.positionEditorOptions.items = this.account;
  }

  onUserCloseForm() {
    this.router.navigate(['saveings']);
  }

  onSubmitForm(e) {
    console.log(e);
    console.log(this.saveingsData);

    let data = this.saveingsData;
    this.saveingsService.storeSaveingsData(data);
  }
}
