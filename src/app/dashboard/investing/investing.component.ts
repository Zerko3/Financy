import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investing',
  templateUrl: './investing.component.html',
  styleUrls: ['./investing.component.scss'],
})
export class InvestingComponent {
  energySources = [{ value: 'euro', name: 'investing value' }];

  moneyInfo = [
    { portfolio: new Date('December 20, 1995 03:24:00'), euro: 4000 },
    { portfolio: new Date('December 25, 1995 03:24:00'), euro: 4170 },
    { portfolio: new Date('December 27, 1995 03:24:00'), euro: 4390 },
    { portfolio: new Date('December 30, 1995 03:24:00'), euro: 5100 },
  ];

  constructor(private router: Router) {}

  userFormNavigate() {
    this.router.navigate(['investing/investingForm']);
  }
}
