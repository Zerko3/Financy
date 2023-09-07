import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Saveings } from 'src/interfaces/saveings.interface';

@Injectable({ providedIn: 'root' })
export class SaveingsService {
  saveingsArray: Saveings[] = [];
  totalMoneySaved: number = 0;

  constructor() {}

  storeSaveingsData(data: Saveings) {
    this.totalMoneySaved += data.amountOfMoneySaved;
  }

  getMoneySaved() {
    return this.totalMoneySaved;
  }
}
