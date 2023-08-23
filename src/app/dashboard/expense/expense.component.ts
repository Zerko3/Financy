import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent {
  expenses = [
    {
      Date: new Date(),
      Money: 100,
      Expanses: 'Subscription',
      Name: 'Apple',
      Status: 'Paid',
    },
  ];
  columns = ['Date', 'Money', 'Expanses', 'Name', 'Status'];
  constructor(private navigationService: NavigationService) {}
}
