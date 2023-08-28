import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Saveings } from 'src/interfaces/saveings.interface';

@Injectable({ providedIn: 'root' })
export class SaveingsService {
  saveingsArray: Saveings[] = [];
  saveing = new Subject<Saveings>();
  constructor() {}

  storeSaveingsData(data: Saveings) {
    this.saveingsArray.push(data);

    // subscribe to data
    this.saveing.next(data);
  }

  getSaveingsData() {
    // return data
    return this.saveingsArray.slice();
  }
}
