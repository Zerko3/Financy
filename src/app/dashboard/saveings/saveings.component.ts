import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Saveings } from 'src/interfaces/userMoneySpending.interface';

import { SaveingsService } from 'src/services/saveings.service';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-saveings',
  templateUrl: './saveings.component.html',
  styleUrls: ['./saveings.component.scss'],
})
export class SaveingsComponent implements OnInit, OnDestroy {
  allowedPageSizes: [number, string] = [10, 'all'];
  displayMode: string = 'full';
  showPageSizeSelector: boolean = true;
  showInfo: boolean = true;
  showNavButtons: boolean = true;
  saveingsFormDataArray: Saveings[] = [];
  columns: string[] = ['Date', 'Money', 'Status', 'Account'];
  saveingSubscribe: Subscription;
  totalMoneySaved: number = 0;
  totalAccountMoney: number = 0;
  accountBalance: number = 0;

  constructor(
    private state: State,
    private router: Router,
    private saveingsService: SaveingsService
  ) {}

  ngOnInit(): void {
    this.saveingsFormDataArray = this.state.getSaveingsData();

    this.totalAccountMoney =
      this.state.totalMoneyInBankAccount + this.saveingsService.totalMoneySaved;

    //  needs to be overwritten when user spend money
    this.accountBalance = this.state.totalMoneyInSpendingAccounts;

    this.totalMoneySaved =
      this.saveingsService.totalMoneySaved +
      this.state.totalMoneyInSaveingAccounts;

    this.saveingSubscribe = this.state.saveing.subscribe((data) => {
      this.totalMoneySaved += data.money;
      this.saveingsFormDataArray.push(data);

      this.totalAccountMoney += data.money;
    });
  }

  ngOnDestroy(): void {
    console.log('UNSUBSCRIBE - SAVEING');
    this.saveingSubscribe.unsubscribe();
  }

  userNavigationForm() {
    this.router.navigate(['saveings/saveingsForm']);
  }

  // TODO
  cellStyle(e) {
    if (e.rowType === 'data' && e.column.dataField === 'Status') {
      // e.cellElement.classList.add('test');
    }
  }
}
