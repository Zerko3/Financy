import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Saveings } from 'src/interfaces/saveings.interface';
import { BankCardService } from 'src/services/bankCard.service';
import { SaveingsService } from 'src/services/saveings.service';

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
    private router: Router,
    private saveingsService: SaveingsService,
    private bankCardService: BankCardService
  ) {}

  ngOnInit(): void {
    this.saveingsFormDataArray = this.saveingsService.getSaveingsData();

    console.log(this.bankCardService.totalMoneyInSaveingAccounts);

    this.totalAccountMoney =
      this.bankCardService.totalMoneyInBankAccount +
      this.saveingsService.totalMoneySaved;

    this.accountBalance = this.bankCardService.totalMoneyInSpendingAccounts;

    this.totalMoneySaved =
      this.saveingsService.totalMoneySaved +
      this.bankCardService.totalMoneyInSaveingAccounts;

    this.saveingSubscribe = this.saveingsService.saveing.subscribe((data) => {
      console.log(data);
      this.totalMoneySaved += data.amountOfMoneySaved;
      this.saveingsFormDataArray.push(data);

      this.totalAccountMoney += data.amountOfMoneySaved;
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
