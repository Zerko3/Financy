import { Injectable } from '@angular/core';
import { Investing } from 'src/interfaces/userMoneySpending.interface';

@Injectable({ providedIn: 'root' })
export class InvestingService {
  totalInvestment: number = 0;
  constructor() {}

  // store
  storeInvestingData(data: Investing) {
    this.totalInvestment = data.money;
  }
}
