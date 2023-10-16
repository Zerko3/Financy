import { Injectable } from '@angular/core';
import { Carousel } from 'src/interfaces/carousel.interface';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  carouselArray: Carousel[] = [
    {
      userOpinion:
        'The secure transactions make me feel confident about my financial data, and the 5% boost in savings is real! Plus, tracking my finances has never been easier. Highly recommend!',
      userName: 'Mark Willson',
    },
    {
      userOpinion:
        'It is super user-friendly, and I appreciate the added layer of security. The only reason I am not giving it 5 stars is that I wish they had more investment options.',
      userName: 'Jonna Morgan',
    },
    {
      userOpinion:
        'The 5% increase in savings is no joke, and I have been able to reach my financial goals faster than I ever thought possible. Tracking my expenses has made me much more mindful.',
      userName: 'Bob Teemo',
    },
  ];

  username: string = '';
  registeredStauts: boolean = false;
  constructor() {}

  storeUsername(username: string) {
    this.username = username;
    console.log(username);
  }

  getUsername() {
    return this.username;
  }

  storeRegisterAccount(userRegister: boolean) {
    this.registeredStauts = userRegister;
  }

  // we need this method for the auth
  isUserRegistered() {
    return this.registeredStauts;
  }
}
