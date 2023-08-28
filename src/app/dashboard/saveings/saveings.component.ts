import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Saveings } from 'src/interfaces/saveings.interface';
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
  // TODO:
  // 2. service to store the data for now
  // 3. later on call the data from firebase
  // 4. Service will get and post this valid data
  // 5. give or recive data from service

  saveingsFormDataArray: Saveings[] = [];
  columns: string[] = ['Date', 'Money', 'Status', 'Account'];
  saveingSubscribe: Subscription;
  totalMoneySaved: number = 0;

  constructor(
    private router: Router,
    private saveingsService: SaveingsService
  ) {}

  ngOnInit(): void {
    this.saveingsFormDataArray = this.saveingsService.getSaveingsData();
    this.totalMoneySaved = this.saveingsService.getMoneySaved();

    this.saveingSubscribe = this.saveingsService.saveing.subscribe((data) => {
      console.log(data);
      this.totalMoneySaved += data.amountOfMoneySaved;
      this.saveingsFormDataArray.push(data);
    });
  }

  ngOnDestroy(): void {
    console.log('UNSUBSCRIBE - SAVEING');
    this.saveingSubscribe.unsubscribe();
  }

  userNavigationForm() {
    this.router.navigate(['saveings/saveingsForm']);
  }

  cellStyle(e) {
    if (e.rowType === 'data' && e.column.dataField === 'Status') {
      e.cellElement.classList.add('test');
    }
  }
}
