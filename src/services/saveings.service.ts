import { Injectable } from '@angular/core';
import { Saveings } from 'src/interfaces/saveings.interface';

@Injectable({ providedIn: 'root' })
export class SaveingsService {
  saveingsArray: Saveings[] = [];
  totalMoneySaved: number = 0;

  constructor() {}

  storeSaveingsData(data: Saveings) {
    this.totalMoneySaved += data.money;
  }

  getMoneySaved() {
    return this.totalMoneySaved;
  }
}
