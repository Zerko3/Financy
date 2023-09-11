import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankAccount } from 'src/interfaces/bankAccount.interface';
import { State } from './state.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorage {
  // test
  cardsArraySubject = new Subject<BankAccount[]>();
  constructor(private http: HttpClient) {}

  // https://angular---financy-default-rtdb.europe-west1.firebasedatabase.app/

  // TODO:
  // 1. Get the valid arrays and store them in the firebase
  // 2. Should i use PUT or POST to store user specific data

  // store data in Firebase
  storeValidUserDataInFirebase(data: BankAccount[]) {
    // 1. get user data
    // 2. pass user data to firebase
    this.http
      .put(
        `https://angular---financy-default-rtdb.europe-west1.firebasedatabase.app/users/cards.json`,
        data
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  // get data from Firebase

  // TODO:
  //  1. Make it so that the data will be set globaly -> so i need to overrite the data in state
  // 2. Make it so that when i want to add or delete card this will update the correct way
  getValidUserDataFromFirebase() {
    this.http
      .get<BankAccount[]>(
        `https://angular---financy-default-rtdb.europe-west1.firebasedatabase.app/users/cards.json`
      )
      .subscribe((data: BankAccount[]) => {
        console.log(data);
        // pass this data so it will be visible on the DOM
        this.cardsArraySubject.next(data);
      });
  }
}
