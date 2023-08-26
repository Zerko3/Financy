import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saveings',
  templateUrl: './saveings.component.html',
  styleUrls: ['./saveings.component.scss'],
})
export class SaveingsComponent {
  allowedPageSizes: [number, string] = [10, 'all'];
  displayMode: string = 'full';
  showPageSizeSelector: boolean = true;
  showInfo: boolean = true;
  showNavButtons: boolean = true;
  // TODO:
  // 1. model or interface?
  // 2. service to store the data for now
  // 3. later on call the data from firebase
  // 4. Service will get and post this valid data
  // 5. give or recive data from service

  // WILL REMOVE
  expenses = [
    {
      Date: new Date(),
      Money: 100,
      Expanses: 'Subscription',
      Name: 'Netflix',
      Status: 'Paid',
      Account: 'Paypal',
    },
    {
      Date: new Date(),
      Money: 100,
      Expanses: 'Subscription',
      Name: 'Apple',
      Status: 'Paid',
      Account: 'Paypal',
    },
    {
      Date: new Date(),
      Money: 100,
      Expanses: 'Subscription',
      Name: 'Apple',
      Status: 'Paid',
      Account: 'Paypal',
    },
    {
      Date: new Date(),
      Money: 100,
      Expanses: 'Subscription',
      Name: 'Apple',
      Status: 'Paid',
      Account: 'Paypal',
    },
    {
      Date: new Date(),
      Money: 100,
      Expanses: 'Subscription',
      Name: 'Apple',
      Status: 'Paid',
      Account: 'Paypal',
    },
    {
      Date: new Date(),
      Money: 100,
      Expanses: 'Subscription',
      Name: 'Apple',
      Status: 'Paid',
      Account: 'Paypal',
    },
    {
      Date: new Date(),
      Money: 100,
      Expanses: 'Subscription',
      Name: 'Apple',
      Status: 'Paid',
      Account: 'Paypal',
    },
    {
      Date: new Date(),
      Money: 100,
      Expanses: 'Subscription',
      Name: 'Apple',
      Status: 'Paid',
      Account: 'Paypal',
    },
    {
      Date: new Date(),
      Money: 100,
      Expanses: 'Subscription',
      Name: 'Apple',
      Status: 'Paid',
      Account: 'Paypal',
    },
    {
      Date: new Date(),
      Money: 100,
      Expanses: 'Subscription',
      Name: 'Apple',
      Status: 'Paid',
      Account: 'Paypal',
    },
    {
      Date: new Date(),
      Money: 100,
      Expanses: 'Subscription',
      Name: 'Apple',
      Status: 'Paid',
      Account: 'Paypal',
    },
  ];
  columns: string[] = [
    'Date',
    'Money',
    'Expanses',
    'Name',
    'Status',
    'Account',
  ];

  constructor(private router: Router) {}

  userNavigationForm() {
    this.router.navigate(['saveings/saveingsForm']);
  }

  cellStyle(e) {
    if (e.rowType === 'data' && e.column.dataField === 'Status') {
      e.cellElement.classList.add('test');
    }
  }
}
