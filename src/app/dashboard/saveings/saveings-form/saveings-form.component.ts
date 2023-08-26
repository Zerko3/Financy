import { Component } from '@angular/core';

@Component({
  selector: 'app-saveings-form',
  templateUrl: './saveings-form.component.html',
  styleUrls: ['./saveings-form.component.scss'],
})
export class SaveingsFormComponent {
  savingsData: {
    date: Date;
    money: number;
  } = { date: new Date(), money: 0 };

  submitButtonOptions = {
    text: 'Submit',
    type: 'normal',
    useSubmitBehavior: true,
  };
  constructor() {}

  onSubmitForm(e) {}
}
