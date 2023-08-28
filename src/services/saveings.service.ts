import { Injectable } from '@angular/core';
import { Saveings } from 'src/interfaces/saveings.interface';

@Injectable({ providedIn: 'root' })
export class SaveingsService {
  saveingsArray: Saveings[] = [];
  constructor() {}

  storeSaveingsData(data: Saveings) {
    this.saveingsArray.push(data);
    console.log(this.saveingsArray);
  }

  getSaveingsData() {
    // return data
    return this.saveingsArray.slice();
  }
}
