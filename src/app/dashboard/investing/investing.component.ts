import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CryptoResponseData } from 'src/interfaces/cryptoResponseData.interface';

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
  coinSubscribe: Subscription;

  investingTotalAmount: number = 0;
  previousInvestingTotalAmount: number = 0;
  moneyRelativeIncrese: number = 0;
  totalAmountInvestedPerCoin: [
    { coins: string; totalAmount: number },
    { coins: string; totalAmount: number },
    { coins: string; totalAmount: number }
  ] = [
    { coins: 'Bitcoin', totalAmount: 0 },
    { coins: 'Ethereum', totalAmount: 0 },
    { coins: 'BNB', totalAmount: 0 },
  ];

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
  popupVisible: boolean = false;

  coinPriceArray: CryptoResponseData[] = [];

  closeButtonOptions = {
    text: 'Close',
    onClick(e) {
      this.popupVisible = false;
    },
  };

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

      // pass money into the correct path to display on the DOM
      if (investment.coins === 'BTC') {
        this.totalAmountInvestedPerCoin[0].totalAmount += investment.money;
      } else if (investment.coins === 'ETH') {
        this.totalAmountInvestedPerCoin[1].totalAmount += investment.money;
      } else if (investment.coins === 'BNB') {
        this.totalAmountInvestedPerCoin[2].totalAmount += investment.money;
      }
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

        // pass money into the correct path to display on the DOM
        if (data.coins === 'BTC') {
          this.totalAmountInvestedPerCoin[0].totalAmount += data.money;
        } else if (data.coins === 'ETH') {
          this.totalAmountInvestedPerCoin[1].totalAmount += data.money;
        } else if (data.coins === 'BNB') {
          this.totalAmountInvestedPerCoin[2].totalAmount += data.money;
        }
      }
    );

    // call API here, mby will add it somewhare else later (dashboard mby?)
    this.cryptoApiData.getCoinDataFromBackend();

    // we call the cacheData if there is something in there. This will still get us the data if we dont call the server
    if (this.cryptoApiData.cacheData.length > 0) {
      this.coinPriceArray = this.cryptoApiData.cacheData;
      console.log('CAHCE ACTIVATED');
      console.log(this.coinPriceArray);
    } else {
      // since the API needs a subject to get the data we do it here
      this.coinSubscribe = this.cryptoApiData.coinSubjet.subscribe(
        (responseData: CryptoResponseData[]) => {
          this.coinPriceArray = responseData;
          console.log('called crypto');
          console.log(this.coinPriceArray);
        }
      );
    }
  }

  ngOnDestroy(): void {
    console.log('UNSUBSCRIBE - INVESTING');
    this.investingSubscribe.unsubscribe();
    this.coinSubscribe.unsubscribe();
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

  showAdditionalInfo(coin: string) {
    // ...

    if (coin) this.popupVisible = true;
  }
}
