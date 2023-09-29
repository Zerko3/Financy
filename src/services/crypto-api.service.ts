import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CryptoResponseData } from 'src/interfaces/cryptoResponseData.interface';
import { environment } from 'src/environments/environment.development';

@Injectable({ providedIn: 'root' })
export class CryptoAPI {
  cacheData: CryptoResponseData[] = [];

  coinSubjet = new Subject<CryptoResponseData[]>();
  constructor(private http: HttpClient) {}

  // call API in here

  // get
  getCoinDataFromBackend() {
    // guard clause -> if there is data in cache dont call the API (we limit the API calls and load on the server like this)
    if (this.cacheData.length !== 0) {
      return this.cacheData;
    }

    return (
      this.http
        .get<CryptoResponseData[]>(environment._COIN_GECKO_END_POINT)
        .subscribe((responseData: CryptoResponseData[]) => {
          this.coinSubjet.next(responseData);

          // store data in here so we wont call the server everytime we load the component
          this.cacheData = responseData;
        }),
      (error) => {
        console.log(error);
      }
    );
  }
}
