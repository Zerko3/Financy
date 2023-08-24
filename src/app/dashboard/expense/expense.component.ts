import { Component } from '@angular/core';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent {
  allowedPageSizes = [10, 'all'];
  displayMode = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
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
  columns = ['Date', 'Money', 'Expanses', 'Name', 'Status', 'Account'];
  constructor(private navigationService: NavigationService) {}

  // TODO:
  // 1. Get valid row
  // 2. Get valid data and pass on the color
  // 3. Add multiple color options for paid unpaid subscription food ,....
  cellStyle(e) {
    if (e.rowType === 'data' && e.column.dataField === 'Status') {
      e.cellElement.classList.add('test');
      // e.cellElement.style.color = 'green';
      // e.cellElement.style.fontWeight = 'bold';

      // e.cellElement.addClass = 'test';
    }
  }
}
