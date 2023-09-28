import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CryptoResponseData } from 'src/interfaces/cryptoResponseData.interface';

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
      console.log('SOMETHING IS IN HERE!!!');
      return this.cacheData;
    }

    return (
      this.http
        .get<CryptoResponseData[]>(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2Cbinancecoin&order=market_cap_desc&per_page=100&page=1&sparkline=true&locale=en`
        )
        .subscribe((responseData: CryptoResponseData[]) => {
          console.log(responseData);
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
