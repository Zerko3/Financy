import { Injectable } from '@angular/core';
import { AuthResponseData } from 'src/interfaces/authResponse.interface';
import { Carousel } from 'src/interfaces/carousel.interface';

@Injectable({ providedIn: 'root' })
export class RegisterService {
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

  registeredStauts: boolean = false;
  constructor() {}

  storeRegisterAccount(userRegister: boolean) {
    this.registeredStauts = userRegister;
  }

  // we need this method for the auth
  isUserRegistered() {
    return this.registeredStauts;
  }
}
