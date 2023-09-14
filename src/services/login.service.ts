import { Injectable } from '@angular/core';
import { Carousel } from 'src/interfaces/carousel.interface';

@Injectable({ providedIn: 'root' })
export class LoginService {
  carouselArray: Carousel[] = [
    {
      userOpinion:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias fuga a labore quos soluta odit adipisci rerum dicta rem veritatisvero, dolorum non, sed vitae blanditiis quae dolorem iste saepe?',
      userName: 'Mark Willson',
    },
    {
      userOpinion:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias fuga a labore quos soluta odit adipisci rerum dicta rem veritatisvero, dolorum non, sed vitae blanditiis quae dolorem iste saepe?',
      userName: 'Jonna Morgan',
    },
    {
      userOpinion:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias fuga a labore quos soluta odit adipisci rerum dicta rem veritatisvero, dolorum non, sed vitae blanditiis quae dolorem iste saepe?',
      userName: 'Bob Teemo',
    },
  ];

  username: string = '';
  isUserLoggedIn: boolean = false;
  constructor() {}

  userLoggedIn(isLoggedIn: boolean) {
    this.isUserLoggedIn = isLoggedIn;
  }

  // we need this method for the auth guard
  getUserLogedInStatus() {
    return this.isUserLoggedIn;
  }

  storeUsername(username: string) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }
}
