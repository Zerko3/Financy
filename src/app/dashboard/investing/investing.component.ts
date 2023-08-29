import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Investing } from 'src/interfaces/investing.interface';
import { Stock } from 'src/interfaces/stock.interface';
import { InvestingService } from 'src/services/investing.service';

@Component({
  selector: 'app-investing',
  templateUrl: './investing.component.html',
  styleUrls: ['./investing.component.scss'],
})
export class InvestingComponent implements OnInit, OnDestroy {
  energySources = [{ value: 'investedAmount', name: 'investing value' }];
  investingDataArray: Investing[] = [];
  investingSubscribe: Subscription;
  clickedOnNavigation: boolean = false;
  investingTotalAmount: number = 0;

  investingAmount: Stock[] = [];

  constructor(
    private router: Router,
    private investingDataService: InvestingService
  ) {}

  // TODO:
  // 1. Choose if i will have an API here to track investing stocks
  // 2. Get data for all the invested money
  // 3. If i will have API call then i can track the sucess rate of my investing
  // 4. Button to swich views between invested amount and the current state of the money

  ngOnInit(): void {
    this.investingDataArray = this.investingDataService.getInvestingData();

    this.investingSubscribe =
      this.investingDataService.investingSubscribe.subscribe((data) => {
        console.log(data);
        this.investingDataArray.push(data);
        console.log(this.investingDataArray);

        // display on DOM
        const stock = {
          investedDate: data.investingDate,
          investedAmount: data.investingAmountOfMoney,
        };

        this.investingAmount.push(stock);
        this.investingTotalAmount += data.investingAmountOfMoney;
      });
  }

  ngOnDestroy(): void {
    console.log('UNSUBSCRIBE - INVESTING');
    this.investingSubscribe.unsubscribe();
  }

  userFormNavigate() {
    this.clickedOnNavigation = !this.clickedOnNavigation;
    if (this.clickedOnNavigation) {
      this.router.navigate(['investing/investingForm']);
    } else {
      this.router.navigate(['investing']);
    }
  }
}
