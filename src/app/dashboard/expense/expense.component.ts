import { Component } from '@angular/core';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent {
  // TODO:
  // 1. model or interface?
  // 2. service to store the data for now
  // 3. later on call the data from firebase
  // 4. Service will get and post this valid data
  // 5. give or recive data from service
  expenses = [
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
}
