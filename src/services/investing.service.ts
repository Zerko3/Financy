import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Investing } from 'src/interfaces/investing.interface';

@Injectable({ providedIn: 'root' })
export class InvestingService {
  investingDataArray: Investing[] = [];
  investingSubscribe = new Subject<Investing>();
  constructor() {}

  // store
  storeInvestingData(data: Investing) {
    this.investingDataArray.push(data);

    this.investingSubscribe.next(data);
  }

  // get
  getInvestingData() {
    return this.investingDataArray.slice();
  }
}
