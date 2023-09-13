import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankAccount } from 'src/interfaces/bankAccount.interface';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorage {
  cardsArraySubject = new Subject<BankAccount[]>();
  cacheData: BankAccount[] | null = null;
  constructor(private http: HttpClient) {}

  // store data in Firebase
  storeValidUserDataInFirebase(data: BankAccount[]) {
    this.http
      .put(
        `https://angular---financy-default-rtdb.europe-west1.firebasedatabase.app/users/cards.json`,
        data
      )
      .subscribe((response: BankAccount[]) => {
        console.log(response);
      });
  }

  // get data from Firebase

  getValidUserDataFromFirebase() {
    // if i have data on DOM then do NOT call this HTTP request
    if (this.cacheData !== null) {
      console.log('PRESENT DATA ON DOM');
      return this.cacheData;
    }

    return (
      this.http
        .get<BankAccount[]>(
          `https://angular---financy-default-rtdb.europe-west1.firebasedatabase.app/users/cards.json`
        )
        .subscribe((data: BankAccount[]) => {
          if (data.length === 0) {
            return;
          }

          this.cacheData = data;

          // pass this data so it will be visible on the DOM
          this.cardsArraySubject.next(data);
        }),
      (error) => {
        console.log(error);
      }
    );
  }
}
