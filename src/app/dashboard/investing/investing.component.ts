import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Stock } from 'src/interfaces/stock.interface';
import { Investing } from 'src/interfaces/userMoneySpending.interface';
import { CryptoAPI } from 'src/services/crypto-api.service';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-investing',
  templateUrl: './investing.component.html',
  styleUrls: ['./investing.component.scss'],
})
export class InvestingComponent implements OnInit, OnDestroy {
  @ViewChild('hideBalance', { static: false }) hideBalance: ElementRef;
  investingDataArray: Investing[] = [];
  investingSubscribe: Subscription;

  investingTotalAmount: number = 0;
  previousInvestingTotalAmount: number = 0;
  moneyRelativeIncrese: number = 0;

  allowedPageSizes: [number] = [10];
  showPageSizeSelector: boolean = true;
  showInfo: boolean = true;
  showNavButtons: boolean = true;
  investingAmount: Stock[] = [];
  types: string[] = [
    'splinearea',
    'stackedsplinearea',
    'fullstackedsplinearea',
  ];

  hideMoneyBalance: boolean = false;
  toggleChartView: boolean = false;

  coinPrice;

  constructor(
    private state: State,
    private router: Router,
    private cryptoApiData: CryptoAPI
  ) {}

  // TODO:
  // 1. Choose if i will have an API here to track investing stocks
  // 2. Get data for all the invested money
  // 3. If i will have API call then i can track the sucess rate of my investing
  // 4. Button to swich views between invested amount and the current state of the money

  // API to call will be coingeko free api

  // GOAL
  // 1. Display X amoount of coins you can buy
  // 2. Add coin price rate market rate
  // 3. Deduct money from wallet that bought coin
  // 4. Add money to investting amount
  // 5. If api allows tracking realtime i think i can make a makeshitft money tracker

  ngOnInit(): void {
    // get data on component load
    this.investingDataArray = this.state.getInvestingData();

    for (const investment of this.investingDataArray) {
      this.investingTotalAmount += investment.money;

      // the chart needs to show how the TOTAL balance is moveing on the day to day
      const stock = {
        investedDate: investment.date,
        investedAmount: this.investingTotalAmount,
      };

      // display on DOM
      this.investingAmount.push(stock);
    }

    this.investingSubscribe = this.state.investingSubscribe.subscribe(
      (data) => {
        // get the previous total amount (needed for % increse calc -> not modulo!)
        this.previousInvestingTotalAmount = this.investingTotalAmount;

        this.investingTotalAmount += data.money;
        this.investingDataArray.push(data);

        // get data into an object to push it into valid array
        const stock = {
          investedDate: data.date,
          investedAmount: this.investingTotalAmount,
        };
        // display on DOM
        this.investingAmount.push(stock);

        // calculate the increse in money
        const moneyIncrese =
          ((this.investingTotalAmount - this.previousInvestingTotalAmount) /
            this.previousInvestingTotalAmount) *
          100;

        // get 2 decimals for the number (needs to be + since .toFixed(n) returns a string!)
        this.moneyRelativeIncrese = +moneyIncrese.toFixed(2);
      }
    );

    // call API here, mby will add it somewhare else later
    this.cryptoApiData.getCoinDataFromBackend();
  }

  ngOnDestroy(): void {
    console.log('UNSUBSCRIBE - INVESTING');
    this.investingSubscribe.unsubscribe();
  }

  userFormNavigate() {
    this.router.navigate(['investing/investingForm']);
  }

  hideInvestingBalance(e: any) {
    if (e.target.textContent === 'Hide balance') {
      this.hideMoneyBalance = !this.hideMoneyBalance;
    }
  }

  toggleViewOfChart() {
    this.toggleChartView = !this.toggleChartView;
  }
}
