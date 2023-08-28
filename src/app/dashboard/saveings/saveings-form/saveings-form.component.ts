import { Component } from '@angular/core';
import { Saveings } from 'src/interfaces/saveings.interface';
import { SaveingsService } from 'src/services/saveings.service';

@Component({
  selector: 'app-saveings-form',
  templateUrl: './saveings-form.component.html',
  styleUrls: ['./saveings-form.component.scss'],
})
export class SaveingsFormComponent {
  saveingsData: Saveings = {
    amountOfMoneySaved: 0,
    dateOfSaveings: new Date(),
    typeOfSaveings: '',
    account: '',
  };

  account: string[] = ['Account 1', 'Account 2'];
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
  constructor(private saveingsService: SaveingsService) {}

  onSubmitForm(e) {
    console.log(e);
    console.log(this.saveingsData);

    let data = this.saveingsData;
    this.saveingsService.storeSaveingsData(data);
  }
}
