import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Stock } from 'src/interfaces/stock.interface';
import { Investing } from 'src/interfaces/userMoneySpending.interface';
import { State } from 'src/services/state.service';

@Component({
  selector: 'app-investing',
  templateUrl: './investing.component.html',
  styleUrls: ['./investing.component.scss'],
})
export class InvestingComponent implements OnInit, OnDestroy {
  investingDataArray: Investing[] = [];
  investingSubscribe: Subscription;
  investingTotalAmount: number = 0;
  investingAmount: Stock[] = [];

  constructor(private state: State, private router: Router) {}

  // BUGS:
  // 1. When i add an investemnt it does not append right away -> subject

  // 3. The money pool does not get updated

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
      // get data into an object to push it into valid array
      const stock = {
        investedDate: investment.date,
        investedAmount: investment.money,
      };

      // display on DOM
      this.investingAmount.push(stock);
      this.investingTotalAmount += investment.money;
    }

    this.investingSubscribe = this.state.investingSubscribe.subscribe(
      (data) => {
        // TODO:
        // 1. Check if there is the same date in the array if so then add together the invesmtent else just add it    normaly
        // logic...

        this.investingDataArray.push(data);

        console.log('Working subject');

        // get data into an object to push it into valid array
        const stock = {
          investedDate: data.date,
          investedAmount: data.money,
        };
        // display on DOM
        this.investingAmount.push(stock);

        console.log(this.investingAmount);
        this.investingTotalAmount += data.money;
      }
    );
  }

  ngOnDestroy(): void {
    console.log('UNSUBSCRIBE - INVESTING');
    this.investingSubscribe.unsubscribe();
  }

  userFormNavigate() {
    this.router.navigate(['investing/investingForm']);
  }
}
