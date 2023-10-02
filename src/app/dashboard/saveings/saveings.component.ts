import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Saveings } from 'src/interfaces/userMoneySpending.interface';
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

  constructor(private state: State, private router: Router) {}

  ngOnInit(): void {
    // get data from firebase on init
    this.saveingsFormDataArray = this.state.getSaveingsData();

    //  needs to be overwritten when user spend money
    this.accountBalance = this.state.getAccountBalance();

    // get total money saved on DOM
    this.totalMoneySaved = this.state.getTotalMoneyInSaveingAccount();

    // update total account balance
    this.totalAccountMoney = this.accountBalance + this.totalMoneySaved;

    // get valid data from subject and display it on the DOM
    this.saveingSubscribe = this.state.saveing.subscribe((data) => {
      // push data into array for DOM display
      this.saveingsFormDataArray.push(data);

      this.totalMoneySaved += data.money;

      this.totalAccountMoney = this.accountBalance + this.totalMoneySaved;
    });
  }

  ngOnDestroy(): void {
    this.saveingSubscribe.unsubscribe();
  }

  // allow user navigation via router
  userNavigationForm() {
    this.router.navigate(['dashboard/saveings/saveingsForm']);
  }

  // TODO
  cellStyle(e) {
    if (e.rowType === 'data' && e.column.dataField === 'Status') {
      // e.cellElement.classList.add('test');
    }
  }
}
