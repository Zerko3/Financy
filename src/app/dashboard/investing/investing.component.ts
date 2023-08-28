import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Investing } from 'src/interfaces/investing.interface';
import { InvestingService } from 'src/services/investing.service';

@Component({
  selector: 'app-investing',
  templateUrl: './investing.component.html',
  styleUrls: ['./investing.component.scss'],
})
export class InvestingComponent implements OnInit, OnDestroy {
  energySources = [{ value: 'euro', name: 'investing value' }];
  investingDataArray: Investing[] = [];
  investingSubscribe: Subscription;

  moneyInfo = [
    { portfolio: new Date('December 20, 1995 03:24:00'), euro: 4000 },
    { portfolio: new Date('December 25, 1995 03:24:00'), euro: 4170 },
    { portfolio: new Date('December 27, 1995 03:24:00'), euro: 4390 },
    { portfolio: new Date('December 30, 1995 03:24:00'), euro: 5100 },
  ];

  constructor(
    private router: Router,
    private investingDataService: InvestingService
  ) {}

  ngOnInit(): void {
    this.investingDataArray = this.investingDataService.getInvestingData();

    this.investingSubscribe =
      this.investingDataService.investingSubscribe.subscribe((data) => {
        console.log(data);
        this.investingDataArray.push(data);
        console.log(this.investingDataArray);
      });
  }

  ngOnDestroy(): void {
    console.log('UNSUBSCRIBE - INVESTING');
    this.investingSubscribe.unsubscribe();
  }

  userFormNavigate() {
    this.router.navigate(['investing/investingForm']);
  }
}
